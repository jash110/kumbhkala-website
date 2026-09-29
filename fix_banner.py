import os
import shutil
from PIL import Image, ImageDraw, ImageFont

FRAMES_DIR = "public/frames"
BACKUP_DIR = "frames_backup_banner_fix"
LOGO_PATH = "public/designs/logo.png"
FONT_PATH = r"C:\Windows\Fonts\arialbd.ttf"

START = 48
END = 108

# (frame_number, x1, y1, x2, y2, angle_degrees)
ANCHORS = [
    (48, 866, 476, 1078, 512, 0),
    (60, 858, 441, 992, 482, 2),
    (75, 772, 362, 968, 418, 4),
    (90, 682, 146, 992, 274, 6),
    (100, 572, 0, 952, 152, 12),
    (105, 415, 0, 792, 92, 16),
    (108, 485, 0, 792, 92, 18),
]

PAD_FRAC = 0.15


def interpolate(n):
    if n <= ANCHORS[0][0]:
        a = ANCHORS[0]
        return a[1:]
    if n >= ANCHORS[-1][0]:
        a = ANCHORS[-1]
        return a[1:]
    for i in range(len(ANCHORS) - 1):
        f0 = ANCHORS[i]
        f1 = ANCHORS[i + 1]
        if f0[0] <= n <= f1[0]:
            t = (n - f0[0]) / (f1[0] - f0[0]) if f1[0] != f0[0] else 0
            vals = [f0[j] + (f1[j] - f0[j]) * t for j in range(1, 6)]
            return vals
    raise ValueError(n)


def sample_bg_color(im, box):
    x1, y1, x2, y2 = [int(round(v)) for v in box]
    x1 = max(0, x1)
    y1 = max(0, y1)
    x2 = min(im.width, x2)
    y2 = min(im.height, y2)
    if x2 <= x1 or y2 <= y1:
        return (35, 35, 70)
    crop = im.crop((x1, y1, x2, y2)).convert("RGB")
    pixels = list(crop.getdata())
    bg_pixels = [p for p in pixels if not (p[0] > 100 and p[1] > 90 and p[2] < 130)]
    if not bg_pixels:
        bg_pixels = pixels
    n = len(bg_pixels)
    r = sum(p[0] for p in bg_pixels) // n
    g = sum(p[1] for p in bg_pixels) // n
    b = sum(p[2] for p in bg_pixels) // n
    # ensure it reads as a banner-blue, not a near-black shadow average
    r = min(r, 70)
    g = min(g, 70)
    b = max(b, 90)
    return (r, g, b)


def build_patch(w, h, bg_color, logo_im):
    w = max(int(round(w)), 10)
    h = max(int(round(h)), 10)
    patch = Image.new("RGBA", (w, h), bg_color + (255,))
    draw = ImageDraw.Draw(patch)
    radius = max(4, int(h * 0.12))
    draw.rounded_rectangle([0, 0, w - 1, h - 1], radius=radius, fill=bg_color + (255,))

    margin = int(h * 0.14)
    logo_h = h - 2 * margin
    logo_w = int(logo_h * logo_im.width / logo_im.height)
    logo_resized = logo_im.resize((logo_w, logo_h), Image.LANCZOS)
    patch.alpha_composite(logo_resized, (margin, margin))

    text = "Kumbhkala"
    text_area_x = margin + logo_w + int(h * 0.18)
    text_area_w = max(w - text_area_x - margin, 10)
    text_area_h = h - 2 * margin

    font_size = int(text_area_h * 1.05)
    font = ImageFont.truetype(FONT_PATH, font_size)
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    while tw > text_area_w and font_size > 6:
        font_size -= 2
        font = ImageFont.truetype(FONT_PATH, font_size)
        bbox = draw.textbbox((0, 0), text, font=font)
        tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]

    tx = text_area_x + (text_area_w - tw) // 2
    ty = margin + (text_area_h - th) // 2 - bbox[1]
    draw.text((tx, ty), text, font=font, fill=(255, 205, 40, 255))
    return patch


def main():
    os.makedirs(BACKUP_DIR, exist_ok=True)
    logo_im = Image.open(LOGO_PATH).convert("RGBA")

    for n in range(START, END + 1):
        fname = f"frame_{n:04d}.jpg"
        fpath = os.path.join(FRAMES_DIR, fname)
        if not os.path.exists(fpath):
            print("skip missing", fname)
            continue

        backup_path = os.path.join(BACKUP_DIR, fname)
        if not os.path.exists(backup_path):
            shutil.copy2(fpath, backup_path)

        im = Image.open(backup_path).convert("RGB")

        x1, y1, x2, y2, angle = interpolate(n)
        bw, bh = x2 - x1, y2 - y1
        pad_x, pad_y = bw * PAD_FRAC, bh * PAD_FRAC
        px1, py1, px2, py2 = x1 - pad_x, y1 - pad_y, x2 + pad_x, y2 + pad_y

        bg_color = sample_bg_color(im, (x1, y1, x2, y2))
        patch = build_patch(px2 - px1, py2 - py1, bg_color, logo_im)

        rotated = patch.rotate(angle, resample=Image.BICUBIC, expand=True, fillcolor=(0, 0, 0, 0))

        cx, cy = (px1 + px2) / 2, (py1 + py2) / 2
        paste_x = int(round(cx - rotated.width / 2))
        paste_y = int(round(cy - rotated.height / 2))

        im.paste(rotated, (paste_x, paste_y), rotated)
        im.save(fpath, quality=90)
        print(f"patched {fname}  box=({x1:.0f},{y1:.0f},{x2:.0f},{y2:.0f}) angle={angle:.1f} bg={bg_color}")


if __name__ == "__main__":
    main()

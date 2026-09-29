require('dotenv/config');
const fs = require('fs');
const path = require('path');
const https = require('https');
const RunwayML = require('@runwayml/sdk').default;

const client = new RunwayML({
  apiKey: process.env.RUNWAYML_API_SECRET,
});

const PROMPT_TEXT = `Cinematic continuous drone shot, Godavari riverfront ghats, Nashik, India, golden hour. Wide aerial view of stone ghats, steps to the river, temple spires, pilgrims and diyas by the water, warm sunset light on the river. Drone flies smoothly along the riverfront toward an open-air stall — a Kumbhkala display with canvas tote bags, framed posters, printed materials on wooden tables and hanging lines, warm brass, saffron, cream tones.

No cuts: drone glides to the stall, settling into a smooth, close, stabilized pass over the products — totes, posters, printed notes — natural texture, warm light.

Drone pulls back and rises, returning to a wide aerial view of the ghats, temple silhouettes, river, golden sunset sky.

One continuous, stabilized FPV cinematic drone flight, smooth acceleration and deceleration, realistic physics, subtle parallax, no cuts, no teleportation. Photorealistic, golden-hour lighting, natural motion blur, detailed textures, 4K. No readable text, signage, or logos.`;

function download(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`Download failed with status ${res.statusCode}`));
          return;
        }
        res.pipe(file);
        file.on('finish', () => file.close(resolve));
      })
      .on('error', reject);
  });
}

async function main() {
  const assetsDir = path.join(__dirname, 'assets');
  fs.mkdirSync(assetsDir, { recursive: true });

  console.log('Starting text-to-video generation (model: gen4.5)...');
  const task = await client.textToVideo
    .create({
      model: 'gen4.5',
      promptText: PROMPT_TEXT,
      ratio: '1280:720',
      duration: 10,
    })
    .waitForTaskOutput({ timeout: null });

  console.log('Task succeeded:', task.id, 'cost:', task.cost);

  const videoUrl = task.output[0];
  const destPath = path.join(assetsDir, 'hero.mp4');
  console.log('Downloading video to', destPath);
  await download(videoUrl, destPath);

  const stats = fs.statSync(destPath);
  console.log(`Saved ${destPath} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
}

main().catch((err) => {
  console.error('Hero video generation failed:', err);
  process.exit(1);
});

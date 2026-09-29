import ScrollHero from './components/ScrollHero';
import CraftSection from './components/CraftSection';
import CollectionSection from './components/CollectionSection';
import StorySection from './components/StorySection';
import ClosingCTA from './components/ClosingCTA';

export default function Home() {
  return (
    <main style={{ background: '#F2EAD9' }}>
      <ScrollHero />
      <CraftSection />
      <CollectionSection />
      <StorySection />
      <ClosingCTA />
    </main>
  );
}

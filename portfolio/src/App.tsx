import SmoothScrollProvider from './components/SmoothScrollProvider';
import CustomCursor from './components/CustomCursor';
import GlobalVideoBackground from './components/GlobalVideoBackground';
import HUDOverlay from './components/HUDOverlay';
import Navbar from './components/Navbar';
import { Hero, About, Skills, MidBridge, Experience, Projects, Contact, Footer } from './components/Sections';

function App() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <GlobalVideoBackground />
      <HUDOverlay />
      <Navbar />
      
      <main className="relative z-10 w-full overflow-hidden">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <MidBridge />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}

export default App;

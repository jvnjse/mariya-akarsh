import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CouplePortrait from './components/CouplePortrait';
import Countdown from './components/Countdown';
import OurStory from './components/OurStory';
import Events from './components/Events';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import Footer from './components/Footer';
import Petals from './components/Petals';

export default function App() {
  return (
    <>
      <Petals />
      <Navbar />
      <main>
        <Hero />
        <CouplePortrait />
        <Countdown />
        <OurStory />
        <Events />
        <Gallery />
        {/* <RSVP /> */}
      </main>
      <Footer />
    </>
  );
}

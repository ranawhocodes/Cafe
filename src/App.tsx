import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Story from '@/components/Story';
import Menu from '@/components/Menu';
import BrewBar from '@/components/BrewBar';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Reservation from '@/components/Reservation';
import Footer from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Menu />
        <BrewBar />
        <Gallery />
        <Testimonials />
        <Reservation />
      </main>
      <Footer />
    </div>
  );
}

export default App;

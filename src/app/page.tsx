import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/hero/Hero";
import StatsMarquee from "@/components/StatsMarquee";
import Destinations from "@/components/Destinations";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-paper">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <StatsMarquee />
      <Destinations />
      <Footer />
    </main>
  );
}

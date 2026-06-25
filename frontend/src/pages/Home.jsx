import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Mission from "../components/Mission";
import Features from "../components/Features";
import Footer from "../components/Footer";
import "../styles/Home.css";
import CTA from "../components/CTA";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Mission />
      <Features />
      <CTA />
      <Footer />
    </>
  );
}

export default Home;
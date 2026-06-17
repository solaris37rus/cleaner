import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Features from "@/components/Features";
import Gallery from "@/components/Gallery";
import Calculator from "@/components/Calculator";
import HowItWorks from "@/components/HowItWorks";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import ContactWidget from "@/components/ContactWidget";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Features />
      <Gallery />
      <Calculator />
      <HowItWorks />
      <Reviews />
      <FAQ />
      <ContactWidget />
    </>
  );
}
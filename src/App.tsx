import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Benefits from "./components/Benefits";
import PriceCalculator from "./components/PriceCalculator";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 selection:bg-primary-200 selection:text-primary-900">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Services />
        <Benefits />
        <PriceCalculator />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
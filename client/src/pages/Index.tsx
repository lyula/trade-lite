import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Markets from "@/components/Markets";
import Features from "@/components/Features";
import Payments from "@/components/Payments";
import BotTrading from "@/components/BotTrading";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Markets />
      <Features />
      <Payments />
      <BotTrading />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;

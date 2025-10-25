import { Card } from "@/components/ui/card";
import { Wallet, ArrowLeftRight, Lock, Smartphone } from "lucide-react";
import walletImage from "@/assets/wallet-feature.jpg.jpg";

const Features = () => {
  const features = [
    {
      icon: Wallet,
      title: "Multi-Currency Wallets",
      description: "Create and manage multiple wallets for different assets. Secure storage with military-grade encryption.",
    },
    {
      icon: ArrowLeftRight,
      title: "Instant Fund Transfers",
      description: "Move funds seamlessly between your wallet and trading account in seconds. Zero internal transfer fees.",
    },
    {
      icon: Lock,
      title: "Bank-Level Security",
      description: "2FA authentication, cold storage, and insurance coverage to protect your assets 24/7.",
    },
    {
      icon: Smartphone,
      title: "Mobile Trading",
      description: "Trade on the go with our advanced mobile app. Full platform features in your pocket.",
    },
  ];

  return (
    <section id="features" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Features List */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-foreground">Complete Trading</span>
                <br />
                <span className="bg-gradient-accent bg-clip-text text-transparent">Ecosystem</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Everything you need to trade, store, and grow your wealth in one powerful platform
              </p>
            </div>
            
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <Card 
                  key={index}
                  className="p-6 bg-card border-border hover:border-accent/50 transition-all duration-300 hover:shadow-accent-glow group"
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-accent p-3 shrink-0 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-full h-full text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Feature Image */}
          <div className="relative animate-slide-up">
            <div className="absolute inset-0 bg-gradient-accent opacity-20 blur-3xl"></div>
            <img 
              src={walletImage} 
              alt="Secure digital wallet interface with multi-currency support" 
              className="relative rounded-2xl shadow-accent-glow border border-accent/20 w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

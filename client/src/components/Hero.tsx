import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, TrendingUp, Wallet } from "lucide-react";
import heroImage from "@/assets/hero-trading.jpg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Professional trading background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/90"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <Shield className="h-4 w-4 text-primary-glow" />
              <span className="text-sm text-muted-foreground">Secure & Licensed Trading Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Trade Smarter,</span>
              <br />
              <span className="text-primary">Earn Better</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Access global markets with our advanced trading platform. Trade crypto, commodities, stocks, and indices with professional tools, automated bots, and secure wallet solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                variant="hero"
                size="xl"
                className="group"
                onClick={() => navigate("/register")}
              >
                Create Your Account
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="premium"
                size="xl"
                onClick={() => navigate("/login")}
              >
                View Demo Account
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="border-l-2 border-primary pl-4">
                <div className="text-3xl font-bold text-foreground">$2.4B+</div>
                <div className="text-sm text-muted-foreground">Trading Volume</div>
              </div>
              <div className="border-l-2 border-accent pl-4">
                <div className="text-3xl font-bold text-foreground">150K+</div>
                <div className="text-sm text-muted-foreground">Active Traders</div>
              </div>
              <div className="border-l-2 border-primary-glow pl-4">
                <div className="text-3xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Trading Dashboard Preview */}
          <div className="relative animate-slide-up">
            <div className="bg-card rounded-2xl shadow-2xl border border-border p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-foreground">Live Market Data</h3>
                  <span className="text-xs text-muted-foreground">Real-time</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground">BTC/USD</p>
                    <p className="text-xl font-bold text-primary">$45,230</p>
                    <p className="text-xs text-primary">+2.4%</p>
                  </div>
                  <div className="bg-secondary p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground">ETH/USD</p>
                    <p className="text-xl font-bold text-primary">$2,890</p>
                    <p className="text-xs text-primary">+1.8%</p>
                  </div>
                  <div className="bg-secondary p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground">GOLD</p>
                    <p className="text-xl font-bold text-primary">$1,950</p>
                    <p className="text-xs text-primary">+0.5%</p>
                  </div>
                  <div className="bg-secondary p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground">S&P 500</p>
                    <p className="text-xl font-bold text-primary">4,520</p>
                    <p className="text-xs text-primary">+1.2%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

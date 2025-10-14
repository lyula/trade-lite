import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/public/lite-logo.jpg"
              alt="TradeLite Logo"
              width="40"
              height="40"
              className="rounded-full"
            />
            <span className="text-xl font-bold text-foreground">TradeLite</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#markets"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Markets
            </a>
            <a
              href="#payments"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Payments
            </a>
            <a
              href="#bots"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Bot Trading
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button variant="hero" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserContext();

  // Only show user name in header if NOT on landing page and user is logged in
  const isLandingPage = location.pathname === "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/lite-logo.jpg"
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
            {isLandingPage ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </Button>
                <Button
                  variant="hero"
                  size="sm"
                  onClick={() => navigate("/register")}
                >
                  Get Started
                </Button>
              </>
            ) : user ? (
              <span className="font-semibold text-foreground">
                {user.firstName} {user.lastName}
              </span>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </Button>
                <Button
                  variant="hero"
                  size="sm"
                  onClick={() => navigate("/register")}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

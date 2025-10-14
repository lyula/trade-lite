import { TrendingUp, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">TradeLite</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Professional trading platform for crypto, commodities, stocks, and indices. Trade smarter with advanced tools and automated solutions.
            </p>
          </div>
          
          {/* Markets */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Markets</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Cryptocurrency</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Stocks & Indices</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Commodities</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Forex Trading</a></li>
            </ul>
          </div>
          
          {/* Platform */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Web-Based Trading</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">In-Platform Trading</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Bot Trading</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">API Access</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <a href="mailto:support@tradepro.com" className="text-muted-foreground hover:text-accent transition-colors">
                  support@tradepro.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <a href="tel:+254700000000" className="text-muted-foreground hover:text-accent transition-colors">
                  +254 700 000 000
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  Nairobi, Kenya
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} TradeLite. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                Risk Disclosure
              </a>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground mt-4 text-center md:text-left">
            Trading involves significant risk of loss and is not suitable for all investors. Past performance is not indicative of future results. 
            Please ensure you fully understand the risks involved and seek independent advice if necessary.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

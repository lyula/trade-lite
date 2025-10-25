import { Card } from "@/components/ui/card";
import mPesaLogo from "@/assets/m-pesa-logo.jpg";
import { CreditCard, Smartphone, Banknote, Shield } from "lucide-react";

const Payments = () => {
  const paymentMethods = [
    {
      icon: null, // Will use img for M-Pesa
      name: "M-Pesa",
      description: "Instant deposits via M-Pesa. Available 24/7 with zero processing fees.",
      badge: "Most Popular in Kenya",
      color: "accent",
      logo: mPesaLogo,
    },
    {
      icon: CreditCard,
      name: "Card Payments",
      description: "Visa, Mastercard, and local debit cards accepted. Instant processing.",
      badge: "Global",
      color: "primary",
    },
    {
      icon: Banknote,
      name: "Bank Transfer",
      description: "Direct bank transfers from all major Kenyan banks. Cleared within hours.",
      badge: "Secure",
      color: "primary-glow",
    },
  ];

  return (
    <section id="payments" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Flexible Payment</span>{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">Options</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Deposit and withdraw using your preferred method. All transactions are secured with bank-level encryption.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {paymentMethods.map((method, index) => (
            <Card 
              key={index}
              className="p-8 bg-card border-border hover:border-accent/50 transition-all duration-300 hover:shadow-accent-glow group text-center animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                {method.name === "M-Pesa" ? (
                  <img src={method.logo} alt="M-Pesa Logo" className="w-full h-full object-contain rounded-full border" style={{ borderColor: '#00afaa', borderWidth: '2px' }} />
                ) : (
                  <div className="rounded-full bg-gradient-accent p-4 w-full h-full flex items-center justify-center">
                    <method.icon className="w-full h-full text-accent-foreground" />
                  </div>
                )}
              </div>
              <div className="inline-block bg-accent/10 border border-accent/20 rounded-full px-3 py-1 mb-3">
                <span className="text-xs text-accent">{method.badge}</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-foreground">{method.name}</h3>
              <p className="text-muted-foreground">{method.description}</p>
            </Card>
          ))}
        </div>
        
        {/* Security Features */}
        <Card className="p-8 bg-gradient-to-br from-card to-secondary border-border">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-gradient-primary p-4 shrink-0">
              <Shield className="w-full h-full text-primary-foreground" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2 text-foreground">Secure Payment Processing</h3>
              <p className="text-muted-foreground">
                All transactions are encrypted and monitored 24/7. Your financial data is protected with industry-leading security protocols and fraud detection systems.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Payments;

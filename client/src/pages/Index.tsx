import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Markets from "@/components/Markets";
import Features from "@/components/Features";
import Payments from "@/components/Payments";
import BotTrading from "@/components/BotTrading";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { useState } from "react";

const Index = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback("");
    if (!form.name || !form.email || !form.message) {
      setFeedback("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await fetch(`${backendUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setFeedback("Thank you for contacting us! We'll get back to you soon.");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setFeedback("") , 3000);
      } else {
        setFeedback("Failed to send message. Please try again later.");
        setTimeout(() => setFeedback("") , 3000);
      }
    } catch {
      setFeedback("Failed to send message. Please try again later.");
      setTimeout(() => setFeedback("") , 3000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Markets />
      <Features />
      <Payments />
      <BotTrading />
      <CTA />
      {/* Contact Form Section */}
      <section id="contact" className="py-16 px-4 bg-background flex justify-center items-center">
        <div className="w-full max-w-lg rounded-xl shadow-lg bg-white dark:bg-card p-8 border border-border">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-primary">Contact Us</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2 text-foreground">Name</label>
              <input type="text" id="name" name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2 text-foreground">Email</label>
              <input type="email" id="email" name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-2 text-foreground">Message</label>
              <textarea id="message" name="message" rows={5} value={form.message} onChange={handleChange} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground resize-none" required></textarea>
            </div>
            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold text-lg hover:bg-primary-dark transition disabled:opacity-60" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
            {feedback && (
              <p
                className={`text-center text-sm mt-2 ${
                  feedback.startsWith('Thank you')
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {feedback}
              </p>
            )}
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Index;
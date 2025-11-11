import React from "react";
import Header from "@/components/Header";

const RiskDisclosure = () => (
  <>
    <Header />
  <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow mt-32">
    <h1 className="text-3xl font-bold mb-4">Risk Disclosure</h1>
    <p className="mb-4">Trading financial instruments, including cryptocurrencies, stocks, and commodities, involves significant risk. EquityVault Securities provides tools and information, but cannot guarantee profits or prevent losses.</p>
    <ul className="list-disc pl-6 mb-4">
      <li>Market prices can be volatile and unpredictable.</li>
      <li>Past performance does not guarantee future results.</li>
      <li>Users should only trade with funds they can afford to lose.</li>
      <li>Seek independent financial advice if needed.</li>
    </ul>
    <p>By using our platform, you acknowledge and accept these risks. Please review our full Risk Disclosure for more information.</p>
    </div>
  </>
);

export default RiskDisclosure;

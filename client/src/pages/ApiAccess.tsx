import React from "react";
import Header from "@/components/Header";

const ApiAccess = () => (
  <>
    <Header />
  <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow mt-32">
    <h1 className="text-3xl font-bold mb-4">API Access</h1>
    <p className="mb-4">EquityVault Securities offers secure API access for developers and partners to integrate trading, account management, and market data into their own applications. Our API is designed for reliability, speed, and compliance with industry standards.</p>
    <ul className="list-disc pl-6 mb-4">
      <li>RESTful endpoints for trading, account info, and market data</li>
      <li>OAuth2 authentication for secure access</li>
      <li>Rate limits and monitoring for fair usage</li>
      <li>Comprehensive documentation and support</li>
    </ul>
  <p>To request API access, please contact <a href="mailto:techsupport@equityvaultsecurities.com" className="text-teal-600 hover:underline">techsupport@equityvaultsecurities.com</a>. All API usage is subject to our Terms of Service and Risk Disclosure.</p>
    </div>
  </>
);

export default ApiAccess;

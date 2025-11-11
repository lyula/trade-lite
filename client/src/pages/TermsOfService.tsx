import React from "react";
import Header from "@/components/Header";

const TermsOfService = () => (
  <>
    <Header />
  <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow mt-32">
    <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
    <p className="mb-4">By using EquityVault Securities, you agree to abide by our Terms of Service. These terms govern your use of our platform, including trading, account management, and API access.</p>
    <ul className="list-disc pl-6 mb-4">
      <li>Users must be at least 18 years old and comply with all applicable laws.</li>
      <li>Trading involves risk; users are responsible for their own decisions.</li>
      <li>Accounts may be suspended for suspicious or prohibited activity.</li>
      <li>All API and platform usage is subject to monitoring and compliance checks.</li>
    </ul>
    <p>For full details, please review our complete Terms of Service or contact our support team.</p>
    </div>
  </>
);

export default TermsOfService;

import React from "react";
import Header from "@/components/Header";

const PrivacyPolicy = () => (
  <>
    <Header />
  <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow mt-32">
    <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
    <p className="mb-4">Your privacy is important to us. EquityVault Securities is committed to protecting your personal information and using it responsibly. This policy explains how we collect, use, and safeguard your data.</p>
    <ul className="list-disc pl-6 mb-4">
      <li>We collect information you provide during registration, trading, and support interactions.</li>
      <li>Your data is stored securely and never sold to third parties.</li>
      <li>We use cookies and analytics to improve platform performance and user experience.</li>
      <li>You may request deletion or correction of your personal data at any time.</li>
    </ul>
    <p>For full details, please review our complete Privacy Policy or contact our support team.</p>
    </div>
  </>
);

export default PrivacyPolicy;

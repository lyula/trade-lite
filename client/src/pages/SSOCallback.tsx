import React, { useEffect } from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const SSOCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/register');
  }, [navigate]);

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Account Not Found</h1>
          <p className="text-gray-600 mb-6">It looks like you are not signed up yet. Please sign up to access your account.</p>
        </div>
      </div>
    </ClerkProvider>
  );
};

export default SSOCallback;
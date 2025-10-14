import React from 'react';
import { ClerkProvider, SignUp } from '@clerk/clerk-react';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const Register: React.FC = () => {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <SignUp routing="path" path="/register" />
      </div>
    </ClerkProvider>
  );
};

export default Register;
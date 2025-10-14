import React from 'react';
import { ClerkProvider, SignIn } from '@clerk/clerk-react';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const Login: React.FC = () => {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <SignIn routing="path" path="/login" />
      </div>
    </ClerkProvider>
  );
};

export default Login;
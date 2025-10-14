import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <SignIn routing="path" path="/login" afterSignInUrl="/dashboard" />
    </div>
  );
};

export default Login;
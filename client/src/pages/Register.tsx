import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const Register: React.FC = () => {
  return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <SignUp routing="path" path="/register" afterSignUpUrl="/login" />
      </div>
  );
};

export default Register;
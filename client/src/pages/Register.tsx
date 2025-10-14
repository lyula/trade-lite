import React, { useEffect } from 'react';
import { SignUp, useAuth, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    // If user just signed up and is now signed in, sign them out and redirect to login
    if (isSignedIn) {
      const handleSignOut = async () => {
        await signOut({ redirectUrl: '/login' });
      };
      handleSignOut();
    }
  }, [isSignedIn, signOut]);

  return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <SignUp 
          routing="path" 
          path="/register" 
          afterSignUpUrl="/dashboard" 
          signInUrl="/login"
        />
      </div>
  );
};

export default Register;
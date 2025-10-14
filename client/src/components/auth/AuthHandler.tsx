import { SignIn, SignUp, useUser } from "@clerk/clerk-react";
import { useState } from "react";

const AuthHandler = () => {
  const { isSignedIn, user } = useUser();
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignIn = () => {
    if (!isSignedIn) {
      alert("Account not found. Please sign up.");
      setShowSignUp(true);
    }
  };

  return (
    <div className="auth-container">
      {isSignedIn ? (
        <div>
          <h2>Welcome, {user?.fullName || "User"}!</h2>
        </div>
      ) : showSignUp ? (
        <SignUp afterSignUpUrl="/dashboard" />
      ) : (
        <SignIn afterSignInUrl="/dashboard" />
      )}
    </div>
  );
};

export default AuthHandler;
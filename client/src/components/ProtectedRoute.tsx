import { Navigate } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import axios from "axios"; // Import axios for API calls

interface ProtectedRouteProps {
  children: ReactNode;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          `${backendUrl}/api/auth/validate-token`,
          null,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Token validation failed", error);
        localStorage.removeItem("token");
      }

      setLoading(false);
    };

    validateToken();
  }, []);

  if (loading) {
    // While loading, stay on the current page (login or dashboard) and render nothing
    return null;
  }

  if (!isAuthenticated) {
    // Only redirect to login after loading is complete and authentication failed
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
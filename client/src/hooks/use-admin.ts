import { useState, useEffect } from "react";

export function useAdmin() {
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  useEffect(() => {
    // You may want to store more info, but for now just email
    const adminData = localStorage.getItem("adminEmail");
    setAdminEmail(adminData);
  }, []);

  return { adminEmail };
}

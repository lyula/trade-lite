const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function adminRegister(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/admin/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error((await res.json()).message || "Registration failed");
  return res.json();
}

export async function adminLogin(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error((await res.json()).message || "Login failed");
  return res.json();
}

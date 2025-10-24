import AdminLayout from "@/components/admin/AdminLayout";
import AdminTable from "@/components/admin/AdminTable";
import { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  referralCode?: string;
}

const columns: { header: string; accessor: keyof User }[] = [
  { header: "ID", accessor: "id" },
  { header: "First Name", accessor: "firstName" },
  { header: "Last Name", accessor: "lastName" },
  { header: "Email", accessor: "email" },
  { header: "Referral Code", accessor: "referralCode" },
];

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // TODO: Replace with real API call
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <AdminTable columns={columns} data={users} />
    </AdminLayout>
  );
};

export default Users;

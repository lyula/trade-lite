import React from "react";
import { useUser } from "@clerk/clerk-react";

const Profile: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="flex items-center mb-4">
        <img
          src={user.imageUrl} // Corrected property name
          alt="Profile"
          className="w-24 h-24 rounded-full mr-4"
        />
        <div>
          <h2 className="text-xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-600">{user.emailAddresses[0]?.emailAddress}</p>
        </div>
      </div>
      <div>
        <p>
          <strong>Verification Status:</strong> Pending
        </p>
      </div>
    </div>
  );
};

export default Profile;

import React, { useState } from "react";
import { User } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

const Profile: React.FC = () => {
  const { user } = useUser();
  const [email, setEmail] = useState(user?.emailAddresses[0]?.emailAddress || "");
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [password, setPassword] = useState("********");
  const [showKYC, setShowKYC] = useState(false);
  const [idFront, setIdFront] = useState<File | null>(null);
  const [idBack, setIdBack] = useState<File | null>(null);
  const [kraCert, setKraCert] = useState<File | null>(null);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
      <div className="flex items-center gap-6 mb-6">
        {user.imageUrl ? (
          <img src={user.imageUrl} alt="Profile" className="w-20 h-20 rounded-full object-cover border" />
        ) : (
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
            <User className="h-10 w-10 text-gray-400" />
          </div>
        )}
        <div>
          <div className="text-lg font-semibold">{user.firstName} {user.lastName}</div>
          <div className="text-muted-foreground">{email}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 h-full flex flex-col justify-between">
          <div>
            <label className="block text-base font-medium mb-2 text-foreground">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className="w-full border rounded px-4 py-2 text-base bg-gray-50 border-green-300"
            />
          </div>
          <div>
            <label className="block text-base font-medium mb-2 text-foreground">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className="w-full border rounded px-4 py-2 text-base bg-gray-50 border-green-300"
            />
          </div>
          <div>
            <label className="block text-base font-medium mb-2 text-foreground">Email Address</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full border rounded px-4 py-2 text-base bg-gray-50 border-green-300"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-center mt-4 md:mt-8">
            <button
              className="bg-primary hover:bg-primary/80 text-white font-semibold px-6 py-2 rounded w-full md:w-auto"
              disabled={saving}
              onClick={async () => {
                setSaving(true);
                setSaveMsg("");
                try {
                  await user.update({ firstName, lastName });
                  setSaveMsg("Saved!");
                } catch (err) {
                  setSaveMsg("Error saving details");
                }
                setSaving(false);
              }}
            >
              {saving ? "Saving..." : "Save"}
            </button>
            {saveMsg && <span className="text-green-600 font-medium ml-4">{saveMsg}</span>}
          </div>
        </div>
        <div className="space-y-6 h-full flex flex-col justify-between">
          <div className="bg-muted/30 rounded-lg p-6 h-full flex flex-col justify-between">
            <h3 className="text-lg font-semibold mb-4">KYC Verification</h3>
            <div className="mb-4">
              <label className="block mb-2 font-medium">ID Front</label>
              <input type="file" accept="image/*,.pdf" onChange={e => setIdFront(e.target.files?.[0] || null)} />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">ID Back</label>
              <input type="file" accept="image/*,.pdf" onChange={e => setIdBack(e.target.files?.[0] || null)} />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">KRA Compliance Certificate</label>
              <input type="file" accept="image/*,.pdf" onChange={e => setKraCert(e.target.files?.[0] || null)} />
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-center mt-4 md:mt-8">
              <button className="bg-primary hover:bg-primary/80 text-white font-semibold px-6 py-2 rounded w-full md:w-auto">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
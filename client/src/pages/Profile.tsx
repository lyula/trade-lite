
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
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-lg p-8 shadow">
        <h1 className="text-3xl font-bold mb-8 text-center">Account Settings</h1>
        <div className="flex flex-col items-center mb-8">
          {user.imageUrl ? (
            <img src={user.imageUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover border mb-2" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-2">
              <User className="h-12 w-12 text-gray-400" />
            </div>
          )}
        </div>
        <div className="mb-8">
          <label className="block text-lg font-medium mb-2 text-foreground">Email Address</label>
          <div className="flex items-center gap-4">
            <input
              type="email"
              value={email}
              disabled
              className="w-full border rounded px-4 py-3 text-lg bg-gray-50 border-green-300"
            />
            <button className="text-blue-600 font-medium">Change</button>
          </div>
        </div>
        <div className="mb-8">
          <label className="block text-lg font-medium mb-2 text-foreground">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            className="w-full border rounded px-4 py-3 text-lg bg-gray-50 border-green-300"
          />
        </div>
        <div className="mb-8">
          <label className="block text-lg font-medium mb-2 text-foreground">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            className="w-full border rounded px-4 py-3 text-lg bg-gray-50 border-green-300"
          />
        </div>
        <div className="mb-8 flex justify-end gap-4 items-center">
          <button
            className="bg-primary hover:bg-primary/80 text-white font-semibold px-6 py-2 rounded"
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
        <div className="mb-8 bg-muted/30 rounded-lg p-6">
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
          <button className="bg-primary hover:bg-primary/80 text-white font-semibold px-6 py-2 rounded mt-4 w-full">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
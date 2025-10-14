
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";

const Profile: React.FC = () => {
  const { user } = useUser();
  const [email, setEmail] = useState(user?.emailAddresses[0]?.emailAddress || "");
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [password, setPassword] = useState("********");
  const [commPrefs, setCommPrefs] = useState({ email: true, post: true, phone: true });

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-lg p-8 shadow">
        <h1 className="text-3xl font-bold mb-8 text-center">Account Settings</h1>
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
          <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-2 rounded">KYC</button>
          {saveMsg && <span className="text-green-600 font-medium ml-4">{saveMsg}</span>}
        </div>
        <div className="mb-8 flex justify-end">
          <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-2 rounded">KYC</button>
        </div>
        <h2 className="text-2xl font-bold mb-6 mt-12">Communication Preferences</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-lg">By email</span>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={commPrefs.email}
                onChange={() => setCommPrefs(p => ({ ...p, email: !p.email }))}
                className="sr-only"
              />
              <span className={`w-10 h-6 flex items-center bg-green-400 rounded-full p-1 transition ${commPrefs.email ? '' : 'bg-gray-300'}`}>
                <span className={`bg-white w-4 h-4 rounded-full shadow transform transition ${commPrefs.email ? 'translate-x-4' : ''}`}></span>
              </span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg">By post</span>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={commPrefs.post}
                onChange={() => setCommPrefs(p => ({ ...p, post: !p.post }))}
                className="sr-only"
              />
              <span className={`w-10 h-6 flex items-center bg-green-400 rounded-full p-1 transition ${commPrefs.post ? '' : 'bg-gray-300'}`}>
                <span className={`bg-white w-4 h-4 rounded-full shadow transform transition ${commPrefs.post ? 'translate-x-4' : ''}`}></span>
              </span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg">By phone</span>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={commPrefs.phone}
                onChange={() => setCommPrefs(p => ({ ...p, phone: !p.phone }))}
                className="sr-only"
              />
              <span className={`w-10 h-6 flex items-center bg-green-400 rounded-full p-1 transition ${commPrefs.phone ? '' : 'bg-gray-300'}`}>
                <span className={`bg-white w-4 h-4 rounded-full shadow transform transition ${commPrefs.phone ? 'translate-x-4' : ''}`}></span>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
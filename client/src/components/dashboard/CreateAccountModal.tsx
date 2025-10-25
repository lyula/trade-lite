import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CreateAccountModalProps {
  open: boolean;
  onClose: () => void;
  type: "live" | "demo" | "wallet";
  onSubmit: (data: any) => void;
}

const typeLabels = {
  live: "Live Account",
  demo: "Demo Account",
  wallet: "Wallet Account",
};

const CreateAccountModal: React.FC<CreateAccountModalProps> = ({ open, onClose, type, onSubmit }) => {
  // You can expand this form based on the type
  const [form, setForm] = React.useState({
    accountType: "standard",
    currency: "USD",
    leverage: "1:400",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create {typeLabels[type]}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {type !== "wallet" && (
            <div>
              <label className="block mb-1 font-medium">Account Type</label>
              <select
                name="accountType"
                value={form.accountType}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1"
              >
                {type === "live" && <>
                  <option value="standard">Standard</option>
                  <option value="pro">Pro</option>
                  <option value="premier">Premier</option>
                  <option value="automated-standard">Automated Standard</option>
                  <option value="automated-pro">Automated Pro</option>
                  <option value="automated-premier">Automated Premier</option>
                </>}
                {type === "demo" && <>
                  <option value="standard">Standard</option>
                  <option value="automated-standard">Automated Standard</option>
                </>}
              </select>
            </div>
          )}
          <div>
            <label className="block mb-1 font-medium">Currency</label>
            <select
              name="currency"
              value={form.currency}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            >
              <option value="USD">USD</option>
              <option value="KES">KES</option>
            </select>
          </div>
          {type !== "wallet" && (
            <div>
              <label className="block mb-1 font-medium">Leverage</label>
              <select
                name="leverage"
                value={form.leverage}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1"
              >
                <option value="1:100">1:100</option>
                <option value="1:200">1:200</option>
                <option value="1:400">1:400</option>
                <option value="1:500">1:500</option>
              </select>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" className="w-full">Create {typeLabels[type]}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAccountModal;

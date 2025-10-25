import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteAccountModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  accountNumber: string;
  accountType: string;
  onDelete: (accountNumber: string, accountType: string) => void;
}

const DeleteAccountModal = ({ open, setOpen, accountNumber, accountType, onDelete }: DeleteAccountModalProps) => (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="max-w-md rounded-lg p-8 shadow-xl border border-destructive/30 left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] fixed">
      <DialogHeader>
        <DialogTitle className="text-destructive text-2xl font-bold flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2 text-destructive"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
          Delete Account!
        </DialogTitle>
        <DialogDescription className="mt-2 text-base text-muted-foreground">
          You are about to permanently delete the <span className="font-semibold text-foreground">{accountType}</span> account <span className="font-mono font-bold">{accountNumber}</span>.<br />
          <span className="text-destructive font-semibold">This action cannot be undone.</span>
        </DialogDescription>
      </DialogHeader>
      <div className="my-6 flex items-center justify-center">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-triangle text-destructive"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3l-8.47-14.14a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" size="lg" className="w-32" onClick={() => setOpen(false)}>Cancel</Button>
        </DialogClose>
        <Button
          variant="destructive"
          size="lg"
          className="w-40"
          onClick={() => {
            onDelete(accountNumber, accountType);
            setOpen(false);
          }}
        >
          Yes, Delete Account
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default DeleteAccountModal;

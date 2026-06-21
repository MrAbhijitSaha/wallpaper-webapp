"use client";
import SignUpForm from "@/components/Forms/SignUpForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcnui/dialog";
import { useRouter } from "next/navigation";

const SignupModal = () => {
  const router = useRouter();

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      router.back();
    }
  };

  return (
    <Dialog
      open={true}
      onOpenChange={handleOpenChange}>
      <DialogContent className="border-foreground/20 bg-background/80 shadow-2xl backdrop-blur-3xl sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-foreground mb-4 text-3xl font-semibold">
            Sign In now
          </DialogTitle>
        </DialogHeader>

        <SignUpForm />
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;

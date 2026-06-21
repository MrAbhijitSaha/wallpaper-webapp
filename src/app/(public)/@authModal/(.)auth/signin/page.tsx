"use client";

import SignInForm from "@/components/Forms/SignInForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcnui/dialog";
import { useRouter } from "next/navigation";

const SigninModal = () => {
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

        <SignInForm />
      </DialogContent>
    </Dialog>
  );
};

export default SigninModal;

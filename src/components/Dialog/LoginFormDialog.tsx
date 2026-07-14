"use client";

import { signinDialogAtom } from "@/lib/globalState";
import { useAtom } from "jotai";
import SignInForm from "../Forms/SignInForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../shadcnui/dialog";

const SigninFormDialog = () => {
  const [open, setOpen] = useAtom(signinDialogAtom);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={"text-xl"}>Sign In now</DialogTitle>
        </DialogHeader>

        <SignInForm />
      </DialogContent>
    </Dialog>
  );
};

export default SigninFormDialog;

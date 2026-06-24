"use client";

import { authClient } from "@/lib/auth-client";

import { signinDialogAtom } from "@/lib/globalState";
import { ProtectedActionButtonProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSetAtom } from "jotai";
import { Button } from "../shadcnui/button";

const ProtectedActionButton = ({
  children,
  onClick,
  className,
}: ProtectedActionButtonProps) => {
  const { data } = authClient.useSession();
  const openSignin = useSetAtom(signinDialogAtom);

  return (
    <Button
      variant={"link"}
      className={cn("no-underline hover:no-underline", className)}
      onClick={() => {
        if (!data) {
          openSignin(true);
          return;
        }

        onClick();
      }}>
      {children}
    </Button>
  );
};

export default ProtectedActionButton;

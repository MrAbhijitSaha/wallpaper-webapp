"use client";

import { authClient } from "@/lib/auth-client";
import { signinDialogAtom } from "@/lib/globalState";
import { ProtectedActionButtonProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSetAtom } from "jotai";
import { Route } from "next";
import { useRouter } from "next/navigation";
import { Button } from "../shadcnui/button";

export default function ProtectedActionButton({
  children,
  route,
  className,
}: ProtectedActionButtonProps) {
  const { data } = authClient.useSession();
  const openSignin = useSetAtom(signinDialogAtom);
  const router = useRouter();

  const handleClick = () => {
    if (!data) {
      openSignin(true);
      return;
    }

    router.push(`/${route}` as Route);
  };

  return (
    <Button
      variant="link"
      className={cn("no-underline hover:no-underline", className)}
      onClick={handleClick}>
      {children}
    </Button>
  );
}

"use client";

import { authClient } from "@/lib/auth-client";

import { signinDialogAtom } from "@/lib/globalState";
import { ProtectedActionButtonProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSetAtom } from "jotai";
import { Route } from "next";
import Link from "next/link";
import { Button } from "../shadcnui/button";

const ProtectedActionButton = ({
  children,
  route,
  className,
}: ProtectedActionButtonProps) => {
  const { data } = authClient.useSession();
  const openSignin = useSetAtom(signinDialogAtom);

  return (
    <Button
      render={<Link href={`/${route}` as Route}> {children}</Link>}
      nativeButton={false}
      variant={"link"}
      className={cn("no-underline hover:no-underline", className)}
      onClick={() => {
        if (!data) {
          openSignin(true);
          return;
        }
      }}
    />
  );
};

export default ProtectedActionButton;

"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Dialog, DialogContent } from "../shadcnui/dialog";

type Props = {
  children: ReactNode;
};

const WallpaperPriviewDialog = ({ children }: Props) => {
  const router = useRouter();

  return (
    <Dialog
      defaultOpen
      onOpenChange={(open) => {
        if (!open) router.back();
      }}>
      <DialogContent className="w-full! max-w-5xl! p-6">
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default WallpaperPriviewDialog;

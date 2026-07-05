"use client";

import { CheckIcon, Share2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "../shadcnui/button";

type ShareButtonProps = {
  wallpaperId: string;
  title?: string;
  className?: string;
};

const ShareButton = ({ wallpaperId, title, className }: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/wallpapers/${wallpaperId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: title ?? "Check out this wallpaper",
          url,
        });
      } catch {
        // user closed the native share sheet — nothing to do
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      // setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      onClick={handleShare}
      aria-label="Share wallpaper"
      className={className}>
      {copied ?
        <CheckIcon className="h-4 w-4" />
      : <Share2Icon className="h-4 w-4" />}
    </Button>
  );
};

export default ShareButton;

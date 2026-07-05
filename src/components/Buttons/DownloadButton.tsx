"use client";

import trackWallpaperDownload from "@/server/trackWallpaperDownload";
import { DownloadIcon } from "lucide-react";
import { MouseEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "../shadcnui/button";

type DownloadButtonProps = {
  wallpaperId: string;
  imagePath: string;
};

const DownloadButton = ({ wallpaperId, imagePath }: DownloadButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);

    try {
      const result = await trackWallpaperDownload(wallpaperId);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      // Create a temporary download link
      const link = document.createElement("a");
      link.href = `/${imagePath}`;
      link.download = imagePath.split("/").pop() || "wallpaper";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Download started!");
    } catch (error) {
      console.error(error);
      toast.error("Download failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="rounded-full border-0 bg-transparent p-2 hover:bg-transparent"
      variant="outline"
      onClick={handleDownload}
      disabled={isLoading}
      aria-label="Download Wallpaper">
      <DownloadIcon className="h-4 w-4 text-white" />
    </Button>
  );
};

export default DownloadButton;

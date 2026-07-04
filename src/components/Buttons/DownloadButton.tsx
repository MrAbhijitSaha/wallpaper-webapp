"use client";

import trackWallpaperDownload from "@/server/trackWallpaperDownload";
import { DownloadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../shadcnui/button";

type DownloadButtonProps = {
  wallpaperId: string;
  imagePath: string;
};

const DownloadButton = ({ wallpaperId, imagePath }: DownloadButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDownload = async () => {
    setIsLoading(true);

    try {
      const result = await trackWallpaperDownload(wallpaperId);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      router.refresh();
      window.open(`/${imagePath}`, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error(error);
      toast.error("Download failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="rounded-full bg-white p-2"
      variant="default"
      onClick={handleDownload}
      disabled={isLoading}
      aria-label="Download Wallpaper">
      <DownloadIcon className="h-4 w-4 text-black" />
    </Button>
  );
};

export default DownloadButton;

import { Share2Icon } from "lucide-react";
import { Button } from "../shadcnui/button";

const ShareWallpaperButton = () => {
  return (
    <Button className={"bg-transparent hover:bg-transparent"}>
      <Share2Icon stroke="white" />
    </Button>
  );
};

export default ShareWallpaperButton;

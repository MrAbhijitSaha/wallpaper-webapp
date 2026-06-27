import { DownloadIcon } from "lucide-react";
import { Button } from "../shadcnui/button";

const DownloadButton = () => {
  return (
    <Button
      className="rounded-full bg-white p-2"
      variant={"default"}>
      <DownloadIcon className="h-4 w-4 text-black" />
    </Button>
  );
};

export default DownloadButton;

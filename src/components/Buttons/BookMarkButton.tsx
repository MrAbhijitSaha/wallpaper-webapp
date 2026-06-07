import { BookmarkIcon } from "lucide-react";
import { Button } from "../shadcnui/button";

const BookMarkButton = () => {
  return (
    <Button className={"bg-transparent hover:bg-transparent"}>
      <BookmarkIcon stroke="white" />
    </Button>
  );
};

export default BookMarkButton;

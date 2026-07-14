"use client";

import { redirect } from "next/navigation";
import { Button } from "../shadcnui/button";

const EditWallpaperButton = () => {
  const editButtonOnClickFunction = () => {
    redirect("/edit");
  };

  return (
    <Button
      className=""
      variant={"outline"}
      onClick={editButtonOnClickFunction}>
      Edit
    </Button>
  );
};

export default EditWallpaperButton;

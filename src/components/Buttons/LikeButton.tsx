"use client";

import { signinDialogAtom } from "@/lib/globalState";
import { cn } from "@/lib/utils";
import toggleLike from "@/server/toggleLike";
import { useSetAtom } from "jotai";
import { HeartIcon } from "lucide-react";
import { MouseEvent, useState } from "react";
import { Button } from "../shadcnui/button";

type LikeButtonProps = {
  wallpaperId: string;
  initialLiked: boolean;
  initialLikesCount: number;
  className?: string;
  text?: string;
};

export const LikeButton = ({
  wallpaperId,
  initialLiked,
  initialLikesCount,
  className,
  text,
}: LikeButtonProps) => {
  const openSignin = useSetAtom(signinDialogAtom);

  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isPending, setIsPending] = useState(false);

  const handleToggle = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsPending(true);

    try {
      const result = await toggleLike(wallpaperId);

      if (!result.userAuthentication) {
        openSignin(true);
        return;
      }

      if (result.success) {
        setLiked(result.liked ?? false);
        setLikesCount(result.likesCount ?? 0);
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      variant={"default"}
      size="sm"
      onClick={handleToggle}
      disabled={isPending}
      className={cn("gap-2 text-sm", className)}>
      <HeartIcon
        className={`h-4 w-4 ${liked ? "fill-current text-red-500" : ""}`}
      />
      <span>{likesCount}</span>
      {text}
    </Button>
  );
};

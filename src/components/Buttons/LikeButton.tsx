"use client";

import { signinDialogAtom } from "@/lib/globalState";
import toggleLike from "@/server/toggleLike";
import { useSetAtom } from "jotai";
import { HeartIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../shadcnui/button";

type LikeButtonProps = {
  wallpaperId: string;
  initialLiked: boolean;
  initialLikesCount: number;
};

export const LikeButton = ({
  wallpaperId,
  initialLiked,
  initialLikesCount,
}: LikeButtonProps) => {
  const openSignin = useSetAtom(signinDialogAtom);

  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isPending, setIsPending] = useState(false);

  const handleToggle = async () => {
    setIsPending(true);

    try {
      const result = await toggleLike(wallpaperId);

      if (!result.userAuthentication) {
        openSignin(true);
        return;
      }

      if (result.success) {
        setLiked(result.liked);
        setLikesCount(result.likesCount);
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      variant={liked ? "default" : "outline"}
      size="sm"
      onClick={handleToggle}
      disabled={isPending}
      className="gap-2">
      <HeartIcon
        className={`h-4 w-4 ${liked ? "fill-current text-red-500" : ""}`}
      />
      <span>{likesCount}</span>
    </Button>
  );
};

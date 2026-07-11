"use client";

import { likeStateMapAtom, signinDialogAtom } from "@/lib/globalState";
import { cn } from "@/lib/utils";
import toggleLike from "@/server/toggleLike";
import { useAtom, useSetAtom } from "jotai";
import { HeartIcon } from "lucide-react";
import { MouseEvent, useEffect, useState } from "react";
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
  const [likeStateMap, setLikeStateMap] = useAtom(likeStateMapAtom);

  const currentLikeState = likeStateMap[wallpaperId] ?? {
    liked: initialLiked,
    count: initialLikesCount,
  };

  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setLikeStateMap((prev) => {
      const existingState = prev[wallpaperId];

      if (
        existingState?.liked === initialLiked &&
        existingState?.count === initialLikesCount
      ) {
        return prev;
      }

      return {
        ...prev,
        [wallpaperId]: {
          liked: initialLiked,
          count: initialLikesCount,
        },
      };
    });
  }, [initialLiked, initialLikesCount, setLikeStateMap, wallpaperId]);

  const handleToggle = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const optimisticState = {
      liked: !currentLikeState.liked,
      count:
        currentLikeState.liked ?
          Math.max(0, currentLikeState.count - 1)
        : currentLikeState.count + 1,
    };

    setLikeStateMap((prev) => ({
      ...prev,
      [wallpaperId]: optimisticState,
    }));

    setIsPending(true);

    try {
      const result = await toggleLike(wallpaperId);

      if (!result.userAuthentication) {
        openSignin(true);
        setLikeStateMap((prev) => ({
          ...prev,
          [wallpaperId]: currentLikeState,
        }));
        return;
      }

      if (result.success) {
        setLikeStateMap((prev) => ({
          ...prev,
          [wallpaperId]: {
            liked: result.liked ?? false,
            count: result.likesCount ?? optimisticState.count,
          },
        }));
      } else {
        setLikeStateMap((prev) => ({
          ...prev,
          [wallpaperId]: currentLikeState,
        }));
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
        className={`h-4 w-4 ${currentLikeState.liked ? "fill-current text-red-500" : ""}`}
      />
      <span>{currentLikeState.count}</span>
      {text}
    </Button>
  );
};

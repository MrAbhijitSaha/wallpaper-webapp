"use client";

import { authClient } from "@/lib/auth-client";
import toggleLike from "@/server/toggleLike";
import { HeartIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { toast } from "sonner";
import { Button } from "../shadcnui/button";

type LikeButtonProps = {
  tooltipContent?: ReactNode;
  wallpaperId: string;
  initialCount: number;
  initialLiked: boolean;
};

const LikeButton = ({
  tooltipContent,
  wallpaperId,
  initialCount,
  initialLiked,
}: LikeButtonProps) => {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);
  const [showError, setError] = useState<string>();
  const { data } = authClient.useSession();
  const pathname = usePathname();

  const handleLike = async () => {
    if (!data) {
      setError("Please login first");
      return;
    }

    if (loading) return;

    setLoading(true);

    const previousLiked = liked;
    const previousCount = count;

    // Optimistic update
    setLiked(!liked);
    setCount(liked ? count - 1 : count + 1);

    try {
      const result = await toggleLike(wallpaperId);

      if (!result.success) {
        // Rollback
        setLiked(previousLiked);
        setCount(previousCount);
        toast.error(result.message);
      } else {
        toast.success(result.message);
        setLiked(result.liked ?? previousLiked);
        setCount(result.likesCount ?? previousCount);
      }
    } catch {
      setLiked(previousLiked);
      setCount(previousCount);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }

    console.log({
      initialLiked,
      liked,
    });
  };

  return (
    <Button
      className="group/like rounded-full p-2"
      variant="default"
      aria-label="Like Wallpaper"
      onClick={handleLike}
      disabled={loading}>
      <HeartIcon
        fill="currentColor"
        className="text-background h-5 w-5 transition-colors duration-300 group-hover/like:text-red-600"
      />
    </Button>
  );
};

export default LikeButton;

// components/Cards/MasonryGrid.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Prisma } from "../../../generated/prisma/browser";
import WallpaperCard from "./WallpaperCard";

type Wallpaper = Prisma.WallpaperGetPayload<{
  include: {
    category: true;
    likes: { select: { id: true } };
    _count: { select: { likes: true } };
    user: { select: { name: true } };
  };
}>;

function useColumnCount() {
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const updateColumns = () => {
      const w = window.innerWidth;
      if (w < 768) setColumns(1);
      else if (w < 1024) setColumns(2);
      else setColumns(3);
    };
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  return columns;
}

// Assigns each image to whichever column is currently shortest,
// using its real aspect ratio to estimate rendered height.
// This is what keeps columns level instead of leaving gaps.
function distributeMasonry(items: Wallpaper[], columnCount: number) {
  const columns: Wallpaper[][] = Array.from({ length: columnCount }, () => []);
  const heights = new Array(columnCount).fill(0);

  for (const item of items) {
    const ratio = item.width && item.height ? item.height / item.width : 1.3;
    const shortestIndex = heights.indexOf(Math.min(...heights));
    columns[shortestIndex].push(item);
    heights[shortestIndex] += ratio;
  }

  return columns;
}

const MasonryGrid = ({ wallpapers }: { wallpapers: Wallpaper[] }) => {
  const columnCount = useColumnCount();

  const columns = useMemo(
    () => distributeMasonry(wallpapers, columnCount),
    [wallpapers, columnCount],
  );

  return (
    <div className="flex gap-6">
      {columns.map((col, i) => (
        <div
          key={i}
          className="flex flex-1 flex-col gap-6">
          {col.map((w) => (
            <div
              key={w.id}
              className="transition-transform duration-200 hover:-translate-y-1">
              <WallpaperCard wallpaperinfo={w} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;

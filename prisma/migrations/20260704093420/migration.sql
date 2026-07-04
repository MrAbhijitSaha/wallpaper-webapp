-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_wallpaper" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "fileSize" INTEGER,
    "format" TEXT,
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT,
    CONSTRAINT "wallpaper_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "wallpaper_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_wallpaper" ("categoryId", "createdAt", "downloadCount", "fileSize", "format", "height", "id", "image", "title", "updatedAt", "userId", "viewCount", "width") SELECT "categoryId", "createdAt", "downloadCount", "fileSize", "format", "height", "id", "image", "title", "updatedAt", "userId", "viewCount", "width" FROM "wallpaper";
DROP TABLE "wallpaper";
ALTER TABLE "new_wallpaper" RENAME TO "wallpaper";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

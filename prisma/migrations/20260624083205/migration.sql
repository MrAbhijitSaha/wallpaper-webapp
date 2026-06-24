/*
  Warnings:

  - You are about to drop the `CollectionItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WallpaperTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `isPublic` on the `Wallpaper` table. All the data in the column will be lost.
  - Added the required column `categoryName` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wallpaperId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Made the column `wallpaperId` on table `Download` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Made the column `wallpaperId` on table `Like` required. This step will fail if there are existing NULL values in that column.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CollectionItem";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Tag";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "WallpaperTag";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "categoryName" TEXT NOT NULL,
    "wallpaperId" TEXT NOT NULL
);
INSERT INTO "new_Category" ("id") SELECT "id" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE TABLE "new_Download" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "wallpaperId" TEXT NOT NULL,
    CONSTRAINT "Download_wallpaperId_fkey" FOREIGN KEY ("wallpaperId") REFERENCES "Wallpaper" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Download" ("id", "wallpaperId") SELECT "id", "wallpaperId" FROM "Download";
DROP TABLE "Download";
ALTER TABLE "new_Download" RENAME TO "Download";
CREATE TABLE "new_Like" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "likedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "wallpaperId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Like_wallpaperId_fkey" FOREIGN KEY ("wallpaperId") REFERENCES "Wallpaper" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Like" ("id", "wallpaperId") SELECT "id", "wallpaperId" FROM "Like";
DROP TABLE "Like";
ALTER TABLE "new_Like" RENAME TO "Like";
CREATE TABLE "new_Wallpaper" (
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
    CONSTRAINT "Wallpaper_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Wallpaper_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Wallpaper" ("categoryId", "createdAt", "downloadCount", "fileSize", "format", "height", "id", "image", "title", "updatedAt", "userId", "viewCount", "width") SELECT "categoryId", "createdAt", "downloadCount", "fileSize", "format", "height", "id", "image", "title", "updatedAt", "userId", "viewCount", "width" FROM "Wallpaper";
DROP TABLE "Wallpaper";
ALTER TABLE "new_Wallpaper" RENAME TO "Wallpaper";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

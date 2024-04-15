/*
  Warnings:

  - You are about to drop the column `content` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "content",
ADD COLUMN     "excerpt" TEXT,
ADD COLUMN     "quoteAuthor" TEXT,
ALTER COLUMN "description" DROP NOT NULL;

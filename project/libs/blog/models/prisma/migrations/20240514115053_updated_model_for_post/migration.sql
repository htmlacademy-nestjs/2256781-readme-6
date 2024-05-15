/*
  Warnings:

  - You are about to drop the column `originalUserId` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "originalUserId",
ADD COLUMN     "original_user_id" TEXT;

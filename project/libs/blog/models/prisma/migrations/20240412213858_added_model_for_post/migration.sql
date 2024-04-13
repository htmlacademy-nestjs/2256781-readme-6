-- CreateEnum
CREATE TYPE "PostContent" AS ENUM ('video', 'photo', 'link', 'quote', 'text');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('posted', 'draft');

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "originalId" TEXT NOT NULL,
    "type" "PostContent" NOT NULL,
    "status" "PostStatus" NOT NULL DEFAULT 'posted',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "posted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_reposted" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT[],

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "posts_title_idx" ON "posts"("title");

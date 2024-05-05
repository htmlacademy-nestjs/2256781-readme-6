import { Module } from '@nestjs/common';

import { BlogCommentModule } from '@project/blog-comment';
import { PrismaClientModule } from '@project/blog-models';

import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostFactory } from './blog-post.factory';
import { BlogLikeModule } from '@project/blog-like';

@Module({
  imports: [BlogCommentModule, PrismaClientModule, BlogLikeModule],
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostRepository, BlogPostFactory],
  exports: [BlogPostService],
})
export class BlogPostModule {}

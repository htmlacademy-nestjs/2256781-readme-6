import { Module } from '@nestjs/common';

import { BlogCommentModule } from '@project/blog-comment';
import { BlogPostModule } from '@project/blog-post';
import { BlogConfigModule } from '@project/blog-config';
import { BlogLikeModule } from '@project/blog-like';


@Module({
  imports: [BlogConfigModule, BlogCommentModule, BlogPostModule, BlogLikeModule],
  controllers: [],
  providers: [],
})
export class AppModule { }

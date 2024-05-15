import { Module } from '@nestjs/common';

import { BlogCommentModule } from '@project/blog-comment';
import { BlogPostModule } from '@project/blog-post';
import { BlogConfigModule } from '@project/blog-config';
import { BlogLikeModule } from '@project/blog-like';
import { BlogNotifyModule } from '@project/blog-notify';

@Module({
  imports: [
    BlogPostModule,
    BlogConfigModule,
    BlogCommentModule,
    BlogLikeModule,
    BlogNotifyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { BlogConfigModule } from '@project/blog-config';

@Module({
  imports: [
    BlogConfigModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule { }

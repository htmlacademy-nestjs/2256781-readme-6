import { Injectable } from '@nestjs/common';

import { EntityFactory, Post } from '@project/shared/core';

import { BlogPostEntity } from './blog-post.entity';
import { TPostDto } from './dto/create-post.dto';

@Injectable()
export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
  public create(entityPlainData: Post): BlogPostEntity {
    return new BlogPostEntity(entityPlainData);
  }

  public static createFromPostDto(dto: TPostDto): BlogPostEntity {
    return new BlogPostEntity(dto);
  }
}

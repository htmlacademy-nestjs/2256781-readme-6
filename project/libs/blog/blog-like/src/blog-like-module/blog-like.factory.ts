import { Injectable } from '@nestjs/common';

import { Like, EntityFactory } from '@project/shared/core';
import { BlogLikeEntity } from './blog-like.entity';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class BlogLikeFactory implements EntityFactory<BlogLikeEntity> {
  public create(entityPlainData: Like): BlogLikeEntity {
    return new BlogLikeEntity(entityPlainData);
  }

  public createFromDto(dto: CreateLikeDto): BlogLikeEntity {
    const currentDate = new Date();
    return new BlogLikeEntity({
      ...dto,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
  }
}

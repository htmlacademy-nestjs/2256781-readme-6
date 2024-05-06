import { Injectable } from '@nestjs/common';

import { PrismaClientService } from '@project/blog-models';
import { Like } from '@project/shared/core';
import { BasePostgresRepository } from '@project/data-access';

import { BlogLikeEntity } from './blog-like.entity';
import { BlogLikeFactory } from './blog-like.factory';

@Injectable()
export class BlogLikeRepository extends BasePostgresRepository<BlogLikeEntity, Like> {
  constructor(
    entityFactory: BlogLikeFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async create(entity: BlogLikeEntity): Promise<BlogLikeEntity> {
    const pojoEntity = entity.toPOJO();

    const record = await this.client.like.create({
      data: { ...pojoEntity },
    });

    entity.id = record.id;

    return entity;
  }

  public async find(postId: string, userId: string): Promise<BlogLikeEntity> {
    const record = await this.client.like.findFirst({
      where: {
        postId,
        userId
      }
    });

    return this.createEntityFromDocument(record);
  }

  public async findByPostId(postId: string): Promise<BlogLikeEntity[]> {
    const likes = await this.client.like.findMany({
      where: {
        postId,
      },
    });

    return likes.map((like) => this.createEntityFromDocument(like));
  }

  public async delete(id: string): Promise<void> {
    await this.client.like.delete({
      where: {
        id,
      },
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClientService } from '@project/blog-models';
import { Comment } from '@project/shared/core';

import { BlogCommentEntity } from './blog-comment.entity';
import { BlogCommentFactory } from './blog-comment.factory';
import { BasePostgresRepository } from '@project/data-access';
import { QueryCommentCommonDto } from './dto/query-comment.common.dto';

@Injectable()
export class BlogCommentRepository extends BasePostgresRepository<BlogCommentEntity, Comment> {
  constructor(
    entityFactory: BlogCommentFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async save(entity: BlogCommentEntity): Promise<BlogCommentEntity> {
    const record = await this.client.comment.create({
      data: { ...entity.toPOJO() }
    });

    entity.id = record.id;

    return entity;
  }

  public async findById(id: string): Promise<BlogCommentEntity> {
    const document = await this.client.comment.findFirst({
      where: {
        id,
      },
    });

    if (!document) {
      throw new NotFoundException(`Comment with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async findByPost({ limit, postId, sortDirection, page }: QueryCommentCommonDto): Promise<BlogCommentEntity[]> {
    const records = await this.client.comment.findMany({
      where: {
        postId,
      },
      take: limit,
      orderBy: [
        { createdAt: sortDirection }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });

    if (!records || records.length === 0) {
      throw new NotFoundException(`Comments with postId ${postId} not found.`);
    }

    return records.map(record => this.createEntityFromDocument(record))
  }

  public async updateById(id: string, entity: BlogCommentEntity): Promise<BlogCommentEntity> {
    const pojoEntity = entity.toPOJO();

    const record = await this.client.comment.update({
      where: {
        id
      },
      data: { ...pojoEntity, id }
    });

    return this.createEntityFromDocument(record);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({
      where: {
        id,
      }
    });
  }
}

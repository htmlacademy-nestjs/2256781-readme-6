import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PaginationResult, Post } from '@project/shared/core';
import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/blog-models';

import { BlogPostEntity } from './blog-post.entity';
import { BlogPostFactory } from './blog-post.factory';
import { BlogCommonQuery } from './query/blog-post.common-query';
import { PostStatusValue } from 'libs/shared/core/src/lib/types/post-status.type';
import { BlogTitleQuery } from './query/blog-post.title-query';

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<BlogPostEntity, Post> {
  constructor(
    entityFactory: BlogPostFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client)
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  public async save(entity: BlogPostEntity): Promise<BlogPostEntity> {
    const record = await this.client.post.create({
      data: {
        ...entity,
        comments: {
          connect: [],
        },
        likes: {
          connect: [],
        },
      },
      include: {
        comments: true,
        likes: true,
      },
    });

    entity.id = record.id;

    return entity;
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id
      }
    });
  }

  public async findById(id: string): Promise<BlogPostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        comments: true,
        likes: true,
      }
    });

    if (!document) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async update(id: string, entity: BlogPostEntity): Promise<BlogPostEntity> {
    const record = await this.client.post.update({
      where: { id: entity.id },
      data: {
        ...entity,
        comments: {
          connect: [],
        },
        likes: { connect: [], },
      },
      include: {
        comments: true,
        likes: true,
      },
    });

    return this.createEntityFromDocument(record);
  }

  public async findByCommonQuery(query?: BlogCommonQuery): Promise<PaginationResult<BlogPostEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    if (query?.sortDirection) {
      orderBy.createdAt = query.sortDirection;
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({
        where, orderBy, skip, take,
        include: {
          comments: true,
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    }
  }

  public async findUnpublishedUserPosts(userId: string): Promise<BlogPostEntity[]> {
    const records = await this.client.post.findMany({
      where: {
        userId,
        status: PostStatusValue.Draft,
      },
      include: {
        comments: true,
        likes: true,
      },
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }

  public async findByTitleQuery({ title, limit }: BlogTitleQuery): Promise<BlogPostEntity[]> {
    const records = await this.client.post.findMany({
      where: {
        title: {
          contains: title
        },
      },
      take: limit,
      include: {
        comments: true,
        likes: true,
        _count: {
          select: {
            comments: true,
            likes: true
          },
        },
      },
    });

    return records.map(({ _count, ...record }) => this.createEntityFromDocument({ ...record, commentsCount: _count.comments, likesCount: _count.likes }));
  }

  public async findNews(): Promise<BlogPostEntity[]> {
    const records = await this.client.post.findMany({
      where: {
        status: PostStatusValue.Posted,
      },
      include: {
        comments: true,
        likes: true,
        _count: {
          select: {
            comments: true,
            likes: true
          },
        },
      },
    });

    return records.map(({ _count, ...record }) => this.createEntityFromDocument({ ...record, commentsCount: _count.comments, likesCount: _count.likes }));
  }
}

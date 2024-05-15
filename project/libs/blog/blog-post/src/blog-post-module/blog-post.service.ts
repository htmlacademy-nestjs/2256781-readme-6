import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { PaginationResult } from '@project/shared/core';

import { BlogPostRepository } from './blog-post.repository';
import { TPostDto } from './dto/create-post.dto';
import { BlogPostEntity } from './blog-post.entity';
import { BlogCommonQuery } from './query/blog-post.common-query';
import { UpdatePostDto } from './dto/update-post.dto';
import { BlogPostFactory } from './blog-post.factory';
import { PostError } from './blog-post.constant';
import { BlogTitleQuery } from './query/blog-post.title-query';


@Injectable()
export class BlogPostService {
  constructor(
    private readonly postRepository: BlogPostRepository,
  ) { }

  public async createPost(dto: TPostDto): Promise<BlogPostEntity> {
    const newPost = BlogPostFactory.createFromPostDto(dto);
    await this.postRepository.save(newPost);

    return newPost;
  }

  public async deletePost(id: string, userId: string): Promise<void> {
    const deletingPost = await this.getPostById(id);

    if (deletingPost?.userId === userId) {
      await this.postRepository.deleteById(id);
    } else {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }

  public async getPostById(id: string): Promise<BlogPostEntity> {
    return this.postRepository.findById(id);
  }

  public async getNews(): Promise<BlogPostEntity[]> {
    return this.postRepository.findNews();
  }

  public async getUserPostsCount(id: string): Promise<number> {
    return this.postRepository.getPostCount({ userId: id });
  }

  public async getAllPostsByCommonQuery(query?: BlogCommonQuery): Promise<PaginationResult<BlogPostEntity>> {
    return this.postRepository.findByCommonQuery(query);
  }

  public async updatePost(id: string, dto: UpdatePostDto, userId: string): Promise<BlogPostEntity> {
    const existsPost = await this.postRepository.findById(id);

    if (existsPost?.userId !== userId) {
      throw new NotFoundException(`You can't update post with ID ${id}`);
    }

    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && existsPost[key] !== value) {
        existsPost[key] = value;
        hasChanges = true;
      }
    }

    if (!hasChanges) {
      return existsPost;
    }

    return this.postRepository.update(id, existsPost);
  }

  public async rePost(id: string, userId: string): Promise<BlogPostEntity> {
    const post = await this.postRepository.findById(id);

    if (post.isReposted) {
      throw new BadRequestException(PostError.AlreadyReposted)
    }

    post.userId = userId;
    post.isReposted = true;
    post.originalPostId = post.id;
    post.originalUserId = post.userId;

    await this.postRepository.save(post);

    return post;
  }

  async getUnpublishedUserPosts(userId: string): Promise<BlogPostEntity[]> {
    return this.postRepository.findUnpublishedUserPosts(userId);
  }

  async getPostsByTitle(search: BlogTitleQuery): Promise<BlogPostEntity[]> {
    return this.postRepository.findByTitleQuery(search);
  }
}

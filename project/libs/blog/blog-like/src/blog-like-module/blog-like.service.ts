import { BadRequestException, Injectable } from '@nestjs/common';

import { LikeError } from './blog-like.constant';
import { BlogLikeRepository } from './blog-like.repository';
import { BlogLikeEntity } from './blog-like.entity';

@Injectable()
export class BlogLikeService {
  constructor(
    private readonly likeRepository: BlogLikeRepository,
  ) { }

  public async create(postId: string, userId: string): Promise<BlogLikeEntity> {
    const like = await this.likeRepository.find(postId, userId);

    if (like) {
      throw new BadRequestException(LikeError.AlreadyExist)
    }

    const likeEntity = new BlogLikeEntity().populate({ postId, userId })

    return this.likeRepository.create(likeEntity);
  }

  public async findByPostId(postId: string): Promise<BlogLikeEntity[]> {
    return this.likeRepository.findByPostId(postId);
  }

  public async deleteLike(postId: string, userId: string): Promise<void> {
    const like = await this.likeRepository.find(postId, userId);

    if (!like) {
      throw new BadRequestException(LikeError.NoExistLikeId);
    }

    if (like.userId !== userId) {
      throw new BadRequestException(LikeError.NoCorrespondingUser);
    }

    await this.likeRepository.delete(like.id);
  }
}

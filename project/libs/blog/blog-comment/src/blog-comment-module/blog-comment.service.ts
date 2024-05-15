import { ConflictException, Injectable } from '@nestjs/common';

import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentEntity } from './blog-comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { QueryCommentCommonDto } from './dto/query-comment.common.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { BlogCommentFactory } from './blog-comment.factory';

@Injectable()
export class BlogCommentService {
  constructor(
    private readonly commentRepository: BlogCommentRepository,
    private readonly commentFactory: BlogCommentFactory,
  ) { }

  public async createComment(dto: CreateCommentDto, userId: string): Promise<BlogCommentEntity> {
    const commentEntity = this.commentFactory.create({ ...dto, userId });
    return this.commentRepository.save(commentEntity);
  }

  public async getComments(query: QueryCommentCommonDto): Promise<BlogCommentEntity[]> {
    return this.commentRepository.findByPost(query);
  }

  async getCommentById(commentId: string): Promise<BlogCommentEntity> {
    return this.commentRepository.findById(commentId);
  }

  async deleteComment(id: string, userId: string): Promise<void> {
    const comment = await this.getCommentById(id);

    if (!comment) {
      throw new ConflictException(`does not have a comment with ID ${id}.`);
    }

    if (comment.userId !== userId) {
      throw new ConflictException(`The user with ID ${userId} does not have a message with ID ${id}.`);
    }

    await this.commentRepository.deleteById(id);
  }

  async updateComment(id: string, dto: UpdateCommentDto, userId: string): Promise<BlogCommentEntity> {
    const comment = await this.getCommentById(id);

    if (!comment) {
      throw new ConflictException(`does not have a comment with ID ${id}.`);
    }

    if (comment.userId !== userId) {
      throw new ConflictException(`The user with ID ${userId} cannot modify the post with with ID ${id}.`);
    }

    return this.commentRepository.updateById(id, comment);
  }
}

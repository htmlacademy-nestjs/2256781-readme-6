import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Req } from '@nestjs/common';

import { BlogCommentService } from './blog-comment.service';
import { CommentRdo } from './rdo/comment.rdo';
import { fillDto } from '@project/shared/helpers';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentInfo } from './blog-comment.constant';
import { QueryCommentCommonDto } from './dto/query-comment.common.dto';
import { RequestWithTokenPayload } from '@project/shared/core';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateCommentValidationPipe } from './pipe/create-comment.validation.pipe';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('comments')
@Controller('comments')
export class BlogCommentController {
  constructor(
    private readonly blogCommentService: BlogCommentService,
  ) { }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: CommentInfo.Add,
  })
  @Post('/')
  async create(@Req() { user }: RequestWithTokenPayload, @Body(CreateCommentValidationPipe) dto: CreateCommentDto) {
    const newComment = await this.blogCommentService.createComment(dto, user.sub);

    return fillDto(CommentRdo, newComment.toPOJO());
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: CommentInfo.ShowAll,
  })
  @Get('/')
  async index(@Query() query: QueryCommentCommonDto) {
    const comments = await this.blogCommentService.getComments(query);

    return fillDto(CommentRdo, comments.map((comment) => comment.toPOJO()));
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: CommentInfo.Show,
  })
  @Get(':id')
  async show(@Param('id') id: string) {
    const comment = await this.blogCommentService.getCommentById(id);

    return fillDto(CommentRdo, comment.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: CommentInfo.Remove,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Req() { user }: RequestWithTokenPayload, @Param('id') id: string) {
    await this.blogCommentService.deleteComment(id, user.sub);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: CommentInfo.Update,
  })
  @Patch(':id')
  async update(@Req() { user }: RequestWithTokenPayload, @Param('id') id: string, @Body() dto: UpdateCommentDto) {
    const updatedComment = await this.blogCommentService.updateComment(id, dto, user.sub);

    return fillDto(CommentRdo, updatedComment.toPOJO());
  }
}

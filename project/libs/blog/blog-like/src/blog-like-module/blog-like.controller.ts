import { Controller, HttpStatus, Param, Post, Get, Delete, Req } from "@nestjs/common";
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/shared/helpers';
import { RequestWithTokenPayload } from '@project/shared/core';

import { LikesInfo } from './blog-like.constant';
import { BlogLikeService } from './blog-like.service';
import { LikeRdo } from './rdo/blog-like.rdo';

@ApiTags('likes')
@Controller('likes')
export class BlogLikeController {
  constructor(
    private readonly likeService: BlogLikeService,
  ) { }

  @ApiResponse({
    status: HttpStatus.OK,
    description: LikesInfo.Add
  })
  @Post(':postId')
  public async createLike(@Param('postId') postId: string, @Req() { user }: RequestWithTokenPayload) {
    const newLike = await this.likeService.create(postId, user.sub);

    return fillDto(LikeRdo, newLike.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: LikesInfo.Delete
  })
  @Delete(':postId')
  public async destroy(@Param('postId') postId: string, @Req() { user }: RequestWithTokenPayload) {
    await this.likeService.deleteLike(postId, user.sub);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: LikesInfo.Show
  })
  @Get(':postId')
  public async getLikes(@Param('postId') postId: string) {
    const likes = await this.likeService.findByPostId(postId);

    return fillDto(LikeRdo, likes.map((like) => like.toPOJO()));
  }
}

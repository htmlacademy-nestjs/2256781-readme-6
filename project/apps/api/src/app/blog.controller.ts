import 'multer';
import FormData from 'form-data';
import { HttpService } from '@nestjs/axios';
import { Body, Req, Controller, Delete, Param, Post, Get, Patch, UploadedFile, Query, UseFilters, UseGuards, UseInterceptors, HttpStatus, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { ApplicationServiceURL } from './app.config';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { CreatePhotoPostDto, TPostDto } from '@project/blog-post';
import { BlogInfo, CommentsInfo } from './app.constant';
import { BlogCommonQuery, BlogTitleQuery } from '@project/blog-post';
import { UpdatePostDto } from 'libs/blog/blog-post/src/blog-post-module/dto/update-post.dto';
import { PostStatusValue } from 'libs/shared/core/src/lib/types/post-status.type';
import { CreateCommentDto, QueryCommentCommonDto, UpdateCommentDto } from '@project/blog-comment';

const CommonApiError = {
  PostNotExist: 'Post not exist',
} as const;

@ApiTags('blog')
@Controller('blog')
@UseFilters(AxiosExceptionFilter)
export class BlogController {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('post')
  public async createPost(@Req() req: Request, @Body() dto: TPostDto, @UploadedFile() file: Express.Multer.File) {
    if (file && dto instanceof CreatePhotoPostDto) {
      const formData = new FormData();
      formData.append('file', Buffer.from(file.buffer), file.originalname);

      const { data: photo } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Files}/upload/photo`, formData, {
        headers: {
          'Content-Type': req.headers['content-type'],
          ...formData.getHeaders(),
        },
      });

      dto.link = photo.path;
    }

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/`, dto);

    return data;
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: BlogInfo.Add,
  })
  @Post('repost/:id')
  public async rePost(@Req() req: Request, @Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/repost/${id}`, null, {
      headers: {
        'Authorization': req.headers['authorization'],
      },
    });

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogInfo.ShowAll
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogInfo.EmptyList
  })
  @Get('posts')
  public async showPosts(@Query() query: BlogCommonQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/`, {
      params: query
    });

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogInfo.ShowAll
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogInfo.EmptyList
  })
  @Get('search')
  public async searchByTitlePosts(@Query() query: BlogTitleQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/search`, {
      params: query
    });

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogInfo.ShowAll
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogInfo.EmptyList
  })
  @Get('drafts')
  async showDraftsPosts(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/drafts`, {
      headers: {
        'Authorization': req.headers['authorization'],
      },
    });

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogInfo.ShowSingle
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogInfo.PostNotFound
  })
  @Get('post/:id')
  public async showByIdPost(@Param('id') id: string) {
    const { data: postData } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/${id}`);

    return postData;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogInfo.Update,
  })
  @Patch('post/:id')
  public async updatePost(@Req() req: Request, @Param('id') id: string, @Body() dto: UpdatePostDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Blog}/${id}`, dto, {
      headers: {
        'Authorization': req.headers['authorization']
      },
    });

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogInfo.Remove,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogInfo.DeleteError
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'post id',
  })
  @ApiBearerAuth()
  @Delete('post/:id')
  @UseInterceptors(InjectUserIdInterceptor)
  @UseGuards(CheckAuthGuard)
  public async deletePost(@Param('id') id: string, @Req() req: Request) {
    await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Blog}/${id}`, {
      headers: {
        'Authorization': req.headers['authorization']
      },
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogInfo.ShowLikes
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogInfo.PostNotFound
  })
  @Get('likes/:postId')
  public async getLikes(@Param('postId') postId: string, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Likes}/${postId}`, {
      headers: {
        'Authorization': req.headers['authorization'],
      },
    });

    return data;
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: BlogInfo.SetLike
  })
  @Post('like/:postId')
  public async setLike(@Param('postId') postId: string, @Req() req: Request) {
    const { data: post } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/${postId}`);

    if (post.status === PostStatusValue.Posted) {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Likes}/${postId}`, null, {
        headers: {
          'Authorization': req.headers['authorization'],
        },
      });

      return data;
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogInfo.RemoveLike
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogInfo.DeleteError
  })
  @Delete('like/:postId')
  public async deleteLike(@Param('postId') postId: string, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Likes}/${postId}`, {
      headers: {
        'Authorization': req.headers['authorization'],
      },
    });

    return data;
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CommentsInfo.Add,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('comment')
  public async createComment(@Body() dto: CreateCommentDto, @Req() req: Request) {

    const { data: postData } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/${dto.postId}`);

    if (!postData) {
      throw new BadRequestException(CommonApiError.PostNotExist);
    }

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Comments}/`, dto, {
      headers: {
        'Authorization': req.headers['authorization'],
      },
    });

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: CommentsInfo.Show,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentsInfo.InvalidPost,
  })
  @Get('comments')
  public async getComments(@Query() query: QueryCommentCommonDto) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comments}/`, {
      params: query,
    });

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: CommentsInfo.Show,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentsInfo.InvalidMessage,
  })
  @Get('comment/:id')
  public async showComment(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comments}/${id}`, {
      params: { id },
    });

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: CommentsInfo.Remove,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentsInfo.InvalidMessage,
  })
  @Delete('comment/:id')
  public async deleteComment(@Param('id') id: string, @Req() req: Request) {
    await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Comments}/${id}`, {
      headers: {
        'Authorization': req.headers['authorization'],
      },
    });
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CommentsInfo.Update,
  })
  @Patch('comment/:id')
  public async updateComment(@Param('id') id: string, @Req() req: Request, @Body() dto: UpdateCommentDto) {
    await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Comments}/${id}`, dto, {
      headers: {
        'Authorization': req.headers['authorization'],
      },
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogInfo.NewsSent
  })
  @UseGuards(CheckAuthGuard)
  @Get('news')
  public async sendNews(@Req() req: Request) {
    await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/news`, {
      headers: {
        'Authorization': req.headers['authorization'],
      },
    });
  }
}

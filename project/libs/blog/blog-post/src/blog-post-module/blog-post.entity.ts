import { Entity, Post, StorableEntity, TPostContentList, TPostStatusList } from '@project/shared/core';
import { BlogCommentEntity, BlogCommentFactory } from '@project/blog-comment';
import { BlogLikeEntity, BlogLikeFactory } from '@project/blog-like';
import { PostContentValue } from 'libs/shared/core/src/lib/types/post-type.type';
import { PostStatusValue } from 'libs/shared/core/src/lib/types/post-status.type';

export class BlogPostEntity extends Entity implements StorableEntity<Post> {
  public userId?: string;
  public type?: TPostContentList;
  public status?: TPostStatusList;
  public tags?: string[];
  public comments: BlogCommentEntity[];
  public likes: BlogLikeEntity[];
  public createdAt?: Date;
  public postedAt?: Date;
  public isReposted: boolean;
  public originalUserId?: string;
  public originalPostId?: string;
  public title?: string;
  public description?: string;
  public link?: string;
  public quoteAuthor?: string;
  public excerpt?: string;
  public likesCount?: number;
  public commentsCount?: number;

  constructor(post?: Post) {
    super();
    this.populate(post);
  }

  public populate(post?: Post) {
    if (!post) {
      return;
    }

    this.id = post.id ?? undefined;
    this.userId = post.userId;
    this.type = post.type ?? PostContentValue.Text;
    this.status = post.status ?? PostStatusValue.Draft;
    this.tags = post.tags ?? [];
    this.comments = [];
    this.likes = [];
    this.createdAt = post.createdAt ?? undefined;
    this.postedAt = post.postedAt ?? undefined;
    this.isReposted = post.isReposted ?? undefined;
    this.originalUserId = post.originalUserId ?? undefined;
    this.originalPostId = post.originalPostId ?? undefined;
    this.title = post.title ?? undefined;
    this.description = post.description ?? undefined;
    this.link = post.link ?? undefined;
    this.quoteAuthor = post.quoteAuthor ?? undefined;
    this.excerpt = post.excerpt ?? undefined;
    this.likesCount = post.likesCount ?? 0;
    this.commentsCount = post.commentsCount ?? 0;

    const blogCommentFactory = new BlogCommentFactory();
    for (const comment of post.comments) {
      const blogCommentEntity = blogCommentFactory.create(comment);
      this.comments.push(blogCommentEntity);
    }

    const blogLikeFactory = new BlogLikeFactory();
    for (const like of post.likes) {
      const blogLikeEntity = blogLikeFactory.create(like);
      this.likes.push(blogLikeEntity);
    }

    this.likesCount = this.likes.length;
    this.commentsCount = this.comments.length;
  }

  public toPOJO(): Post {
    return {
      id: this.id,
      userId: this.userId,
      type: this.type,
      status: this.status,
      tags: this.tags,
      comments: this.comments.map((commentEntity) => commentEntity.toPOJO()),
      likes: this.likes.map((likeEntity) => likeEntity.toPOJO()),
      createdAt: this.createdAt,
      postedAt: this.postedAt,
      isReposted: this.isReposted,
      originalUserId: this.originalUserId,
      originalPostId: this.originalPostId,
      title: this.title,
      description: this.description,
      link: this.link,
      quoteAuthor: this.quoteAuthor,
      excerpt: this.excerpt,
      likesCount: this.likesCount,
      commentsCount: this.commentsCount,
    }
  }
}

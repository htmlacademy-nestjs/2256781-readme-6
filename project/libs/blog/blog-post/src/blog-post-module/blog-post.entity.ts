import { Entity, Post, StorableEntity, TPostContentList, TPostStatusList } from '@project/shared/core';
import { BlogCommentEntity, BlogCommentFactory } from '@project/blog-comment';
import { BlogLikeEntity, BlogLikeFactory } from '@project/blog-like';

export class BlogPostEntity extends Entity implements StorableEntity<Post> {
  public userId?: string;
  public originalPostId?: string;
  public originalUserId?: string;
  public type: TPostContentList;
  public createdAt?: Date;
  public postedAt?: Date;
  public status: TPostStatusList;
  public isReposted: boolean;
  public tags?: string[];
  public likes: BlogLikeEntity[];
  public likesCount?: number;
  public comments: BlogCommentEntity[];
  public commentsCount?: number;

  constructor(post?: Post) {
    super();
    this.populate(post);
  }

  public populate(post?: Post): BlogPostEntity | null {
    if (!post) {
      return;
    }

    this.id = post.id ?? undefined;
    this.userId = post.userId ?? undefined;
    this.originalPostId = post.originalPostId ?? undefined;
    this.originalUserId = post.originalUserId ?? undefined;
    this.type = post.type;
    this.createdAt = post.createdAt ?? undefined;
    this.postedAt = post.postedAt ?? undefined;
    this.status = post.status;
    this.isReposted = post.isReposted ?? undefined;
    this.tags = post.tags ?? [];
    this.likes = [];
    this.likesCount = post.likesCount ?? 0;
    this.comments = [];
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

    return this;
  }

  public toPOJO(): Post {
    return {
      id: this.id,
      userId: this.userId,
      originalPostId: this.originalPostId,
      originalUserId: this.originalUserId,
      type: this.type,
      createdAt: this.createdAt,
      postedAt: this.postedAt,
      status: this.status,
      isReposted: this.isReposted,
      tags: this.tags,
      likes: this.likes.map((likeEntity) => likeEntity.toPOJO()),
      likesCount: this.likesCount,
      comments: this.comments.map((commentEntity) => commentEntity.toPOJO()),
      commentsCount: this.commentsCount,
    }
  }
}

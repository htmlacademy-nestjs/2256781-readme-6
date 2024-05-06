import { Like, Entity, StorableEntity } from '@project/shared/core';

export class BlogLikeEntity extends Entity implements StorableEntity<Like> {
  public postId: string;
  public userId: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(like?: Like) {
    super();
    this.populate(like);
  }

  public toPOJO() {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public populate(data: Like) {
    this.id = data.id ?? undefined;
    this.postId = data.postId;
    this.userId = data.userId;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    return this;
  }
}

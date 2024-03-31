import { Entity } from '@project/shared/core';
import { StorableEntity, AuthUser } from '@project/shared/core';

export class BlogUserEntity extends Entity implements StorableEntity<AuthUser> {
  public avatar: string;
  public email: string;
  public login: string;
  public passwordHash: string;

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser): void {
    if (! user) {
      return;
    }

    this.id = this.id ?? '';
    this.avatar = user.avatar ?? '';
    this.email = user.email;
    this.login = user.login;
    this.passwordHash = user.passwordHash;
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      avatar: this.avatar,
      email: this.email,
      login: this.login,
      passwordHash: this.passwordHash,
    }
  }
}

import { Entity, StorableEntity, Subscriber } from '@project/shared/core';

export class EmailSubscriberEntity extends Entity implements StorableEntity<Subscriber> {
  public email: string;
  public login?: string;
  public userId?: string;

  constructor (subscriber?: Subscriber) {
    super();
    this.populate(subscriber);
  }

  public populate(subscriber?: Subscriber): void {
    if (! subscriber) {
      return;
    }

    this.id = subscriber.id ?? '';
    this.email = subscriber.email;
    this.login = subscriber.login ?? '';
    this.userId = subscriber.userId ?? '';
  }

  public toPOJO(): Subscriber {
    return {
      id: this.id,
      email: this.email,
      login: this.login,
      userId: this.userId,
    }
  }
}

import { Injectable } from '@nestjs/common';

import { EmailSubscriberEntity } from './email-subscriber.entity';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import dayjs from 'dayjs';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository
  ) { }

  public async addSubscriber(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (existsSubscriber) {
      return existsSubscriber;
    }

    const emailSubscriber = new EmailSubscriberEntity(subscriber);
    await this.emailSubscriberRepository.save(emailSubscriber);

    return emailSubscriber;
  }

  public async getSubscriber(email: string) {
    return this.emailSubscriberRepository.findByEmail(email);
  }

  public async updateNotificationDate(subscriber: EmailSubscriberEntity) {
    const subscriberDto = { ...subscriber, dateOfNotification: dayjs().toISOString() };
    const updatedSubscriber = new EmailSubscriberEntity(subscriberDto);

    return this.emailSubscriberRepository.updateById(subscriber.id, updatedSubscriber);
  }
}

import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { RabbitRouting } from '@project/shared/core';

import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { MailService } from './mail-module/mail.service';
import { SubmitNewsDto } from './dto/submit-news.dto';
import { getNewPosts } from '@project/shared/helpers';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notify.income',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'readme.notify.income',
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
    this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: 'readme.notify.income',
    routingKey: RabbitRouting.SendNews,
    queue: 'readme.notify.sendNews',
  })
  public async sendNews(dto: SubmitNewsDto) {
    const receiver = await this.subscriberService.getSubscriber(dto.email);
    const newPosts = getNewPosts(dto, receiver);

    if (receiver && newPosts.length > 0) {
      await this.mailService.sendNews(receiver, newPosts);
      await this.subscriberService.updateNotificationDate(receiver);
    }
  }
}

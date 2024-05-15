import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';

import { RabbitRouting } from '@project/shared/core';
import { rabbitConfig } from '@project/blog-config';

import { SubmitNewsDto } from './dto/submit-news.dto';

@Injectable()
export class BlogNotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>,
  ) { }

  public async sendNews(dto: SubmitNewsDto) {
    return this.rabbitClient.publish<SubmitNewsDto>(
      this.rabbitOptions.exchange,
      RabbitRouting.SendNews,
      { ...dto }
    );
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BlogUserModule } from '@project/blog-user';
import { AuthenticationModule } from '@project/authentication';
import { AccountConfigModule, getMongooseOptions } from '@project/account-config';
import { NotifyModule } from '@project/account-notify';

@Module({
  imports: [
    BlogUserModule,
    AccountConfigModule,
    AuthenticationModule,
    NotifyModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    ),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule { }

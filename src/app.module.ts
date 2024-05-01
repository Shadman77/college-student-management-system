import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { StudentsModule } from './students/students.module';
import { mongoConfig } from './config';


@Module({
  imports: [
    MongooseModule.forRoot(mongoConfig.uri, {
      user: mongoConfig.user,
      pass: mongoConfig.pass,
      dbName: mongoConfig.db_name,
      w: 'majority',
      retryWrites: true,
    }),
    StudentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}

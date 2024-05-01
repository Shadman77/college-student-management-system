import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { StudentsModule } from './students/students.module';
import { mongoConfig } from './config';

console.log(mongoConfig.uri);

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
  providers: [AppService],
})
export class AppModule {}

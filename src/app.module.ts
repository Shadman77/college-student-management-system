import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { StudentsModule } from './students/students.module';
import { mongoConfig, redisCacheConfig } from './config';
import * as redisStore from 'cache-manager-redis-store';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: redisCacheConfig.host,
      port: redisCacheConfig.port,
      ttl: redisCacheConfig.ttl,
      db: redisCacheConfig.cache_db,
    }),
    MongooseModule.forRoot(mongoConfig.uri, {
      user: mongoConfig.user,
      pass: mongoConfig.pass,
      dbName: mongoConfig.db_name,
      w: 'majority',
      retryWrites: true,
    }),
    StudentsModule,
    UsersModule
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

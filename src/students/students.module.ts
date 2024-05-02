import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsController } from './controllers/students.controller';
import { StudentsService } from './services/students.service';
import { StudentSchema } from './schemas/student.schema';
import { StudentUpdateProcessor } from './processors/student-update.processor';
import { BullModule, BullModuleOptions } from '@nestjs/bull';
import { redisCacheConfig } from 'src/config';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: redisCacheConfig.host,
        port: redisCacheConfig.port,
        db: redisCacheConfig.queue_db,
      },
    }),
    BullModule.registerQueue({
      name: 'studentUpdate',
      redis: {
        host: redisCacheConfig.host,
        port: redisCacheConfig.port,
        db: redisCacheConfig.queue_db,
      },
    }),
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
  ],
  controllers: [StudentsController],
  providers: [StudentUpdateProcessor, StudentsService],
})
export class StudentsModule {}

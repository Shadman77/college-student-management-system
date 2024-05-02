import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsController } from './controllers/students.controller';
import { StudentsService } from './services/students.service';
import { StudentSchema } from './schemas/student.schema';
import { StudentUpdateProcessor } from './processors/student-update.processor';
import { BullModule, BullModuleOptions } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
        db: 0,
      },
    }),
    BullModule.registerQueue({
      name: 'studentUpdate',
      redis: {
        host: 'localhost',
        port: 6379,
        db: 0,
      },
    }),
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
  ],
  controllers: [StudentsController],
  providers: [StudentUpdateProcessor, StudentsService],
})
export class StudentsModule {}

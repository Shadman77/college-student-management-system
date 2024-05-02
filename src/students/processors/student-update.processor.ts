import { Process, Processor } from '@nestjs/bull';
import { StudentsService } from '../services/students.service';
import { randomHobbyHelper } from 'src/helpers';

@Processor('studentUpdate')
export class StudentUpdateProcessor {
  constructor(private readonly studentsService: StudentsService) {}

  @Process('update')
  async handleUpdateJob(job: any) {
    const studentId = job.data.studentId;
    const hobby = randomHobbyHelper();
    await this.studentsService.updateHobby(studentId, hobby);
  }
}

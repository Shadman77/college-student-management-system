import { Process, Processor } from '@nestjs/bull';

@Processor('studentUpdate')
export class StudentUpdateProcessor {
  @Process('update')
  async handleUpdateJob(job: any) {
    console.log('Hello World');
    console.log('Updated student ID:', job.data.studentId);
  }
}
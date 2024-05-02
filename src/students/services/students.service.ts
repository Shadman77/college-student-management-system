import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { InjectModel } from '@nestjs/mongoose';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Model } from 'mongoose';
import { Student } from '../interfaces/student.interface';
import { CreateStudentDto } from '../dtos/create-student.dto';
import { UpdateStudentDto } from '../dtos/update-student.dto';
import { apiConfig } from 'src/config';
import { SocketService } from '../../socket/services/socket.service';

@Injectable()
export class StudentsService {
  constructor(
    private readonly socketService: SocketService,
    @InjectQueue('studentUpdate') private readonly studentUpdateQueue: Queue,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectModel('Student') private readonly studentModel: Model<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const createStudent = new this.studentModel(createStudentDto);
    const createdStudent = await createStudent.save();
    if (createdStudent) {
      this.cacheManager.set(
        'totalNumberOfStudents',
        (await this.getTotalNumberOfStudents()) + 1, //How is race condition handled?
      );
    }

    return createStudent.save();
  }

  async getTotalNumberOfStudents(): Promise<number> {
    return (
      (await this.cacheManager.get('totalNumberOfStudents')) ||
      (await this.studentModel.countDocuments({ isDeleted: false }).exec())
    );
  }

  async getNumberOfPages(): Promise<number> {
    const elementsPerPage = apiConfig.elementsPerPage;
    const totalNumberOfStudents = await this.studentModel
      .countDocuments({ isDeleted: false })
      .exec();
    return Math.ceil(totalNumberOfStudents / elementsPerPage);
  }

  async findAll(paginationOptions): Promise<Student[]> {
    const elementsPerPage = apiConfig.elementsPerPage;
    const { page } = paginationOptions;
    const skip = (page - 1) * elementsPerPage;
    return this.studentModel
      .find(
        { isDeleted: false },
        { _id: 0, studentId: 1, name: 1, admissionDate: 1 },
      )
      .sort({ _id: -1 })
      .skip(skip)
      .limit(elementsPerPage)
      .exec();
  }

  async findOne(studentId: string): Promise<Student | null> {
    const student = await this.studentModel
      .findOne({ studentId, isDeleted: false })
      .exec();
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }
    return student;
  }

  async update(
    studentId: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const updateData = { ...updateStudentDto, updatedAt: new Date() };

    const updatedStudent = await this.studentModel
      .findOneAndUpdate({ studentId, isDeleted: false }, updateData, {
        new: true,
      })
      .exec();

    if (!updatedStudent) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    this.studentUpdateQueue.add('update', { studentId });

    return updatedStudent;
  }

  async updateHobby(studentId: string, hobby: string): Promise<Student> {
    const updateData = { hobby, updatedAt: new Date() };

    const updatedStudent = await this.studentModel
      .findOneAndUpdate({ studentId, isDeleted: false }, updateData, {
        new: true,
      })
      .exec();

    this.socketService.emitToRoom('students', 'student-updated', updatedStudent);
    return updatedStudent;
  }

  async delete(studentId: string): Promise<Student> {
    const updateData = { isDeleted: true, isDeletedAt: new Date() };

    const deletedStudent = await this.studentModel
      .findOneAndUpdate({ studentId, isDeleted: false }, updateData, {
        new: true,
      })
      .exec();

    if (!deletedStudent) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    } else {
      this.cacheManager.set(
        'totalNumberOfStudents',
        (await this.getTotalNumberOfStudents()) - 1, //How is race condition handled?
      );
    }

    return deletedStudent;
  }
}

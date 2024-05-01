import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from '../interfaces/student.interface';
import { CreateStudentDto } from '../dtos/create-student.dto';
import { UpdateStudentDto } from '../dtos/update-student.dto';
import { apiConfig } from 'src/config';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel('Student') private readonly studentModel: Model<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const createdStudent = new this.studentModel(createStudentDto);
    return createdStudent.save();
  }

  async findAll(paginationOptions): Promise<Student[]> {
    const fixedLimit = apiConfig.elementsPerPage;
    const { page } = paginationOptions;
    const skip = (page - 1) * fixedLimit;
    return this.studentModel
      .find({}, { _id: 0, studentId: 1, name: 1, admissionDate: 1 })
      .skip(skip)
      .limit(fixedLimit)
      .exec();
  }

  async findOne(studentId: string): Promise<Student | null> {
    return this.studentModel.findOne({ studentId }).exec();
  }

  async update(
    studentId: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student | null> {
    const updateData = { ...updateStudentDto, updatedAt: new Date() };

    return this.studentModel
      .findOneAndUpdate({ studentId }, updateData, { new: true })
      .exec();
  }

  async delete(studentId: string): Promise<Student | null> {
    const deletedStudent = await this.studentModel
      .findOneAndDelete({ studentId })
      .exec();
    return deletedStudent;
  }
}

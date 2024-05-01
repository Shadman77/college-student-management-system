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
    return this.studentModel.findOne({ studentId, isDeleted: false }).exec();
  }

  async update(
    studentId: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student | null> {
    const updateData = { ...updateStudentDto, updatedAt: new Date() };

    return this.studentModel
      .findOneAndUpdate({ studentId, isDeleted: false }, updateData, {
        new: true,
      })
      .exec();
  }

  async delete(studentId: string): Promise<Student | null> {
    const updateData = { isDeleted: true, isDeletedAt: new Date() };

    return this.studentModel
      .findOneAndUpdate({ studentId, isDeleted: false }, updateData, {
        new: true,
      })
      .exec();
  }
}

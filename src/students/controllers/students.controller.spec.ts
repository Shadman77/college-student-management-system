import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from '../services/students.service';
import { Student } from '../interfaces/student.interface';
import { CreateStudentDto } from '../dtos/create-student.dto';

describe('StudentsController', () => {
  let controller: StudentsController;
  let studentsService: StudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [
        {
          provide: StudentsService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
            getNumberOfPages: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
    studentsService = module.get<StudentsService>(StudentsService);
  });

  describe('findAll', () => {
    const mockStudents: Student[] = [
      {
        studentId: '1',
        name: 'John Doe',
        age: 20,
        gender: 'male',
        course: 'Computer Science',
        admissionDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        studentId: '2',
        name: 'Jane Smith',
        age: 22,
        gender: 'female',
        course: 'Mathematics',
        admissionDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const mockNumberOfPages = 1;

    it('should return all students', async () => {
      jest
        .spyOn(studentsService, 'getNumberOfPages')
        .mockResolvedValue(mockNumberOfPages);
      jest.spyOn(studentsService, 'findAll').mockResolvedValue(mockStudents);

      const result = await controller.findAll();

      expect(result).toEqual({
        numberOfPages: mockNumberOfPages,
        students: mockStudents,
      });
      expect(studentsService.getNumberOfPages).toHaveBeenCalled();
      expect(studentsService.findAll).toHaveBeenCalled();
    });

    it('should return no students', async () => {
      jest.spyOn(studentsService, 'getNumberOfPages').mockResolvedValue(0);
      jest.spyOn(studentsService, 'findAll').mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual({
        numberOfPages: 0,
        students: [],
      });
      expect(studentsService.getNumberOfPages).toHaveBeenCalled();
      expect(studentsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    const mockStudent: Student = {
      studentId: '1',
      name: 'John Doe',
      age: 20,
      gender: 'male',
      course: 'Computer Science',
      admissionDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should return no students', async () => {
      jest.spyOn(studentsService, 'findOne').mockResolvedValue(mockStudent);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockStudent);
      expect(studentsService.findOne).toHaveBeenCalled();
    });

    it('should return null', async () => {
      jest.spyOn(studentsService, 'findOne').mockResolvedValue(null);

      const result = await controller.findOne('2');

      expect(result).toEqual(null);
      expect(studentsService.findOne).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    const mockStudentInput: CreateStudentDto = {
      studentId: '1',
      name: 'John Doe',
      age: 20,
      gender: 'male',
      course: 'Computer Science',
      admissionDate: new Date(),
    };

    const mockStudentOutput: Student = {
      studentId: '1',
      name: 'John Doe',
      age: 20,
      gender: 'male',
      course: 'Computer Science',
      admissionDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should return created student object', async () => {
      jest
        .spyOn(studentsService, 'create')
        .mockResolvedValue(mockStudentOutput);

      const result = await controller.create(mockStudentInput);

      expect(result).toEqual(mockStudentOutput);
      expect(studentsService.create).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    const mockStudentInput: CreateStudentDto = {
      studentId: '1',
      name: 'John Doe Edit',
      age: 20,
      gender: 'male',
      course: 'Computer Science',
      admissionDate: new Date(),
    };

    const mockStudentOutput: Student = {
      studentId: '1',
      name: 'John Doe Edit',
      age: 20,
      gender: 'male',
      course: 'Computer Science',
      admissionDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should return updated student object', async () => {
      jest
        .spyOn(studentsService, 'update')
        .mockResolvedValue(mockStudentOutput);

      const result = await controller.update('1', mockStudentInput);

      expect(result).toEqual(mockStudentOutput);
      expect(studentsService.update).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    const mockStudentOutput: Student = {
      studentId: '1',
      name: 'John Doe Edit',
      age: 20,
      gender: 'male',
      course: 'Computer Science',
      admissionDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should return deleted student object', async () => {
      jest
        .spyOn(studentsService, 'delete')
        .mockResolvedValue(mockStudentOutput);

      const result = await controller.remove('1');

      expect(result).toEqual(mockStudentOutput);
      expect(studentsService.delete).toHaveBeenCalled();
    });
  });
});

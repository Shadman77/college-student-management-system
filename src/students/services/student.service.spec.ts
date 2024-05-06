import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { SocketService } from '../../socket/services/socket.service';
import { SocketGateway } from '../../socket/socket';
import { Model } from 'mongoose';
import { Student } from '../interfaces/student.interface';
import { CreateStudentDto } from '../dtos/create-student.dto';

describe('StudentsService', () => {
  let service: StudentsService;
  let mockModel: Model<Student>;

  beforeEach(async () => {
    // Create a mock instance of the model
    const modelMock = {
      save: jest.fn().mockResolvedValue({} as Student), // Mock the save method to return an empty object
    };

    // Create a mock of the model class
    mockModel = jest.fn(() => modelMock) as unknown as Model<Student>;

    mockModel.countDocuments = jest.fn().mockResolvedValue(0);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        SocketService,
        SocketGateway,
        {
          provide: 'StudentModel',
          useValue: mockModel,
        },
        {
          provide: 'CACHE_MANAGER',
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
        {
          provide: 'BullQueue_studentUpdate',
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
  });

  it('should create a student', async () => {
    const createStudentDto: CreateStudentDto = {
      studentId: '1',
      name: 'John Doe',
      age: 20,
      gender: 'male',
      course: 'Computer Science',
      admissionDate: new Date(),
    };
    const expectedStudent: Student = {
      studentId: '1',
      name: 'John Doe',
      age: 20,
      gender: 'male',
      course: 'Computer Science',
      admissionDate: createStudentDto.admissionDate,
    };

    // Mock the resolve value for the save method
    // mockModel.prototype.save.mockResolvedValueOnce(expectedStudent);

    const result = await service.create(createStudentDto);
    console.log(result);

    expect(result).toBeDefined();
    // expect(mockModel.prototype.save).toHaveBeenCalledWith(createStudentDto); // Ensure save method is called with correct parameters
  });
});

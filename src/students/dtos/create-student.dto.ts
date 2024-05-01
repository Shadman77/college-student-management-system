import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsIn,
  IsOptional,
  IsDate,
  Min,
  Max,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  studentId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(16, { message: 'Age must be at least 16' })
  @Max(22, { message: 'Age must be at most 22' })
  age: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(['male', 'female', 'other'])
  gender: string;

  @IsNotEmpty()
  @IsString()
  course: string;

  @IsOptional()
  @IsString()
  hobby?: string;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  admissionDate: Date;
}

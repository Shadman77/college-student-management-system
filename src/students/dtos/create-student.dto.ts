import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsIn,
  IsOptional,
  IsDate,
} from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  studentId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
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
  admissionDate: Date;
}

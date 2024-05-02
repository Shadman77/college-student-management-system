import {
  IsNotEmpty,
  IsString,
  IsIn,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['user', 'admin', 'other'])
  role: string;
}

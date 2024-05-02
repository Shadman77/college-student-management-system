import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from '../services/students.service';
import { CreateStudentDto } from '../dtos/create-student.dto';
import { UpdateStudentDto } from '../dtos/update-student.dto';
import { JwtAuthGuard } from '../../auth/guard/jwt.guard';
import { Role } from '../../auth/decorators/role.decorator';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @UseGuards(JwtAuthGuard)
  @Role('admin')
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Role('admin')
  @Get()
  async findAll(@Query('page') page: number = 1) {
    const paginationOptions = {
      page: page,
    };
    const [numberOfPages, students] = await Promise.all([
      this.studentsService.getNumberOfPages(),
      this.studentsService.findAll(paginationOptions),
    ]);

    return { numberOfPages, students };
  }

  @UseGuards(JwtAuthGuard)
  @Role('admin')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Role('admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Role('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.delete(id);
  }
}

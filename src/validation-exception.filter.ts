import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import mongoose from 'mongoose';

@Catch(mongoose.Error.ValidationError)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: mongoose.Error.ValidationError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();

    const errors = {};
    for (const key in exception.errors) {
      errors[key] = exception.errors[key].message;
    }

    response.status(HttpStatus.BAD_REQUEST).json({
      message: 'Validation failed',
      errors: errors,
    });
  }
}

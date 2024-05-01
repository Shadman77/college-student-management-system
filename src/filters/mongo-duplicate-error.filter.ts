import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoDuplicateErrorFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();

    if (exception.code === 11000) {
      
      const errorMessage: string = exception.message;
      const matches = errorMessage.match(/index: (.+?) dup key/);
      const duplicateKey = matches ? matches[1] : 'Unknown';

      response.status(HttpStatus.CONFLICT).json({
        message: 'Duplicate key error',
        duplicateKey: duplicateKey.slice(0, -2), //including the field name by formatting the respective index
      });
    } else {
      // Handle other MongoDB errors
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  }
}

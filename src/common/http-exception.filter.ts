import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { isArray } from 'lodash';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let { message } = exception.getResponse() as Record<string, any>;
    if (isArray(message) && message.length > 0) {
      message = message[0];
    }
    const status = exception.getStatus();
    response.status(status).json({
      success: false,
      status,
      message,
      path: request.url,
      timestamp: new Date(),
    });
  }
}

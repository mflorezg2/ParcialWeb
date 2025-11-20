/* eslint-disable prettier/prettier */
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { BusinessError } from '../errors/business-errors';
import { BusinessLogicException } from '../errors/business-errors';

@Injectable()
export class BusinessErrorsInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {

        if (!(error instanceof BusinessLogicException)) {
          throw error;
        }

        switch (error.type) {
          case BusinessError.USER_NOT_FOUND:
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);

          case BusinessError.INVALID_EMAIL:
          case BusinessError.INVALID_CREDENTIALS:
          case BusinessError.INVALID_ROLES:
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);

          case BusinessError.EMAIL_ALREADY_EXISTS:
          case BusinessError.ROLE_ALREADY_EXISTS:
            throw new HttpException(error.message, HttpStatus.CONFLICT);

          case BusinessError.NOT_AUTHORIZED:
          case BusinessError.USER_LOCKED:
          case BusinessError.TOKEN_INVALID:
            throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);

          case BusinessError.ERROR_LISTING_USERS:
          case BusinessError.ERROR_FETCHING_ROLES:
            throw new HttpException(
              error.message,
              HttpStatus.INTERNAL_SERVER_ERROR,
            );

          case BusinessError.ROLE_NAME_REQUIRED:
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);

          default:
            throw error;
        }
      }),
    );
  }
}

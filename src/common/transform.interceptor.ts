import { CallHandler, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response<T> {
  data: T;
}

@Injectable()
export class TranformIntercetor<T> implements NestInterceptor<T, Response<T>> {
  intercept(_, next: CallHandler): Observable<Response<T>> {
    console.log(_);
    return next.handle().pipe(
      map((data) => ({
        data,
        status: 200,
        message: '操作成功',
        success: true,
      })),
    );
  }
}

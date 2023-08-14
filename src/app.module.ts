import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LogsModule } from './logs/logs.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'tjl19970824',
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    LogsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

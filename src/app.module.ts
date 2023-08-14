import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [UsersModule, DatabaseModule, LogsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

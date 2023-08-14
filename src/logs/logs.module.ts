import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './entities/log.entity';
import { LogEnum } from 'src/enum/config.enum';
import { ConfigService } from '@nestjs/config';

function createDailyRotateFile(level: string, filename: string) {
  return new winston.transports.DailyRotateFile({
    level,
    dirname: 'logs',
    filename: `${filename}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple(),
    ),
  });
}
@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          transports: [
            new winston.transports.Console({
              level: configService.get(LogEnum.LOG_LEVEL),
              format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.ms(),
                utilities.format.nestLike('TEST'),
              ),
            }),
            ...(configService.get(LogEnum.LOG_ON)
              ? [
                  createDailyRotateFile('info', 'application'),
                  createDailyRotateFile('warn', 'error'),
                ]
              : []),
          ],
        };
      },
    }),
    TypeOrmModule.forFeature([Log]),
  ],
  controllers: [LogsController],
  providers: [LogsService],
})
export class LogsModule {}

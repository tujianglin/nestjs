import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { DailyRotateFile } from 'winston/lib/winston/transports';
function createDailyRotateTrasnport(level: string, filename: string) {
  return new DailyRotateFile({
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
async function bootstrap() {
  const instance = winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          utilities.format.nestLike('TEST', {
            colors: true,
            prettyPrint: true,
          }),
        ),
      }),
      createDailyRotateTrasnport('info', 'application'),
      createDailyRotateTrasnport('warn', 'error'),
    ],
  });
  const app = await NestFactory.create(AppModule, {
    // winston 替换 nest 日志
    logger: WinstonModule.createLogger({
      instance,
    }),
  });
  /* swigger配置 */
  const config = new DocumentBuilder()
    .setTitle('接口')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();

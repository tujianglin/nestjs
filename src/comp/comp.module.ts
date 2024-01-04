import { Logger, Module } from '@nestjs/common';
import { CompService } from './comp.service';
import { CompController } from './comp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comp } from './entities/comp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comp])],
  controllers: [CompController],
  providers: [CompService, Logger],
})
export class CompModule {}

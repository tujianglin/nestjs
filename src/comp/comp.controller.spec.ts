import { Test, TestingModule } from '@nestjs/testing';
import { CompController } from './comp.controller';
import { CompService } from './comp.service';

describe('CompController', () => {
  let controller: CompController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompController],
      providers: [CompService],
    }).compile();

    controller = module.get<CompController>(CompController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

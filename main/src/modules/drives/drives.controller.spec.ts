import { Test, TestingModule } from '@nestjs/testing';
import { DrivesController } from './drives.controller';
import { DrivesService } from './drives.service';

describe('DrivesController', () => {
  let controller: DrivesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrivesController],
      providers: [DrivesService],
    }).compile();

    controller = module.get<DrivesController>(DrivesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

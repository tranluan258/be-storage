import { Test, TestingModule } from '@nestjs/testing';
import { DrivesService } from './drives.service';

describe('DrivesService', () => {
  let service: DrivesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrivesService],
    }).compile();

    service = module.get<DrivesService>(DrivesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

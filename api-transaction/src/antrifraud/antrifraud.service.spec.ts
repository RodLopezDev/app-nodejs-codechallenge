import { Test, TestingModule } from '@nestjs/testing';
import { AntrifraudService } from './antrifraud.service';

describe('AntrifraudService', () => {
  let service: AntrifraudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AntrifraudService],
    }).compile();

    service = module.get<AntrifraudService>(AntrifraudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

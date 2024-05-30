import { Test, TestingModule } from '@nestjs/testing';
import { TransferStateService } from './transferstate.service';

describe('StateService', () => {
  let service: TransferStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransferStateService],
    }).compile();

    service = module.get<TransferStateService>(TransferStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

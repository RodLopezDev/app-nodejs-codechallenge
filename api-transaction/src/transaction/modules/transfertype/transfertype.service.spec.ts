import { Test, TestingModule } from '@nestjs/testing';
import { TransferTypeService } from './transfertype.service';

describe('TransactiontypeService', () => {
  let service: TransferTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransferTypeService],
    }).compile();

    service = module.get<TransferTypeService>(TransferTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

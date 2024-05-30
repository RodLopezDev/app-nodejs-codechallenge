import { Module } from '@nestjs/common';
import { TransferTypeService } from './transfertype.service';

@Module({
  controllers: [],
  providers: [TransferTypeService],
  exports: [TransferTypeService],
})
export class TransferTypeModule {}

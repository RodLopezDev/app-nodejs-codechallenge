import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction, TransactionSchema } from './entities/transaction.entity';

import { AntrifraudModule } from '../antrifraud/antrifraud.module';

import { TransferStateModule } from './modules/trasnferstate/transferstate.module';
import { TransferTypeModule } from './modules/transfertype/transfertype.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    AntrifraudModule,
    TransferStateModule,
    TransferTypeModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}

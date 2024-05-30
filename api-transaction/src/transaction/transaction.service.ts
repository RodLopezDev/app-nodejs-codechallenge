import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private model: Model<Transaction>,
  ) {}

  async create(dto: CreateTransactionDto) {
    const transaction = await this.model.create(dto);
    return transaction;
  }

  async finOne(transactionId: string) {
    return await this.model.findById(transactionId);
  }
}

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Injectable } from '@nestjs/common';
import { State } from './entity/state.entity';

@Injectable()
export class TransferStateService {
  constructor(@InjectModel(State.name) private model: Model<State>) {}

  async create(transactionId: string, state: string) {
    const transaction = await this.model.create({ transactionId, state });
    return transaction;
  }

  finByTransactionId(transactionId: string) {
    return this.model.find({ transactionId });
  }
}

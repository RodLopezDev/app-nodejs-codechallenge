import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';

import { StateService } from './state/state.service';
import { TransactionService } from './transaction.service';
import { AntrifraudService } from '../antrifraud/antrifraud.service';

import { CreateTransactionDto } from './dto/create-transaction.dto';

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly stateService: StateService,
    private readonly antrifraudService: AntrifraudService,
  ) {}

  @Post()
  async create(@Body() dto: CreateTransactionDto) {
    const transaction = await this.transactionService.create(dto);
    await this.stateService.create(transaction.id, 'CREATED');

    const antifraud = await this.antrifraudService.antiFraudValidation({
      ...dto,
      id: transaction.id,
    });

    await this.stateService.create(transaction.id, antifraud.status);
    return { ...transaction.toJSON() };
  }

  @Get(':transactionId')
  async findOne(@Param('transactionId') transactionId: string) {
    const transaction = await this.transactionService.finOne(transactionId);
    if (!transaction) {
      throw new NotFoundException('Transaction');
    }

    const status = await this.stateService.finByTransactionId(transaction.id);
    const {
      _id,
      accountExternalIdCredit,
      accountExternalIdDebit,
      tranferTypeId,
      value,
    } = transaction.toJSON();
    return {
      id: _id,
      accountExternalIdCredit,
      accountExternalIdDebit,
      tranferTypeId,
      value,
      status: status.map((e) => {
        const { _id, state, createdAt } = e;
        return { id: _id, state, createdAt };
      }),
    };
  }
}

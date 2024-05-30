import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, Logger } from '@nestjs/common';

import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AntrifraudService } from '../antrifraud/antrifraud.service';

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly antrifraudService: AntrifraudService,
  ) {}

  @Post()
  async create(@Body() dto: CreateTransactionDto) {
    const status = await this.antrifraudService.antiFraudValidation({
      ...dto,
      id: '1',
    });
    Logger.log(status, 'controller');
    return this.transactionService.create(dto);
  }
}

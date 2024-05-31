import { ApiTags } from '@nestjs/swagger';
import {
  Get,
  Post,
  Body,
  Param,
  Controller,
  NotFoundException,
} from '@nestjs/common';

import { CreateTransactionDto } from './dto/create-transaction.dto';

import { TransactionService } from './transaction.service';
import { AntrifraudService } from '../antrifraud/antrifraud.service';

import { TransferStateService } from './modules/trasnferstate/transferstate.service';
import { TransferTypeService } from './modules/transfertype/transfertype.service';

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly transactiontypeService: TransferTypeService,
    private readonly stateService: TransferStateService,
    private readonly antrifraudService: AntrifraudService,
  ) {}

  @Post()
  async create(@Body() dto: CreateTransactionDto) {
    const type = this.transactiontypeService.findOne(dto.tranferTypeId);
    if (!type) {
      throw new NotFoundException('TransferType');
    }

    const transaction = await this.transactionService.create(dto);
    await this.stateService.create(transaction.id, 'pending');

    const antifraud = await this.antrifraudService.antiFraudValidation({
      ...dto,
      id: transaction.id,
    });

    const finalStatus = await this.stateService.create(
      transaction.id,
      antifraud.status,
    );
    const { _id, value, createdAt } = transaction.toJSON();

    return {
      transactionExternalId: _id,
      transactionType: {
        name: type.name,
      },
      transactionStatus: {
        name: finalStatus.state,
      },
      value,
      createdAt,
    };
  }

  @Get(':transactionId')
  async findOne(@Param('transactionId') transactionId: string) {
    const transaction = await this.transactionService.finOne(transactionId);
    if (!transaction) {
      throw new NotFoundException('Transaction');
    }
    const type = this.transactiontypeService.findOne(transaction.tranferTypeId);
    if (!transaction) {
      throw new NotFoundException('TransferType');
    }

    const status = await this.stateService.finByTransactionId(transaction.id);
    const finalStatus = status?.[status.length - 1];
    if (!finalStatus) {
      throw new NotFoundException('State');
    }

    const { _id, createdAt, value } = transaction.toJSON();
    return {
      transactionExternalId: _id,
      transactionType: {
        name: type.name,
      },
      transactionStatus: {
        name: finalStatus.state,
      },
      value,
      createdAt,
    };
  }
}

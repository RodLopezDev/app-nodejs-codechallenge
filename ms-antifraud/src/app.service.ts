import { Injectable } from '@nestjs/common';

import { AntifraudValues } from './common/configs';
import { TransactionMessageDto } from './dto/transaction.dto';
import { TransactionResponse } from './dto/transaction.reponse';

@Injectable()
export class AppService {
  validate(dto: TransactionMessageDto): TransactionResponse {
    const { id, value } = dto;
    const status =
      value > 1000 ? AntifraudValues.rejected : AntifraudValues.approved;
    const response = {
      id,
      status,
    };
    return response;
  }
}

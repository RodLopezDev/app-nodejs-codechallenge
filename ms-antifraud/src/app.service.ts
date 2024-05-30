import { Injectable } from '@nestjs/common';
import { TransactionMessageDto } from './dto/transaction.dto';

@Injectable()
export class AppService {
  validate(dto: TransactionMessageDto) {
    const { id, value } = dto;
    const response = {
      id,
      status: value > 1000 ? 'REJECTED' : 'APPROVED',
    };
    return response;
  }
}

import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KAFKA_TOPIC_ANTIFRAUD_VALIDATION } from './common/configs';
import { TransactionMessageDto } from './dto/transaction.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @MessagePattern(KAFKA_TOPIC_ANTIFRAUD_VALIDATION)
  async infoTransaction(@Payload() dto: TransactionMessageDto): Promise<any> {
    return this.service.validate(dto);
  }
}

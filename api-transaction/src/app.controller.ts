import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { KafkaService } from './KafkaService';

@Controller()
export class AppController {
  constructor(
    private readonly kafkaService: KafkaService,
    private readonly appService: AppService,
  ) {}

  @Get()
  async getHello() {
    return await this.kafkaService.antiFraudValidation({
      id: 'string;',
      accountExternalIdDebit: 'string;',
      accountExternalIdCredit: 'string;',
      tranferTypeId: 123,
      value: 1002,
    });
  }
}

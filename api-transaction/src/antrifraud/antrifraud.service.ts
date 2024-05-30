import { firstValueFrom } from 'rxjs';
import { ClientKafka } from '@nestjs/microservices';
import { Inject, Injectable, Logger } from '@nestjs/common';

import {
  KAFKA_INSTANCE_NAME,
  KAFKA_TOPIC_ANTIFRAUD_VALIDATION,
} from '../app/config';
import { AntifraudResponse } from './dto/antifraud.response';
import { TransactionMessage } from './dto/antifruad.dto';

@Injectable()
export class AntrifraudService {
  constructor(
    @Inject(KAFKA_INSTANCE_NAME)
    private readonly kafka: ClientKafka,
  ) {}

  async onModuleInit() {
    [KAFKA_TOPIC_ANTIFRAUD_VALIDATION].forEach((topic) => {
      this.kafka.subscribeToResponseOf(topic);
    });
    await this.kafka.connect();
  }

  async onModuleDestroy() {
    await this.kafka.close();
  }

  async antiFraudValidation(
    message: TransactionMessage,
  ): Promise<AntifraudResponse> {
    return firstValueFrom(
      this.kafka.send(
        KAFKA_TOPIC_ANTIFRAUD_VALIDATION,
        JSON.stringify(message),
      ),
    ).catch(Logger.error);
  }
}

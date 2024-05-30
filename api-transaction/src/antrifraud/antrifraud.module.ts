import { Module } from '@nestjs/common';
import { AntrifraudService } from './antrifraud.service';
import {
  ClientProvider,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';

import {
  KAFKA_INSTANCE_NAME,
  KAFKA_CONSUMER_CLIENTID,
  KAFKA_CONSUMER_GROUP_ID,
} from '../app/config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: KAFKA_INSTANCE_NAME,
        useFactory: (config: ConfigService): ClientProvider => {
          const host = config.get<string>('kafka.host');
          const port = config.get<number>('kafka.port');
          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: KAFKA_CONSUMER_CLIENTID,
                brokers: [`${host}:${port}`],
              },
              consumer: {
                groupId: KAFKA_CONSUMER_GROUP_ID,
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [],
  providers: [AntrifraudService],
  exports: [AntrifraudService],
})
export class AntrifraudModule {}

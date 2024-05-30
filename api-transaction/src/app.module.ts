import { Logger, Module } from '@nestjs/common';
import {
  ClientProvider,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

import {
  KAFKA_INSTANCE_NAME,
  KAFKA_CONSUMER_CLIENTID,
  KAFKA_CONSUMER_GROUP_ID,
} from './common/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => {
          Logger.log(`PORT: ${process.env.PORT}`);
          Logger.log(`MONGO_URI: ${process.env.MONGO_URI}`);
          Logger.log(`KAFKA_HOST: ${process.env.KAFKA_HOST}`);
          Logger.log(`KAFKA_PORT: ${process.env.KAFKA_PORT}`);
          return {
            port: Number(process.env.PORT) || 4000,
            database: {
              uri: String(process.env.MONGO_URI) || '',
            },
            kafka: {
              host: String(process.env.KAFKA_HOST) || '',
              port: Number(process.env.KAFKA_PORT) || 9092,
            },
          };
        },
      ],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('database.uri'),
      }),
    }),
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

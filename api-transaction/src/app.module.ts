import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { AntrifraudModule } from './antrifraud/antrifraud.module';
import { TransactionModule } from './transaction/transaction.module';

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
      useFactory: (config: ConfigService) => {
        console.log('URL-MONGO', config.get<string>('database.uri'));
        return {
          uri: config.get<string>('database.uri'),
        };
      },
    }),
    AntrifraudModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}

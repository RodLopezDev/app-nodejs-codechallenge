import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => {
          Logger.log(`KAFKA_HOST: ${process.env.KAFKA_HOST}`);
          Logger.log(`KAFKA_PORT: ${process.env.KAFKA_PORT}`);
          return {
            kafka: {
              host: String(process.env.KAFKA_HOST) || '',
              port: Number(process.env.KAFKA_PORT) || 9092,
            },
          };
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

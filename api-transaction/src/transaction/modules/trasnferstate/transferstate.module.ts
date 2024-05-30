import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TransferStateService } from './transferstate.service';
import { State, StateSchema } from './entity/state.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: State.name, schema: StateSchema }]),
  ],
  controllers: [],
  providers: [TransferStateService],
  exports: [TransferStateService],
})
export class TransferStateModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StateService } from './state.service';
import { State, StateSchema } from './entity/state.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: State.name, schema: StateSchema }]),
  ],
  controllers: [],
  providers: [StateService],
  exports: [StateService],
})
export class StateModule {}

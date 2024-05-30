import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class State extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Transaction', required: true })
  transactionId: Types.ObjectId;

  @Prop()
  state: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const StateSchema = SchemaFactory.createForClass(State);

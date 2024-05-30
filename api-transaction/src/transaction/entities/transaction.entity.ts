import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Transaction extends Document {
  @Prop()
  accountExternalIdDebit: string;

  @Prop()
  accountExternalIdCredit: string;

  @Prop()
  tranferTypeId: number;

  @Prop()
  value: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

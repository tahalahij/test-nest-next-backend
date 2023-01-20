import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../user/user.schema';
import { TransactionTypeEnum } from './enums/transaction.type.enum';

export type TransactionDocument = Transaction & mongoose.Document;

@Schema()
export class Transaction {
  @Prop({ type: String, required: true, trim: true, enum: TransactionTypeEnum })
  type: TransactionTypeEnum;

  @Prop({ type: Number, required: true })
  amount: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ type: Date, required: true })
  createdAt: mongoose.Schema.Types.Date;

  @Prop({ type: Date, default: null })
  updatedAt: mongoose.Schema.Types.Date;

  @Prop({ type: Date, default: null })
  deletedAt: mongoose.Schema.Types.Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

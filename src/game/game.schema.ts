import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type GameDocument = Game & mongoose.Document;

@Schema()
export class Game {
  @Prop({ type: String, required: true })
  name: mongoose.Schema.Types.String;

  @Prop({ type: Date, required: true })
  createdAt: mongoose.Schema.Types.Date;

  @Prop({ type: Date, default: null })
  updatedAt: mongoose.Schema.Types.Date;

  @Prop({ type: Date, default: null })
  deletedAt: mongoose.Schema.Types.Date;
}

export const GameSchema = SchemaFactory.createForClass(Game);

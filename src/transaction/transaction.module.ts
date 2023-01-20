import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction } from './transaction.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Transaction.name, schema: Transaction }])],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}

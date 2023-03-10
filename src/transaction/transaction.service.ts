import { Injectable, Logger } from '@nestjs/common';
import { CreateTransactionDto } from './dtos/create.transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Transaction } from './transaction.schema';
import { TransactionTypeEnum } from './enums/transaction.type.enum';
import { PaginationQueryDto } from './dtos/pagination.dto';

@Injectable()
export class TransactionService {
  private logger = new Logger(TransactionService.name);
  constructor(@InjectModel(Transaction.name) private transactionModel: Model<Transaction>) {}

  async createTransaction(userId: string, body: CreateTransactionDto, type: TransactionTypeEnum): Promise<Transaction> {
    const transaction = await this.transactionModel.create({
      type,
      userId,
      amount: body.amount,
      createdAt: new Date(),
    });
    this.logger.log('Transaction created', { transaction });
    return transaction;
  }
  async getTransactions(userId: mongoose.Types.ObjectId, query: PaginationQueryDto): Promise<Transaction[]> {
    const limit = query.limit || 10;
    const page = query.page || 0;
    return this.transactionModel.find(
      {
        userId,
      },
      {},
      {
        skip: limit * page,
        limit,
      },
    );
  }

  async seed(): Promise<Transaction[]> {
    return this.transactionModel.insertMany([
      {
        userId: new mongoose.Types.ObjectId('63cd1f5e9c9abe5feca3fad6'),
        amount: 1000,
        type: TransactionTypeEnum.DEPOSIT,
        createdAt: new Date(),
      },
      {
        userId: new mongoose.Types.ObjectId('63cd1f5e9c9abe5feca3fad6'),
        amount: 1000,
        type: TransactionTypeEnum.WITHDRAWAL,
        createdAt: new Date(),
      },
      {
        userId: new mongoose.Types.ObjectId('63cd1f12cef39cbd9234a20c'),
        amount: 1000,
        type: TransactionTypeEnum.DEPOSIT,
        createdAt: new Date(),
      },
      {
        userId: new mongoose.Types.ObjectId('63cd1f12cef39cbd9234a20c'),
        amount: 1000,
        type: TransactionTypeEnum.WITHDRAWAL,
        createdAt: new Date(),
      },
    ]);
  }
}

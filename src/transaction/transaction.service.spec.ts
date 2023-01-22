import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { TransactionTypeEnum } from './enums/transaction.type.enum';
import { getModelToken } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './transaction.schema';
import mongoose, { Model } from 'mongoose';

const mockTransactionModel = () => ({});

describe('TransactionService', () => {
  let service: TransactionService;
  let transactionModel: Model<TransactionDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: getModelToken(Transaction.name),
          useFactory: mockTransactionModel,
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    transactionModel = module.get<Model<TransactionDocument>>(getModelToken(Transaction.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a transaction', async () => {
    const userId = String(new mongoose.Types.ObjectId());
    transactionModel['create'] = jest.fn().mockResolvedValue({
      amount: 2000,
      userId,
      type: TransactionTypeEnum.DEPOSIT,
      createdAt: new Date(),
    });

    const res = await service.createTransaction(
      userId,
      {
        amount: 2000,
      },
      TransactionTypeEnum.DEPOSIT,
    );
    expect(res).toHaveProperty('amount', 2000);
    expect(res).toHaveProperty('userId', userId);
    expect(res).toHaveProperty('type', TransactionTypeEnum.DEPOSIT);
    expect(res).toHaveProperty('createdAt');
  });

  it('should return array of 1 transaction', async () => {
    const userId = new mongoose.Types.ObjectId();
    // @ts-ignore
    transactionModel['find'] = jest.fn().mockResolvedValue([
      {
        amount: 2000,
        userId,
        type: TransactionTypeEnum.DEPOSIT,
        createdAt: new Date(),
      },
    ]);

    transactionModel['create'] = jest.fn().mockResolvedValue({
      amount: 2000,
      userId,
      type: TransactionTypeEnum.DEPOSIT,
      createdAt: new Date(),
    });

    await service.createTransaction(
      String(new mongoose.Types.ObjectId()),
      {
        amount: 2000,
      },
      TransactionTypeEnum.DEPOSIT,
    );
    await service.createTransaction(
      String(userId),
      {
        amount: 3000,
      },
      TransactionTypeEnum.WITHDRAWAL,
    );
    const transactions = await service.getTransactions(userId, {});
    expect(transactions).toHaveProperty('length', 1);
    expect(transactions[0]).toHaveProperty('amount', 2000);
    expect(transactions[0]).toHaveProperty('userId', userId);
    expect(transactions[0]).toHaveProperty('type', TransactionTypeEnum.DEPOSIT);
    expect(transactions[0]).toHaveProperty('createdAt');
  });
});

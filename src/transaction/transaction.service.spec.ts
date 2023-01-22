import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { TransactionTypeEnum } from './enums/transaction.type.enum';
import { getModelToken } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './transaction.schema';
import { Model } from 'mongoose';

describe('TransactionService', () => {
  let service: TransactionService;
  let settingsModel: Model<TransactionDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: getModelToken(Transaction.name),
          useFactory: Transaction,
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    settingsModel = module.get<Model<Transaction>>(getModelToken(Transaction.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a transaction', async () => {
    const res = await service.createTransaction(
      2,
      {
        amount: 2000,
      },
      TransactionTypeEnum.DEPOSIT,
    );
    expect(res).toHaveProperty('amount', 2000);
    expect(res).toHaveProperty('userId', 2);
    expect(res).toHaveProperty('type', TransactionTypeEnum.DEPOSIT);
    expect(res).toHaveProperty('createdAt');
  });

  it('should return array of 1 transaction', async () => {
    const deposit = await service.createTransaction(
      2,
      {
        amount: 2000,
      },
      TransactionTypeEnum.DEPOSIT,
    );
    const withdrawal = await service.createTransaction(
      4,
      {
        amount: 3000,
      },
      TransactionTypeEnum.WITHDRAWAL,
    );
    const withdrawal = await service.getTransactions(4,{})
    expect(withdrawal).toHaveProperty('length', 1);
    expect(res).toHaveProperty('amount', 2000);
    expect(res).toHaveProperty('userId', 2);
    expect(res).toHaveProperty('type', TransactionTypeEnum.DEPOSIT);
    expect(res).toHaveProperty('createdAt');
  });
});

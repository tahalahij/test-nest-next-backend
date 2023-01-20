import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateTransactionDto } from './dtos/create.transaction.dto';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserId } from '../auth/user.id.decorator';
import { Transaction } from './transaction.schema';
import { TransactionTypeEnum } from './enums/transaction.type.enum';

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/deposit')
  async deposit(@Body() body: CreateTransactionDto, @UserId() userId: number): Promise<Transaction> {
    return this.transactionService.createTransaction(userId, body, TransactionTypeEnum.DEPOSIT);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/withdrawal')
  async withdrawal(@Body() body: CreateTransactionDto, @UserId() userId: number): Promise<Transaction> {
    return this.transactionService.createTransaction(userId, body, TransactionTypeEnum.WITHDRAWAL);
  }
}

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CryptoService } from './crypto.service';

@Module({
  providers: [UserService, CryptoService],
  controllers: [UserController],
})
export class UserModule {}

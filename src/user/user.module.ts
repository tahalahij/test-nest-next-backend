import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CryptoService } from './crypto.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: User }])],
  providers: [UserService, CryptoService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}

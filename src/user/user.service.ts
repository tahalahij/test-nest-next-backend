import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserLoginDto } from './dtos/user.login.dto';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CryptoService } from './crypto.service';
import { CONSTANTS } from './constants/constants';

@Injectable()
export class UserService {
  constructor(private CryptoService: CryptoService, @InjectModel(User.name) private userModel: Model<User>) {}

  public async validateUser({ email, password }: UserLoginDto) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException(CONSTANTS.LOGIN_FAILED);
    }
    const valid = this.CryptoService.hashValidation(password, user.password);
    if (!valid) {
      throw new UnauthorizedException(CONSTANTS.LOGIN_FAILED);
    }
    return {
      id: user._id,
      name: user.name,
    };
  }
  async seed(): Promise<User[]> {
    return this.userModel.insertMany([
      {
        name: 'user 1',
        email: 'user1@gmail.com',
        password: await this.CryptoService.hashPassword('123'),
        createdAt: new Date(),
      },
      {
        name: 'user 2',
        email: 'user2@gmail.com',
        password: await this.CryptoService.hashPassword('123'),
        createdAt: new Date(),
      },
    ]);
  }
}

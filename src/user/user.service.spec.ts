import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import mongoose, { Model } from 'mongoose';
import { CryptoService } from './crypto.service';

describe('UserService', () => {
  let service: UserService;
  let cryptoService: CryptoService;
  let userModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useFactory: User,
        },
        CryptoService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    cryptoService = module.get<CryptoService>(CryptoService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should  validate User', async () => {
    const user = await userModel.create({
      _id: new mongoose.Types.ObjectId('63cd1f5e9c9abe5feca3fad6'),
      name: 'user 1',
      email: 'user1@gmail.com',
      password: await cryptoService.hashPassword('123'),
      createdAt: new Date(),
    });
    const { name, id } = await service.validateUser({ password: '123', email: 'user1@gmail.com' });
    expect(user).toHaveProperty('name', name);
    expect(user).toHaveProperty('_id', id);
  });
});

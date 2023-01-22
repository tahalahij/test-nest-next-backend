import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose from 'mongoose';
import { CryptoService } from './crypto.service';
import { ConfigModule } from '@nestjs/config';

const mockUserModel = () => ({});
describe('UserService', () => {
  let service: UserService;
  let cryptoService: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env'],
          expandVariables: true,
        }),
      ],
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useFactory: mockUserModel,
        },
        CryptoService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    cryptoService = module.get<CryptoService>(CryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should  validate User', async () => {
    mockUserModel['findOne'] = jest.fn().mockResolvedValue({
      _id: new mongoose.Types.ObjectId('63cd1f5e9c9abe5feca3fad6'),
      name: 'user 1',
      email: 'user1@gmail.com',
      password: await cryptoService.hashPassword('123'),
      createdAt: new Date(),
    });

    const { name, id } = await service.validateUser({ password: '123', email: 'user1@gmail.com' });
    expect(name).toBe('user 1');
    expect(id).toBe('63cd1f5e9c9abe5feca3fad6');
  });
});

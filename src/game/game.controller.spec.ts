import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { getModelToken } from '@nestjs/mongoose';
import { Game, GameDocument } from './Game.schema';
import { Model } from 'mongoose';

describe('GameService', () => {
  let service: GameService;
  let gameModel: Model<GameDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        {
          provide: getModelToken(Game.name),
          useFactory: Game,
        },
      ],
    }).compile();

    service = module.get<GameService>(GameService);
    gameModel = module.get<Model<Game>>(getModelToken(Game.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return array of 1 Game', async () => {
    const res = await gameModel.create({
      name: 'game 1',
      createdAt: new Date(),
    });

    const games = await service.getGames({});
    expect(games).toHaveProperty('length', 1);
    expect(games[0]).toHaveProperty('name', 'game 1');
  });
});

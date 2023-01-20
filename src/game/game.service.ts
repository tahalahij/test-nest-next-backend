import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../transaction/dtos/pagination.dto';
import { Game } from './game.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class GameService {
  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {}

  async getGames(query: PaginationQueryDto): Promise<Game[]> {
    const limit = query.limit || 10;
    const page = query.page || 0;
    return this.gameModel
      .find({})
      .skip(limit * page)
      .limit(limit);
  }
}

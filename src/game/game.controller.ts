import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PaginationQueryDto } from '../transaction/dtos/pagination.dto';
import { GameService } from './game.service';
import { Game } from './game.schema';

@Controller('games')
export class GameController {
  constructor(private gameService: GameService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getGames(@Query() queryDto: PaginationQueryDto): Promise<Game[]> {
    return this.gameService.getGames(queryDto);
  }

  @Post('/seed')
  async seed(): Promise<Game[]> {
    return this.gameService.seed();
  }
}

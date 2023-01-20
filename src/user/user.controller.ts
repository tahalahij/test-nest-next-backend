import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from './dtos/user.login.dto';
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}


}

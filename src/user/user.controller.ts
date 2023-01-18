import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from './dtos/user.login.dto';
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Returns Jwt token for accessing api, that should be sent with each request in authorization header',
    schema: {
      example: {
        accessToken: 'a jwt token',
      },
    },
  })
  @Post('/login')
  async handleLogin(
    @Res({ passthrough: true }) res: Response,
    @Body() body: UserLoginDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.login(body);
  }
}

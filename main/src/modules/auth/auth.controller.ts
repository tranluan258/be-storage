import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../database/schemas';
import { UserDecorator } from '../../shared/decorator';
import { LoginDto, LoginResponse } from './dtos';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @ApiOkResponse({
    type: LoginResponse,
  })
  @HttpCode(200)
  @Post('login')
  async login(
    @Body() _loginDto: LoginDto,
    @UserDecorator() user: User,
  ): Promise<LoginResponse> {
    return this.authService.login(user);
  }
}

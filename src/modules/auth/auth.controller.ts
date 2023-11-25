import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserCreateRequestDto } from '../user/dto/request/user.create.request.dto';
import { UserResponseDto } from '../user/dto/response/user.response.dto';
import { UserResponseMapper } from '../user/user.response.mapper';
import { AuthService } from './auth.service';
import { AuthLoginRequestDto } from './dto/request/auth.login.request.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() body: UserCreateRequestDto,
  ): Promise<UserResponseDto> {
    try {
      const registeredUser = await this.authService.register(body);

      return UserResponseMapper.toDetailsDto(registeredUser);
    } catch (e) {
      throw new HttpException(e.message, e.error);
    }
  }

  @Post('login')
  public async login(@Body() body: AuthLoginRequestDto): Promise<string> {
    try {
      const token = await this.authService.login(body);

      return token;
    } catch (e) {
      throw new HttpException(e.message, e.error);
    }
  }

  // @Post('logout')
  // public async logout(): Promise<void> {
  //   try {
  //   } catch (e) {
  //     throw new HttpException(e.message, e.error);
  //   }
  // }
}

import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserRequestDto } from '../user/dto/request/user.request.dto';
import { UserCreateResponse } from '../user/dto/user.dto';
import { UserResponseMapper } from '../user/user.response.mapper';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: UserRequestDto): Promise<UserCreateResponse> {
    try {
      const registeredUser = await this.authService.register(body);

      return UserResponseMapper.toDetailsDto(registeredUser);
    } catch (e) {
      throw new HttpException(e.message, e.error);
    }
  }
}

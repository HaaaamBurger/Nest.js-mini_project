import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserRequestDto } from '../user/dto/request/user.request.dto';
import { UserResponseDto } from '../user/dto/response/user.response.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: UserRequestDto,
    @Res() res: any,
  ): Promise<UserResponseDto> {
    try {
      const registeredUser = await this.authService.register(body);

      return res.status(HttpStatus.OK).json(registeredUser);
    } catch (e) {
      throw new HttpException(e.message, e.error);
    }
  }
}

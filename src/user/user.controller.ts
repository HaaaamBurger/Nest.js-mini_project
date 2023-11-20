import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserRequestDto } from './dto/request/user.request.dto';
import { UserResponseDto } from './dto/response/user.response.dto';
import { UserCreateResponse } from './dto/user.dto';
import { UserResponseMapper } from './user.response.mapper';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getAllUsers(): Promise<UserResponseDto[]> {
    try {
      return await this.userService.all_users();
    } catch (e) {
      throw new HttpException(e.message, e.error);
    }
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<UserCreateResponse> {
    try {
      const user = await this.userService.user_by_id(id);
      return UserResponseMapper.toDetailsDto(user);
    } catch (e) {
      throw new HttpException(e.message, e.error);
    }
  }

  @Put('update/:id')
  async updateUser(
    @Body() body: Partial<UserRequestDto>,
    @Param('id') id: string,
    @Res() res: any,
  ): Promise<void> {
    try {
      await this.userService.update_user(body, id);

      res.status(HttpStatus.CREATED).json('User updated');
    } catch (e) {
      throw new HttpException(e.message, e.error);
    }
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string, @Res() res: any): Promise<void> {
    try {
      await this.userService.delete_user(id);

      res.status(HttpStatus.OK).json('User deleted');
    } catch (e) {
      throw new HttpException(e.message, e.error);
    }
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserUpdateRequestDto } from './dto/request/user.update.request.dto';
import { UserListQueryRequestDto } from './dto/request/user-list.query.request.dto';
import { UserListResponseDto } from './dto/response/user.list.response.dto';
import { UserResponseDto } from './dto/response/user.response.dto';
import { UserResponseMapper } from './user.response.mapper';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getAllUsers(
    @Query() query: UserListQueryRequestDto,
  ): Promise<UserListResponseDto> {
    try {
      const result = await this.userService.all_users(query);
      return UserResponseMapper.toListDto(result, query);
    } catch (e) {
      throw new HttpException(e.message, e.error);
    }
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<UserResponseDto> {
    try {
      const user = await this.userService.user_by_id(id);
      return UserResponseMapper.toDetailsDto(user);
    } catch (e) {
      throw new HttpException(e.message, e.error);
    }
  }

  @Put('update/:id')
  async updateUser(
    @Body() body: UserUpdateRequestDto,
    @Param('id') id: string,
  ): Promise<UserResponseDto> {
    try {
      const updatedUser = await this.userService.update_user(body, id);

      return UserResponseMapper.toDetailsDto(updatedUser);
    } catch (e) {
      throw new HttpException(e.message, e.error);
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
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

import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('update/:id')
  async updateUser(
    @Body() body: any,
    @Param() { id }: { id: string },
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
  async deleteUser(
    @Param() { id }: { id: string },
    @Res() res: any,
  ): Promise<void> {
    try {
      await this.userService.delete_user(id);

      res.status(HttpStatus.OK).json('User deleted');
    } catch (e) {
      throw new HttpException(e.message, e.error);
    }
  }
}

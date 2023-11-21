import { PickType } from '@nestjs/swagger';

import { UserBaseRequestDto } from './user-base.request.dto';

export class UserUpdateRequestDto extends PickType(UserBaseRequestDto, [
  'username',
  'surname',
  'age',
  'phone_number',
  'email',
  'password',
]) {}

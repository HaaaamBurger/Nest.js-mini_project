import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

import { EAccountRoles } from '../../enums/account_enums/account_roles.enum';
import { EAccountStatus } from '../../enums/account_enums/account_status.enum';
import { EAccountTypes } from '../../enums/account_enums/account_types.enum';

export class UserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty()
  @IsNumber()
  age: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsEnum(EAccountTypes)
  account_type: string;

  @ApiProperty()
  @IsEnum(EAccountStatus)
  account_status: string;

  @ApiProperty()
  @IsEnum(EAccountRoles)
  account_role: string;
}

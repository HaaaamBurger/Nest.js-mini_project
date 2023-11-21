import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserBaseRequestDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsNumber()
  age: number;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @Transform(({ value }) => {
    value.trim().toLowerCase();
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

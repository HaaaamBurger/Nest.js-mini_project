import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserRequestDto {
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

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

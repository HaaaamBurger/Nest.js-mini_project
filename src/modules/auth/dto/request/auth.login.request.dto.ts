import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

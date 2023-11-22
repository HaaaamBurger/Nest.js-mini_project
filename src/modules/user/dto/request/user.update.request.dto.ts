import { Transform } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserUpdateRequestDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  surname?: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  phone_number?: string;

  @Transform(({ value }) => {
    value.trim().toLowerCase();
  })
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;
}

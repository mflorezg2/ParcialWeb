/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsEmail } from 'class-validator';
export class UsersDto {

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly phone?: string;

  @IsOptional()
  @IsBoolean()
  readonly is_active?: boolean;
}


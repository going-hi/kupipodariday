import { IsEmail, IsString, IsUrl } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  username: string;

  @IsString()
  about: string;

  @IsUrl()
  avatar: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

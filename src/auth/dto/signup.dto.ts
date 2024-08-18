import { IsOptional, IsString, IsUrl } from 'class-validator';

export class SignUpDto {
  @IsString()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsUrl()
  avatar?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

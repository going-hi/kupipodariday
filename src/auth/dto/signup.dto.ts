import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { SignInDto } from './signin.dto';

export class SignUpDto extends SignInDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsUrl()
  avatar?: string;

  @IsOptional()
  @Min(2)
  @Max(200)
  @IsString()
  about?: string;
}

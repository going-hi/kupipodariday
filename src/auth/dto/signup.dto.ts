import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { SignInDto } from './signin.dto';

// FIX - extends dto about SignInDto - reuse username and password fields with validation
export class SignUpDto extends SignInDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsUrl()
  avatar?: string;

  // FIX - rename field: description -> about
  // FIX - add validation
  @IsOptional()
  @Min(2)
  @Max(200)
  @IsString()
  about?: string;
}

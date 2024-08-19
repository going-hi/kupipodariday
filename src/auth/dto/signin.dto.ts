import { IsString, Max, Min } from 'class-validator';

export class SignInDto {
  // FIX - added validation
  @IsString()
  @Min(2)
  @Max(30)
  username: string;

  @IsString()
  password: string;
}

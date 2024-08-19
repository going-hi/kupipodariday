import {
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateWishDto {
  @MaxLength(250)
  // FIX - edit validation 2 -> 1.  название подарка. Не может быть длиннее 250 символов и короче одного.!
  @MinLength(1)
  @IsString()
  name: string;

  @IsUrl()
  link: string;

  @IsUrl()
  image: string;

  @IsNumber()
  price: number;

  @MaxLength(1024)
  @MinLength(1)
  @IsString()
  description: string;
}

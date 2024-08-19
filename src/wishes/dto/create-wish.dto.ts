import { IsInt, IsString, IsUrl } from 'class-validator';

export class CreateWishDto {
  @IsString()
  name: string;

  @IsUrl()
  link: string;

  @IsUrl()
  image: string;

  @IsInt()
  price: 1;

  @IsString()
  description: string;
}

import { IsInt, IsString, IsUrl } from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  name: string;

  @IsUrl()
  image: string;

  @IsInt({ each: true })
  itemId: string[];
}

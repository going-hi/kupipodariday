import {
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  @Min(1)
  @Max(250)
  name: string;

  @IsUrl()
  image: string;

  @IsInt({ each: true })
  itemsId: number[];

  @IsOptional()
  @MaxLength(1500)
  @IsString()
  description?: string;
}

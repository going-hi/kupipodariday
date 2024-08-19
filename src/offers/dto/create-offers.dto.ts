import { IsBoolean, IsInt } from 'class-validator';

export class CreateOffersDto {
  @IsInt()
  amount: number;

  @IsBoolean()
  hidden: false;

  @IsInt()
  itemId: number;
}

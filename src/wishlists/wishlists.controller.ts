import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/auth/decorators/user.decorator';
import { CreateWishlistDto } from './dto/create-wishlist.dto';

@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@User('id') id: number, @Body() dto: CreateWishlistDto) {
    return this.wishlistsService.create(id, dto);
  }

  @Get()
  getAll() {}

  @Get(':id')
  getOne() {}

  @Get(':id')
  delete() {}
}

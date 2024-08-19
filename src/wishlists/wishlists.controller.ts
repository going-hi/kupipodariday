import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
  getAll() {
    return this.wishlistsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.wishlistsService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number, @User('id') userId: number) {
    return this.wishlistsService.delete(id, userId);
  }
}

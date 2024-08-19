import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/auth/decorators/user.decorator';

@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@User('id') id: number, @Body() dto: CreateWishDto) {
    return this.wishesService.create(id, dto);
  }

  @Get()
  getAll() {}

  @Get(':id')
  getOne() {}

  @Get('top')
  getTop() {}

  @Get('last')
  getLast() {}

  @Delete(':id')
  delete() {}

  @Patch(':id')
  update() {}

  @Post(':id/copy')
  copy() {}
}

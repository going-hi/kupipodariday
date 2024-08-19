import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/auth/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';

@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  profile(@User('id') id: number) {
    return this.usersService.profile(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateProfile(@User('id') id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.updateProfile(id, dto);
  }

  @Get('me/wishes')
  getOwnWishes() {}

  @Get(':username/wishes')
  getAnotherUserWishes() {}

  @Get(':username')
  getAnotherUser(@Param('username') username: string) {
    return this.usersService.getAnotherUser(username);
  }

  @Post('find')
  findUser(@Body() { query }: FindUserDto) {
    return this.usersService.findUser(query);
  }
}

import { Module } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { WishlistsController } from './wishlists.controller';
import { WishlistsEntity } from './wishlists.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([WishlistsEntity])],
  controllers: [WishlistsController],
  providers: [WishlistsService],
})
export class WishlistsModule {}

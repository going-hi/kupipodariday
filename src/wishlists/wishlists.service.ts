import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WishlistsEntity } from './wishlists.entity';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(WishlistsEntity)
    private readonly wishlistsRepository: Repository<WishlistsEntity>,
  ) {}

  async create(userId: number, dto: CreateWishlistDto) {
    // * Checking
    const wishlist = this.wishlistsRepository.create({
      ...dto,
      user: { id: userId },
    });
    return this.wishlistsRepository.save(wishlist);
  }
}

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const items = dto.itemsId.map((item) => ({
      id: item,
    }));
    const wishlist = this.wishlistsRepository.create({
      ...dto,
      owner: { id: userId },
      items,
    });
    return this.wishlistsRepository.save(wishlist);
  }

  async getOne(id: number) {
    const wishlist = await this.wishlistsRepository.findOne({
      where: { id },
      relations: { owner: true, items: { owner: true } },
    });
    if (!wishlist) throw new NotFoundException();
    return wishlist;
  }

  async getAll() {
    return this.wishlistsRepository.find({ relations: { owner: true } });
  }

  async delete(id: number, userId: number) {
    const wishlist = await this.getOne(id);
    if (wishlist.owner.id !== userId) throw new ForbiddenException();
    await this.wishlistsRepository.delete({ id });
    return { id };
  }
}

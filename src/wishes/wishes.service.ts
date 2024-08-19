import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WishesEntity } from './wishes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(WishesEntity)
    private readonly wishesRepository: Repository<WishesEntity>,
  ) {}

  async create(userId: number, dto: CreateWishDto) {
    const wishes = this.wishesRepository.create({
      ...dto,
      owner: { id: userId },
    });
    await this.wishesRepository.save(wishes);
  }
}

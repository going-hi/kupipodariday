import { Injectable } from '@nestjs/common';
import { CreateOffersDto } from './dto/create-offers.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OffersEntity } from './offers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(OffersEntity)
    private readonly offersRepository: Repository<OffersEntity>,
  ) {}

  async create(userId: number, dto: CreateOffersDto) {
    const offer = this.offersRepository.create({
      ...dto,
      item: { id: dto.itemId },
      user: { id: userId },
    });
    return this.offersRepository.save(offer);
  }
}

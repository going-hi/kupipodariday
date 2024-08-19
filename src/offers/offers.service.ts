import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOffersDto } from './dto/create-offers.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OffersEntity } from './entities/offers.entity';
import { Repository } from 'typeorm';
import { WishesService } from 'src/wishes/wishes.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(OffersEntity)
    private readonly offersRepository: Repository<OffersEntity>,
    private readonly wishesService: WishesService,
  ) {}

  // FIX - add check for donate for yourself wish - Пользователю нельзя вносить деньги на собственные подарки
  // FIX - add check for ended wishes - Кроме того, нельзя скинуться на подарки, на которые уже собраны деньги. Сумма собранных средств не может превышать стоимость подарка. При попытке оставить заявку на большую сумму сервис должен присылать ошибку с соответствующим текстом в теле.
  async create(userId: number, dto: CreateOffersDto) {
    await this.wishesService.addRaised(dto.itemId, dto.amount, userId);

    const offer = this.offersRepository.create({
      ...dto,
      item: { id: dto.itemId },
      user: { id: userId },
    });
    return await this.offersRepository.save(offer);
  }

  async getOne(id: number) {
    const offers = await this.offersRepository.findOne({
      where: { id },
      relations: { user: true, item: { owner: true } },
      select: {
        user: {
          id: true,
          username: true,
        },
      },
    });
    if (!offers) throw new NotFoundException();
    return offers;
  }

  async getAll() {
    return this.offersRepository.find({
      relations: { user: true, item: { owner: true } },
      select: {
        user: { id: true, username: true },
        item: { owner: { id: true, username: true } },
      },
    });
  }
}

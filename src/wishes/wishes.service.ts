import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WishesEntity } from './wishes.entity';
import { Repository } from 'typeorm';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(WishesEntity)
    private readonly wishesRepository: Repository<WishesEntity>,
  ) {}

  async getAllByUserId(userId: number) {
    return this.wishesRepository.find({
      where: { owner: { id: userId }, offers: { user: true } },
      select: { offers: { user: { id: true, username: true } } },
    });
  }

  async create(userId: number, dto: CreateWishDto) {
    const wishes = this.wishesRepository.create({
      ...dto,
      price: +dto.price.toFixed(2),
      copied: 0,
      raised: 0,
      owner: { id: userId },
    });
    return await this.wishesRepository.save(wishes);
  }

  async getOne(id: number) {
    const wish = await this.wishesRepository.findOne({
      where: { id },
      relations: { owner: true, offers: { user: true } },
    });
    return wish;
  }

  async delete(id: number, userId: number) {
    const wish = await this.getOne(id);
    if (!wish) throw new NotFoundException();
    if (wish.owner.id !== userId) throw new ForbiddenException();
    await this.wishesRepository.delete({ id });
    return { id };
  }

  async update(id: number, dto: UpdateWishDto, userId: number) {
    // FIX - add check for exists offers before update price
    const wish = await this.getOne(id);
    if (!wish) throw new NotFoundException();
    if (wish.owner.id !== userId) throw new ForbiddenException();
    if (dto.price) dto.price = +dto.price.toFixed(2);
    await this.wishesRepository.save({ ...wish, ...dto });
  }

  async getTop() {
    return this.wishesRepository.find({
      take: 20,
      order: { copied: 'DESC' },
      relations: { owner: true },
      select: {
        owner: { id: true, username: true, avatar: true },
      },
    });
  }

  async getLast() {
    return this.wishesRepository.find({
      take: 40,
      order: {
        createdAt: 'DESC',
      },
      relations: { owner: true },
      select: {
        owner: { id: true, username: true, avatar: true },
      },
    });
  }

  async copy(id: number, userId: number) {
    const wish = await this.getOne(id);
    if (!wish) throw new NotFoundException();
    wish.copied++;

    await this.wishesRepository.save(wish);
    return await this.create(userId, {
      description: wish.description,
      image: wish.image,
      link: wish.image,
      name: wish.name,
      price: wish.price,
    });
  }

  async addRaised(id: number, amount: number) {
    const wish = await this.getOne(id);
    if (!wish) throw new NotFoundException('Товар с таким id не найден');
    wish.raised += amount;
    return this.wishesRepository.save(wish);
  }
}

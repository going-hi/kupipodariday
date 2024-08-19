import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { ILike, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { genSalt, hash } from 'bcrypt';
import { SignUpDto } from 'src/auth/dto/signup.dto';
import { WishesService } from 'src/wishes/wishes.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly wishesService: WishesService,
  ) {}

  async findOneByUsername(username: string) {
    const user = await this.usersRepository.findOne({ where: { username } });
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  async create(dto: SignUpDto) {
    const user = this.usersRepository.create(dto);
    return this.usersRepository.save(user);
  }

  async getAnotherUser(username: string) {
    const user = await this.usersRepository.findOne({
      where: { username },
      select: {
        id: true,
        username: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  }

  async profile(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: {
        id: true,
        username: true,
        about: true,
        avatar: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  }

  async updateProfile(id: number, dto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new BadRequestException('Вас нет в системе');

    if (user.email !== dto.email) {
      const candidate = await this.findOneByEmail(dto.email);
      if (candidate) {
        throw new BadRequestException(
          'Пользователь с такой почтой уже существует',
        );
      }
    }

    const salt = await genSalt(8);
    const hashPassword = await hash(dto.password, salt);

    const { username, about, avatar, email, createdAt, updatedAt } =
      await this.usersRepository.save({
        ...user,
        ...dto,
        password: hashPassword,
      });

    return {
      id,
      username,
      about,
      avatar,
      email,
      createdAt,
      updatedAt,
    };
  }

  async findUser(query: string) {
    const users = await this.usersRepository.find({
      where: [
        { username: ILike(`%${query}%`) },
        { email: ILike(`%${query}%`) },
      ],
      select: {
        id: true,
        username: true,
        about: true,
        avatar: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return users;
  }

  getWishesById(userId: number) {
    return this.wishesService.getAllByUserId(userId);
  }

  async getWishesByNickname(username: string) {
    const user = await this.findOneByUsername(username);
    if (!user) return;
    return this.wishesService.getAllByUserId(user.id);
  }
}

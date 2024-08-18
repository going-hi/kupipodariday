import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async findOneByUsername(username: string) {
    const user = await this.usersRepository.findOne({ where: { username } });
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  async create(dto) {
    const user = this.usersRepository.create(dto);
    return this.usersRepository.save(user);
  }
}

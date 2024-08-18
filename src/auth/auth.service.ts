import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { compare, genSalt, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from 'src/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(user: UsersEntity) {
    const payload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(dto: SignUpDto) {
    const user = await this.usersService.findOneByEmail(dto.email);
    if (user) {
      throw new BadRequestException(
        'Пользователь с таким email уже существует',
      );
    }
    const salt = await genSalt(8);
    const hashPassword = await hash(dto.password, salt);
    await this.usersService.create({ ...dto, password: hashPassword });
    const payload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    const isMatch = await compare(pass, user.password);
    if (user && isMatch) {
      delete user.password;
      return user;
    }
    return null;
  }
}

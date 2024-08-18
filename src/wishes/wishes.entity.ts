import { UsersEntity } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('wishes')
export class WishesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  name: string;

  @Column()
  link: string;

  //   *  ссылка на изображение подарка, строка. Должна быть валидным URL.
  @Column()
  image: string;

  @Column()
  price: number;

  @Column()
  raised: number;

  @ManyToOne(() => UsersEntity, (user) => user.wishes)
  owner: UsersEntity;

  @Column()
  description: string;

  @Column({ default: 0 })
  copied: number;

  offers;
}

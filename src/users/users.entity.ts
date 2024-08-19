import { OffersEntity } from 'src/offers/offers.entity';
import { WishesEntity } from 'src/wishes/wishes.entity';
import { WishlistsEntity } from 'src/wishlists/wishlists.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  username: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  avatar: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => WishesEntity, (wishes) => wishes.owner)
  wishes: WishesEntity[];

  @OneToMany(() => OffersEntity, (offers) => offers.user)
  offers: OffersEntity[];

  @OneToMany(() => WishlistsEntity, (wishlists) => wishlists.user)
  wishlists: WishlistsEntity[];
}

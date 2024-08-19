import { OffersEntity } from 'src/offers/offers.entity';
import { UsersEntity } from 'src/users/users.entity';
import { WishlistsEntity } from 'src/wishlists/wishlists.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
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

  @Column()
  image: string;

  @Column({ type: 'float4' })
  price: number;

  @Column({ type: 'float4' })
  raised: number;

  @Column()
  description: string;

  @Column({ default: 0 })
  copied: number;

  @ManyToOne(() => UsersEntity, (user) => user.wishes)
  owner: UsersEntity;

  @OneToMany(() => OffersEntity, (offers) => offers.item)
  offers: OffersEntity[];

  @ManyToOne(() => WishlistsEntity, (wishlists) => wishlists.items)
  wishlist: WishlistsEntity;
}

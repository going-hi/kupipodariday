import { UsersEntity } from 'src/users/users.entity';
import { WishesEntity } from 'src/wishes/wishes.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('wishlists')
export class WishlistsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @OneToMany(() => WishesEntity, (wishes) => wishes.wishlist)
  items: WishesEntity[];

  @ManyToOne(() => UsersEntity, (users) => users.wishlists)
  user: UsersEntity;
}

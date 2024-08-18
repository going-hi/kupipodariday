import { UsersEntity } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('offers')
export class OffersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  user: UsersEntity;

  item;

  @Column()
  amount: number;

  @Column({ default: false })
  hidden: boolean;
}

import { Module } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { WishesController } from './wishes.controller';
import { WishesEntity } from './wishes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([WishesEntity])],
  controllers: [WishesController],
  providers: [WishesService],
})
export class WishesModule {}

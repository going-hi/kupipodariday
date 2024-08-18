import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersEntity } from './offers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OffersEntity])],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}

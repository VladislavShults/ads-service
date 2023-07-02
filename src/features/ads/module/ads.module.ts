import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdEntity } from '../entities/ads.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdEntity])],
  exports: [TypeOrmModule],
})
export class AdsModule {}

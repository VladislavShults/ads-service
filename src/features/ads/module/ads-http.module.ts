import { Module } from '@nestjs/common';
import { AdsModule } from './ads.module';

@Module({
  imports: [AdsModule],
  providers: [],
  controllers: [],
})
export class AdsHttpModule {}

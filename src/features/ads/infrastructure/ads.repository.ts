import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdEntity } from '../entities/ads.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdsRepository {
  constructor(
    @InjectRepository(AdEntity) private adsRepo: Repository<AdEntity>,
  ) {}

  async createAd(newAd: AdEntity): Promise<{ adId: string }> {
    const ad = await this.adsRepo.save(newAd);

    return { adId: ad.id };
  }
}

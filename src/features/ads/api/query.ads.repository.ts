import { AdEntity } from '../entities/ads.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { QueryAdsDTO } from '../dto/query-ads-dto';
import { AdsWithPaginationType } from '../types/ads.types';

@Injectable()
export class QueryAdsRepository {
  constructor(
    @InjectRepository(AdEntity) private adsRepo: Repository<AdEntity>,
  ) {}

  async getAdById(id: string) {
    try {
      return this.adsRepo.findOne({ where: { id } });
    } catch (err) {
      return null;
    }
  }

  async getAds(query: QueryAdsDTO): Promise<AdsWithPaginationType> {
    const { sortBy, sortDirection, pageSize, pageNumber } = query;

    const adsDb = await this.adsRepo
      .createQueryBuilder('a')
      .orderBy('a."' + sortBy + '"', sortDirection)
      .limit(pageSize)
      .offset((pageNumber - 1) * pageSize)
      .getManyAndCount();

    const totalCount = adsDb[1];

    const items = adsDb[0];

    return {
      pagesCount: Math.ceil(totalCount / pageSize),
      page: pageNumber,
      pageSize: pageSize,
      totalCount: Number(totalCount),
      items,
    };
  }
}

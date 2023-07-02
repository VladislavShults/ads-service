import { AdEntity } from '../entities/ads.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { QueryAdsDTO } from '../dto/query-ads-dto';
import { AdsViewModel, AdsWithPaginationType } from '../types/ads.types';
import {
  mapDbAdsToVievModel,
  mapDbOneAdsToVievModel,
} from '../helpers/mapDbAdsToVievModel';

@Injectable()
export class QueryAdsRepository {
  constructor(
    @InjectRepository(AdEntity) private adsRepo: Repository<AdEntity>,
  ) {}

  async getAdById(id: string, fields: string[]): Promise<AdsViewModel> {
    try {
      const select = ['ad.title', 'ad.mainPhoto', 'ad.price'];

      if (fields && fields.includes('description')) {
        select.push('ad.description');
      }
      if (fields && fields.includes('photos')) {
        select.push('ad.photos');
      }

      const queryBuilder = this.adsRepo
        .createQueryBuilder('ad')
        .select(select)
        .where('ad.id = :id', { id });

      const ad = await queryBuilder.getOne();

      return mapDbOneAdsToVievModel(ad);
    } catch (err) {
      return null;
    }
  }

  async getAds(query: QueryAdsDTO): Promise<AdsWithPaginationType> {
    const { sortBy, sortDirection, pageSize, pageNumber } = query;

    const adsDb = await this.adsRepo
      .createQueryBuilder('a')
      .orderBy(`a.${sortBy}`, sortDirection)
      .limit(pageSize)
      .offset((pageNumber - 1) * pageSize)
      .getManyAndCount();

    const totalCount = adsDb[1];
    const items = adsDb[0].map((a) => mapDbAdsToVievModel(a));

    return {
      pagesCount: Math.ceil(totalCount / pageSize),
      page: pageNumber,
      pageSize: pageSize,
      totalCount: Number(totalCount),
      items,
    };
  }
}

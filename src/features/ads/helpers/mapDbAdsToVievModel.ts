import { AdEntity } from '../entities/ads.entity';
import { AdsViewModel } from '../types/ads.types';

export const mapDbAdsToVievModel = (ads: AdEntity): AdsViewModel => ({
  title: ads.title,
  mainPhoto: ads.mainPhoto,
  price: ads.price.toString(),
});

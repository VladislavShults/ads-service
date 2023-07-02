import { AdEntity } from '../entities/ads.entity';
import { AdsViewModel } from '../types/ads.types';

export const mapDbOneAdsToVievModel = (ads: AdEntity) => {
  let ad = {
    title: ads.title,
    mainPhoto: ads.mainPhoto,
    price: ads.price.toString(),
  };

  if (ads.description) ad = Object.assign(ad, { description: ads.description });
  if (ads.photos) ad = Object.assign(ad, { photos: ads.photos });

  return ad;
};

export const mapDbAdsToVievModel = (ads: AdEntity): AdsViewModel => ({
  title: ads.title,
  mainPhoto: ads.mainPhoto,
  price: ads.price.toString(),
});

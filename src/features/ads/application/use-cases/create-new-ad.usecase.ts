import { randomUUID } from 'crypto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAdDto } from '../../dto/create-ad.dto';
import { AdEntity } from '../../entities/ads.entity';
import { AdsRepository } from '../../infrastructure/ads.repository';

export class CreateNewAdCommand {
  constructor(public body: CreateAdDto) {}
}

@CommandHandler(CreateNewAdCommand)
export class CreateNewAdUseCase implements ICommandHandler<CreateNewAdCommand> {
  constructor(private adsRepo: AdsRepository) {}
  async execute(command: CreateNewAdCommand): Promise<{ adId: string }> {
    const adId = randomUUID();
    const createdAt = new Date();
    const mainPhoto = command.body.photos[0];
    const photos = command.body.photos.slice(1);

    const newAd = new AdEntity(
      adId,
      command.body.title,
      command.body.description,
      photos,
      mainPhoto,
      command.body.price,
      createdAt,
    );

    return this.adsRepo.createAd(newAd);
  }
}

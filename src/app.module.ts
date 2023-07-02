import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdEntity } from './features/ads/entities/ads.entity';
import { settings } from '../settings';
import { AdController } from './features/ads/api/ads.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryAdsRepository } from './features/ads/api/query.ads.repository';
import { AdsRepository } from './features/ads/infrastructure/ads.repository';
import { CreateNewAdUseCase } from './features/ads/application/use-cases/create-new-ad.usecase';
import { AdsModule } from './features/ads/module/ads.module';
import { AdsHttpModule } from './features/ads/module/ads-http.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: settings.host,
      port: settings.port,
      username: settings.username,
      password: settings.passwordDb,
      database: settings.database,
      entities: [AdEntity],
      synchronize: true,
    }),
    CqrsModule,
    AdsModule,
    AdsHttpModule,
  ],
  controllers: [AppController, AdController],
  providers: [
    AppService,
    QueryAdsRepository,
    AdsRepository,
    CreateNewAdUseCase,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdEntity } from './features/ads/entities/ads.entity';
import { settings } from '../settings';

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
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

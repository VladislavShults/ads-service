import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdEntity } from '../entities/ads.entity';
import { CreateAdDto } from '../dto/create-ad.dto';
import { QueryAdsRepository } from './query.ads.repository';
import { CommandBus } from '@nestjs/cqrs';
import { CreateNewAdCommand } from '../application/use-cases/create-new-ad.usecase';
import { QueryAdsDTO } from '../dto/query-ads-dto';
import { AdsWithPaginationType } from '../types/ads.types';

@ApiTags('ads')
@Controller('ads')
export class AdController {
  constructor(
    private queryAdsRepo: QueryAdsRepository,
    private commandBus: CommandBus,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get list of ads',
  })
  getAds(@Query() query: QueryAdsDTO): Promise<AdsWithPaginationType> {
    return this.queryAdsRepo.getAds(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'Get an ad by ID' })
  @ApiResponse({ status: 404, description: 'Ad not found' })
  async getAdById(@Param('id') id: string): Promise<AdEntity> {
    const ad = await this.queryAdsRepo.getAdById(id);

    if (!ad) throw new NotFoundException('Ad not found');

    return ad;
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Create a new ad' })
  createAd(@Body() createAdDto: CreateAdDto): Promise<{ adId: string }> {
    return this.commandBus.execute(new CreateNewAdCommand(createAdDto));
  }
}

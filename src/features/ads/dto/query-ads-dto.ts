import { toNumber } from '../helpers/to-number.helper';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryAdsDTO {
  @IsNotEmpty()
  @IsString()
  sortBy = 'price';

  @IsIn(['ASC', 'DESC'])
  @Transform((sortDir) => sortDir.value.toUpperCase())
  sortDirection: 'ASC' | 'DESC' = 'DESC';

  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  @IsOptional()
  public pageNumber = 1;

  @Transform(({ value }) => toNumber(value, { default: 10, min: 1 }))
  @IsNumber()
  @IsOptional()
  public pageSize = 10;
}

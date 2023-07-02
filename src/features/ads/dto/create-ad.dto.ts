import {
  ArrayMaxSize,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Length,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  @ApiProperty({
    type: 'string',
    minimum: 0,
    maximum: 200,
  })
  title: string;

  @IsString()
  @Length(0, 1000)
  @ApiProperty({
    type: 'string',
    minimum: 0,
    maximum: 1000,
  })
  description: string;

  @IsUrl(undefined, { each: true })
  @ArrayMaxSize(3)
  @ApiProperty({
    example: [
      'https://example.com/photo1.jpg',
      'https://example.com/photo2.jpg',
      'https://example.com/photo3.jpg',
    ],
    description: 'Массив URL-адресов фотографий (максимум 3)',
    type: [String],
  })
  photos: string[];

  @IsNumber()
  @Min(0)
  @ApiProperty({
    type: 'number',
    minimum: 0,
  })
  price: number;
}

import {
  IsNotEmpty,
  IsNumberString,
  IsPositive,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateAdDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  title: string;

  @IsString()
  @Length(0, 1000)
  description: string;

  @IsUrl(undefined, { each: true })
  @Length(0, 2)
  photos: string[];

  @IsNotEmpty()
  @IsUrl()
  mainPhoto: string;

  @IsNumberString()
  @IsPositive()
  price: number;
}

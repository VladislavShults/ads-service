import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';

@Entity()
export class AdEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  title: string;

  @Column({ length: 1000, nullable: true })
  @IsString()
  @Length(0, 1000)
  description?: string;

  @Column('simple-array', { nullable: true })
  @IsUrl(undefined, { each: true })
  @Length(0, 2)
  photos?: string[];

  @Column()
  @IsNotEmpty()
  @IsUrl()
  mainPhoto: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @IsNotEmpty()
  price: number;

  @Column()
  createdAt: Date;

  constructor(
    id: string,
    title: string,
    description: string,
    photos: string[],
    mainPhoto: string,
    price: number,
    createdAt: Date,
  ) {
    (this.id = id),
      (this.title = title),
      (this.description = description),
      (this.photos = photos),
      (this.mainPhoto = mainPhoto),
      (this.price = price),
      (this.createdAt = createdAt);
  }
}

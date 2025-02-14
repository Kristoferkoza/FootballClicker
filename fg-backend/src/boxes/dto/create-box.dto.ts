import { IsString, IsNumber, IsPositive, Min, Max } from 'class-validator';

export class CreateBoxDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  cost: number;

  @IsNumber()
  common_probability: number;

  @IsNumber()
  rare_probability: number;

  @IsNumber()
  epic_probability: number;

  @IsNumber()
  legendary_probability: number;

  @IsString()
  image_url: string;
}

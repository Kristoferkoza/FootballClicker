import { IsNumber, IsString, IsArray } from 'class-validator';

export class CreateMicropaymentDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  reward: string;

  @IsString()
  imageUrl: string;
}

import { IsInt, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateUserKitElementConfigDto {
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsUUID()
  tshirtId?: string;

  @IsOptional()
  @IsUUID()
  shortId?: string;

  @IsOptional()
  @IsUUID()
  sockId?: string;

  @IsOptional()
  @IsUUID()
  bootId?: string;

  @IsInt()
  @Min(0)
  bonuses: number;
}

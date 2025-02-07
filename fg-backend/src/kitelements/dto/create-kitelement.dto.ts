import { IsEnum, IsNumber, IsString } from "class-validator";
import { KitPart } from "../enums/kit-part.enum";
import { KitType } from "../enums/kit-type.enum";

export class CreateKitElementDto {
  @IsString()
  readonly name: string;

  @IsEnum(KitPart)
  readonly kit_part: KitPart;

  @IsEnum(KitType)
  readonly kit_type: KitType;

  @IsNumber()
  readonly points_given: number;

  @IsNumber()
  readonly cost: number;

  @IsString()
  readonly image_url: string;
}

import { IsEnum, IsNumber, IsString } from "class-validator";
import { CardType } from "../enums/card-type.enum";

export class CreateCardDto {
    @IsString()
    readonly name: string;

    @IsNumber()
    readonly overall: number;

    @IsString()
    readonly position: string;

    @IsString()
    readonly nationality: string;

    @IsString()
    readonly club: string;

    @IsEnum(CardType)
    readonly cardType: CardType;
}

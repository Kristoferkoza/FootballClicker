import { IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    readonly name: string;
    
    @IsString()
    readonly surname: string;

    @IsNumber()
    readonly points: number;
}

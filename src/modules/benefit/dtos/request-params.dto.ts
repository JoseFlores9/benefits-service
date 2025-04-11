import { Transform } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsObject, IsString } from "class-validator";

export class RequestParamsDto {
    @Transform(({ value }) => typeof value === 'string' ? value.split(',') : value)
    @IsArray()
    benefitType?: string[] = []

}
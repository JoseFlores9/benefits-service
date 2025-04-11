import { IsNotEmpty, IsObject, IsString } from "class-validator";

export class CreateCollaboratorDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    identifier: string

    @IsObject()
    @IsNotEmpty()
    companies: Record<string, string[]>
}
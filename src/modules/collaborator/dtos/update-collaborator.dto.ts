import { IsNotEmpty, IsObject, IsString } from "class-validator";

export class UpdateCollaboratorDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsObject()
    @IsNotEmpty()
    companies: Record<string, string[]>
}
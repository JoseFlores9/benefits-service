import { Body, Controller, Delete, Get, Param, ParseBoolPipe, Patch, Post, Put, Query } from "@nestjs/common";
import { CollaboratorService } from "./collaborator.service";
import { CreateCollaboratorDto } from "./dtos/create-collaborator.dto";
import { CollaboratorDocument } from "./shemas/collaborator.schema";
import { UpdateCollaboratorDto } from "./dtos/update-collaborator.dto";
import { PartialUpdateCollaboratorDto } from "./dtos/partial-update-collaborator.dto";

@Controller('collaborator')
export class CollaboratorController {
    constructor(private readonly collaboratorService: CollaboratorService) { }

    @Post('')
    async createCollaborator(@Body() data: CreateCollaboratorDto):Promise <any> {
        return await this.collaboratorService.createOrRestoreCollaborator(data)
    }

    @Delete('/:id')
    async deleteCollaborator(@Param('id') id: string): Promise <any> {
        return await this.collaboratorService.deleteCollaborator(id)
    }

    @Get()
    async findAll(
        @Query('withDeleted', ParseBoolPipe) withDeleted = false,
    ): Promise<CollaboratorDocument[]> {
        return this.collaboratorService.getAllCollaborators(withDeleted)
    }

    @Get('identifier/:identifier')
    async findByIdentifier(@Param('identifier') identifier: string): Promise <CollaboratorDocument> {
        return this.collaboratorService.getCollaboratorByIdentifier(identifier)
    }
    
    @Put('/:id')
    async update(@Param('id') id: string, @Body() data: UpdateCollaboratorDto): Promise <CollaboratorDocument> {
        return this.collaboratorService.updateCollaborator(id, data)
    }

    @Patch('/:id')
    async partialUpdate(@Param('id') id: string, @Body() data: PartialUpdateCollaboratorDto): Promise <CollaboratorDocument> {
        return this.collaboratorService.partialUpdateCollaborator(id, data) 
    }
}
import { Controller, Get, Param, Query } from "@nestjs/common";
import { BenefitService } from "./benefit.service";
import { RequestParamsDto } from "./dtos/request-params.dto";


@Controller('benefits')
export class BenefitController {
    constructor(private readonly collaboratorService: BenefitService) { }

    @Get('collaborator/:identifier')
    async getCollaboratorBenefits(
        @Param('identifier') identifier: string,
        @Query() query: RequestParamsDto
    ):Promise <any> {
        return this.collaboratorService.getBenefit(identifier, query)
    }
}
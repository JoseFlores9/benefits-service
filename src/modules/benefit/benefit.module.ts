import { Module } from "@nestjs/common";
import { BenefitController } from "./benefit.controller";
import { BenefitService } from "./benefit.service";
import { CollaboratorModule } from "../collaborator/collaborator.module";


@Module({
    imports: [CollaboratorModule],
    providers: [BenefitService],
    controllers: [BenefitController]
})
export class BenefitModule {}
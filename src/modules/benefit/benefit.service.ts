import { Injectable, NotFoundException } from '@nestjs/common'
import { CollaboratorService } from '../collaborator/collaborator.service'
import { RequestParamsDto } from './dtos/request-params.dto'
import { getBenefitsBank, getBenefitsTelco, getSocialBenefits } from 'src/mockapis/mockApis'

@Injectable()
export class BenefitService {
  private benefitSourcesMap = {
    bank: getBenefitsBank,
    telco: getSocialBenefits,
    socialBenefits: getBenefitsTelco
  }

  constructor(
    private readonly collaboratorService: CollaboratorService
  ) {}

  async getBenefit(identifier: string, params: RequestParamsDto) {
    const collaborator = await this.collaboratorService.getCollaboratorByIdentifier(identifier)
    if (!collaborator) {
      throw new NotFoundException(`Collaborator with identifier ${identifier} not found.`)
    }

    const collaboratorBenefitTypes = Object.keys(collaborator.companies)
    const requestedSources = params.benefitType?.filter((benefitType) => collaboratorBenefitTypes.includes(benefitType))
    const benefitsPromises = requestedSources?.filter(source => this.benefitSourcesMap[source])
      .map(source => this.benefitSourcesMap[source].call(this, collaborator.companies[source]))

    const benefitsResults = await Promise.all(benefitsPromises ?? [])

    const allBenefits = benefitsResults.flat()
    return allBenefits
  }

}

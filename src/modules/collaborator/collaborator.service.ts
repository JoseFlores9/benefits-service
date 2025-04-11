import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateCollaboratorDto } from './dtos/create-collaborator.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Collaborator, CollaboratorDocument } from './shemas/collaborator.schema'
import { SoftDeleteModel } from 'mongoose-delete'
import { UpdateCollaboratorDto } from './dtos/update-collaborator.dto'
import { PartialUpdateCollaboratorDto } from './dtos/partial-update-collaborator.dto'

@Injectable()
export class CollaboratorService {
  constructor(@InjectModel(Collaborator.name) private readonly CollaboratorModel: SoftDeleteModel<CollaboratorDocument>) {}

  async createOrRestoreCollaborator(data: CreateCollaboratorDto): Promise<CollaboratorDocument> {
    const { identifier, name, companies } = data

    try {
      const existing = await this.CollaboratorModel.findOneWithDeleted({ identifier }).exec()

      if (existing) {
        if (existing.deleted) {
          await this.CollaboratorModel.restore({ _id: existing._id })
          const updated = await this.CollaboratorModel.findOneAndUpdate(
            { _id: existing._id },
            { name, companies },
            { new: true }
          ).exec()
          if (!updated) {
            throw new InternalServerErrorException('Unexpected error: failed to update collaborator after restore.')
          }
          return updated
        } else {
          throw new BadRequestException(`Collaborator with identifier ${identifier} already exists.`)
        }
      }

      const created = new this.CollaboratorModel({ name, identifier, companies })
      return await created.save()
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message)
    }
  }

  async deleteCollaborator(id: string) {
    try {
      const response = await this.CollaboratorModel.delete({ _id: id })
      return response
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async updateCollaborator(id: string, data: UpdateCollaboratorDto): Promise<CollaboratorDocument> {
    try {
      const existing = await this.CollaboratorModel.findOneWithDeleted({ _id: id }).exec()

      if (!existing) {
        throw new NotFoundException(`Collaborator with ID ${id} not found.`)
      }

      if (existing.deleted) {
        throw new BadRequestException(`Cannot update a deleted collaborator.`)
      }

      const updated = await this.CollaboratorModel.findOneAndUpdate(
        { _id: id },
        data,
        { new: true }
      ).exec()

      if (!updated) {
        throw new InternalServerErrorException(`Unexpected error: failed to update collaborator.`)
      }

      return updated
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message)
    }
  }

  async partialUpdateCollaborator(
    id: string,
    data: PartialUpdateCollaboratorDto
  ): Promise<CollaboratorDocument> {
    try {
      const existing = await this.CollaboratorModel.findOneWithDeleted({ _id: id }).exec()

      if (!existing) {
        throw new NotFoundException(`Collaborator with ID ${id} not found.`)
      }

      if (existing.deleted) {
        throw new BadRequestException(`Cannot update a deleted collaborator.`)
      }

      const updated = await this.CollaboratorModel.findOneAndUpdate(
        { _id: id },
        { $set: data },
        { new: true }
      ).exec()

      if (!updated) {
        throw new InternalServerErrorException(`Failed to update collaborator.`)
      }

      return updated
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message)
    }
  }

  async getAllCollaborators(withDeleted = false): Promise<CollaboratorDocument[]> {
    if (withDeleted) {
      return await this.CollaboratorModel.findWithDeleted().exec()
    }

    return await this.CollaboratorModel.find().exec()
  }

  async getCollaboratorByIdentifier(identifier: string): Promise<CollaboratorDocument> {
    const collaborator = await this.CollaboratorModel.findOne({ identifier }).exec()

    if (!collaborator) {
      throw new NotFoundException(`Collaborator with identifier ${identifier} not found.`)
    }

    return collaborator
  }
}

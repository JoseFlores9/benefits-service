import { PartialType } from '@nestjs/mapped-types';
import { CreateCollaboratorDto } from './create-collaborator.dto';

export class PartialUpdateCollaboratorDto extends PartialType(CreateCollaboratorDto) {}
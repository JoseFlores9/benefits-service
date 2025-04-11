import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongooseDelete from 'mongoose-delete';

export type CollaboratorDocument = Collaborator & mongooseDelete.SoftDeleteDocument;

@Schema({timestamps: true})
export class Collaborator {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  identifier: string;

  @Prop({ type: Object, required: true, default: {} })
  companies: { [key: string]: string[] }
}

export const CollaboratorSchema = SchemaFactory.createForClass(Collaborator).plugin(mongooseDelete, {deletedAt: true, overrideMethods: 'all'});
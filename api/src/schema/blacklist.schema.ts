import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlacklistDataDocument = BlacklistData & Document;

@Schema({ timestamps: true })
export class BlacklistData {

    @Prop({ required: true }) uuid: string
}

export const BlackistDataSchema = SchemaFactory.createForClass(BlacklistData);

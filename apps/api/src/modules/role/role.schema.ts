import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Permission } from "../permission/permission.schema";

@Schema({ autoCreate: true, timestamps: true, versionKey: false })
export class Role {
  @Prop({ type: String, required: true, unique: true })
  name!: string;

  @Prop({ type: String, required: true })
  description!: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Permission.name }], default: [] })
  permissions!: Types.ObjectId[];

  @Prop({ type: Boolean, default: true })
  status!: boolean;
}

export type RoleDocument = HydratedDocument<Role>;
export const RoleSchema = SchemaFactory.createForClass(Role);

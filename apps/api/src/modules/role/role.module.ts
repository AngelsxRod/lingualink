import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Role, RoleSchema } from "./role.schema";
import { RoleService } from "./role.service";
import { RoleController } from "./role.controller";
import { PermissionModule } from "../permission/permission.module";

@Module({
  imports: [MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]), PermissionModule],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService, MongooseModule],
})
export class RoleModule {}

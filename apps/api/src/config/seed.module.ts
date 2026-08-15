import { Module } from "@nestjs/common";
import { PermissionModule } from "../modules/permission/permission.module";
import { RoleModule } from "../modules/role/role.module";
import { SeedService } from "./seed.service";

@Module({
  imports: [PermissionModule, RoleModule],
  providers: [SeedService],
})
export class SeedModule {}

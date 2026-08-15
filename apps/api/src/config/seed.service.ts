import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Permission, PermissionDocument } from "../modules/permission/permission.schema";
import { Role, RoleDocument } from "../modules/role/role.schema";
import { PERMISSIONS_SEED } from "./permissions.seed";

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectModel(Permission.name) private readonly permissionModel: Model<PermissionDocument>,
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
  ) {}

  async onModuleInit(): Promise<void> {
    try {
      const permissionIds: Types.ObjectId[] = [];
      for (const perm of PERMISSIONS_SEED) {
        let existingPermission = await this.permissionModel.findOne({ name: perm.name });
        if (!existingPermission) {
          existingPermission = await this.permissionModel.create(perm);
          this.logger.log(`✅ Permiso creado: ${perm.name}`);
        }
        permissionIds.push(existingPermission._id);
      }

      const adminRole = await this.roleModel.findOne({ name: "Administrador" });
      if (!adminRole) {
        await this.roleModel.create({
          name: "Administrador",
          description: "Rol de administrador del sistema",
          permissions: permissionIds,
        });
        this.logger.log('✅ Rol "Administrador" creado y permisos asignados');
      } else {
        adminRole.permissions = permissionIds;
        await adminRole.save();
        this.logger.log('🔹 Rol "Administrador" actualizado con permisos');
      }

      this.logger.log("✅ Inicialización de permisos completada");
    } catch (error) {
      this.logger.error("❌ Error al inicializar permisos:", error instanceof Error ? error.stack : error);
    }
  }
}

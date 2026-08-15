import config from "../config.js";
import { Permission } from "#permission";
import { Role } from "#role";
import permissionsList from "../permissions.js";
import mongoose from "mongoose";

const initPermissions = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongo_uri);

    const permissionIds: mongoose.Types.ObjectId[] = [];
    for (const perm of permissionsList) {
      let existingPermission = await Permission.findOne({ name: perm.name });
      if (!existingPermission) {
        existingPermission = await Permission.create(perm);
        console.log(`✅ Permiso creado: ${perm.name}`);
      }
      permissionIds.push(existingPermission._id);
    }

    let adminRole = await Role.findOne({ name: "Administrador" });

    if (!adminRole) {
      adminRole = await Role.create({
        name: "Administrador",
        description: "Rol de administrador del sistema",
        permissions: permissionIds,
      });
      console.log('✅ Rol "Administrador" creado y permisos asignados');
    } else {
      adminRole.permissions = permissionIds;
      await adminRole.save();
      console.log('🔹 Rol "Administrador" actualizado con permisos');
    }

    console.log("✅ Inicialización de permisos completada");
  } catch (error) {
    console.error("❌ Error al inicializar permisos:", error);
  }
};

export default initPermissions;

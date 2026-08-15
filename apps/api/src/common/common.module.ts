import { Global, Module } from "@nestjs/common";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { PermissionsGuard } from "./guards/permissions.guard";

// Global: JwtAuthGuard/PermissionsGuard quedan disponibles para @UseGuards(...) en
// cualquier controller del app sin que cada módulo tenga que importar AuthModule.
@Global()
@Module({
  providers: [JwtAuthGuard, PermissionsGuard],
  exports: [JwtAuthGuard, PermissionsGuard],
})
export class CommonModule {}

import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { PermissionService } from "./permission.service";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";

@Controller("permission")
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  findAll(@Query("page") page?: string, @Query("pageSize") pageSize?: string) {
    return this.permissionService.findAll(page, pageSize);
  }

  @Post()
  create(@Body() dto: CreatePermissionDto) {
    return this.permissionService.create(dto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdatePermissionDto) {
    return this.permissionService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.permissionService.remove(id);
  }
}

import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";

@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll(@Query("page") page?: string, @Query("pageSize") pageSize?: string) {
    return this.roleService.findAll(page, pageSize);
  }

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateRoleDto) {
    return this.roleService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.roleService.remove(id);
  }
}

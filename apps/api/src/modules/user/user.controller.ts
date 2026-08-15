import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { PermissionsGuard } from "../../common/guards/permissions.guard";
import { Permissions } from "../../common/decorators/permissions.decorator";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import type { UserDocument } from "./user.schema";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions("LISTAR_USUARIOS")
  findAll(@Query("page") page?: string, @Query("pageSize") pageSize?: string) {
    return this.userService.findAll(page, pageSize);
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  getProfile(@CurrentUser() user: UserDocument) {
    return this.userService.findProfile(user.id);
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}

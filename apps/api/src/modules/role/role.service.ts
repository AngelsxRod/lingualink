import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Role, RoleDocument } from "./role.schema";
import { PermissionDocument } from "../permission/permission.schema";
import { PermissionService } from "../permission/permission.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
    private readonly permissionService: PermissionService,
  ) {}

  async findAll(page: number | string = 1, pageSize: number | string = 10) {
    const currentPage = Number(page);
    const currentPageSize = Number(pageSize);
    const skip = (currentPage - 1) * currentPageSize;
    const roles = await this.roleModel
      .find({ status: true })
      .skip(skip)
      .limit(currentPageSize)
      .populate("permissions", "name -_id");
    const totalRoles = await this.roleModel.countDocuments({ status: true });

    const rolesConPermisos = roles.map((role) => ({
      ...role.toObject(),
      permissions: (role.permissions as unknown as PermissionDocument[]).map((permission) => permission.name),
    }));

    return {
      roles: rolesConPermisos,
      pageSize: currentPageSize,
      totalRoles,
      totalPages: Math.ceil(totalRoles / currentPageSize),
      currentPage,
    };
  }

  async create(data: CreateRoleDto): Promise<RoleDocument> {
    const existing = await this.roleModel.findOne({ name: data.name });
    if (existing) {
      throw new ConflictException("El rol ya existe");
    }
    await this.permissionService.ensureAllExist(data.permissions);
    const role = new this.roleModel(data);
    return role.save();
  }

  async update(id: string, data: UpdateRoleDto): Promise<RoleDocument> {
    await this.ensureExists(id);
    if (data.name) {
      const existing = await this.roleModel.findOne({ name: data.name });
      if (existing && existing.id !== id) {
        throw new ConflictException("El rol ya existe");
      }
    }
    await this.permissionService.ensureAllExist(data.permissions);
    const role = await this.roleModel.findByIdAndUpdate(id, data, { new: true });
    return role!;
  }

  async remove(id: string): Promise<RoleDocument> {
    await this.ensureExists(id);
    const role = await this.roleModel.findByIdAndUpdate(id, { status: false }, { new: true });
    return role!;
  }

  async ensureExists(id: string): Promise<RoleDocument> {
    const role = await this.roleModel.findById(id);
    if (!role) {
      throw new NotFoundException("El rol no existe");
    }
    return role;
  }
}

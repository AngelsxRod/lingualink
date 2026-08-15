import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Permission, PermissionDocument } from "./permission.schema";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";

@Injectable()
export class PermissionService {
  constructor(@InjectModel(Permission.name) private readonly permissionModel: Model<PermissionDocument>) {}

  async findAll(page: number | string = 1, pageSize: number | string = 10) {
    const currentPage = Number(page);
    const currentPageSize = Number(pageSize);
    const skip = (currentPage - 1) * currentPageSize;
    const permissions = await this.permissionModel
      .find({ status: true })
      .skip(skip)
      .limit(currentPageSize);
    const totalPermissions = await this.permissionModel.countDocuments({ status: true });

    return {
      permissions,
      pageSize: currentPageSize,
      totalPermissions,
      totalPages: Math.ceil(totalPermissions / currentPageSize),
      currentPage,
    };
  }

  async create(data: CreatePermissionDto): Promise<PermissionDocument> {
    const existing = await this.permissionModel.findOne({ name: data.name });
    if (existing) {
      throw new ConflictException("El permiso ya existe");
    }
    const permission = new this.permissionModel(data);
    return permission.save();
  }

  async update(id: string, data: UpdatePermissionDto): Promise<PermissionDocument> {
    await this.ensureExists(id);
    if (data.name) {
      const existing = await this.permissionModel.findOne({ name: data.name });
      if (existing && existing.id !== id) {
        throw new ConflictException("El permiso ya existe");
      }
    }
    const permission = await this.permissionModel.findByIdAndUpdate(id, data, { new: true });
    return permission!;
  }

  async remove(id: string): Promise<PermissionDocument> {
    await this.ensureExists(id);
    const permission = await this.permissionModel.findByIdAndUpdate(id, { status: false }, { new: true });
    return permission!;
  }

  async ensureExists(id: string): Promise<PermissionDocument> {
    const permission = await this.permissionModel.findById(id);
    if (!permission) {
      throw new NotFoundException(`El permiso ${id} no existe`);
    }
    return permission;
  }

  async ensureAllExist(ids: string[] = []): Promise<void> {
    for (const id of ids) {
      await this.ensureExists(id);
    }
  }
}

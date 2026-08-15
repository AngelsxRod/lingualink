import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { put } from "@vercel/blob";
import { Resource, ResourceDocument } from "./resource.schema";
import { CreateResourceDto } from "./dto/create-resource.dto";

@Injectable()
export class ResourceService {
  constructor(@InjectModel(Resource.name) private readonly resourceModel: Model<ResourceDocument>) {}

  async create(data: CreateResourceDto, file?: Express.Multer.File): Promise<ResourceDocument> {
    if (!file) {
      throw new BadRequestException("Archivo es requerido");
    }

    const blob = await put(`resources/${Date.now()}-${file.originalname}`, file.buffer, {
      access: "public",
      contentType: file.mimetype,
    });

    const resource = new this.resourceModel({ ...data, filePath: blob.url });
    return resource.save();
  }

  async findAll(): Promise<ResourceDocument[]> {
    return this.resourceModel.find();
  }

  async findOne(id: string): Promise<ResourceDocument> {
    const resource = await this.resourceModel.findById(id);
    if (!resource) {
      throw new NotFoundException("Recurso no encontrado");
    }
    return resource;
  }
}

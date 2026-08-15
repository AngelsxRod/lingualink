import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Tag, TagDocument } from "./tag.schema";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private readonly tagModel: Model<TagDocument>) {}

  async findAll(page: number | string = 1, pageSize: number | string = 10) {
    const currentPage = Number(page);
    const currentPageSize = Number(pageSize);
    const skip = (currentPage - 1) * currentPageSize;
    const tags = await this.tagModel.find({ status: true }).skip(skip).limit(currentPageSize);
    const totalTags = await this.tagModel.countDocuments({ status: true });

    return {
      tags,
      pageSize: currentPageSize,
      totalTags,
      totalPages: Math.ceil(totalTags / currentPageSize),
      currentPage,
    };
  }

  async create(data: CreateTagDto): Promise<TagDocument> {
    const existing = await this.tagModel.findOne({ name: data.name });
    if (existing) {
      throw new ConflictException("La etiqueta ya existe");
    }
    const tag = new this.tagModel(data);
    return tag.save();
  }

  async update(id: string, data: UpdateTagDto): Promise<TagDocument> {
    await this.ensureExists(id);
    if (data.name) {
      const existing = await this.tagModel.findOne({ name: data.name });
      if (existing && existing.id !== id) {
        throw new ConflictException("La etiqueta ya existe");
      }
    }
    const tag = await this.tagModel.findByIdAndUpdate(id, data, { new: true });
    return tag!;
  }

  async remove(id: string): Promise<TagDocument> {
    await this.ensureExists(id);
    const tag = await this.tagModel.findByIdAndUpdate(id, { status: false }, { new: true });
    return tag!;
  }

  async ensureExists(id: string): Promise<TagDocument> {
    const tag = await this.tagModel.findById(id);
    if (!tag) {
      throw new NotFoundException(`La etiqueta no existe ${id}`);
    }
    return tag;
  }

  async ensureAllExist(ids: string[] = []): Promise<void> {
    for (const id of ids) {
      await this.ensureExists(id);
    }
  }
}

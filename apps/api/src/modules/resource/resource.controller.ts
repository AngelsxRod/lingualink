import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { extname } from "path";
import { memoryStorage } from "multer";
import { ResourceService } from "./resource.service";
import { CreateResourceDto } from "./dto/create-resource.dto";

@Controller("resource")
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: memoryStorage(),
      fileFilter: (_req, file, cb) => {
        if (extname(file.originalname).toLowerCase() === ".pdf") {
          cb(null, true);
        } else {
          cb(new BadRequestException("Solo se permiten archivos PDF"), false);
        }
      },
    }),
  )
  create(@Body() dto: CreateResourceDto, @UploadedFile() file?: Express.Multer.File) {
    return this.resourceService.create(dto, file);
  }

  @Get()
  findAll() {
    return this.resourceService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.resourceService.findOne(id);
  }
}

import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { TagService } from "./tag.service";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";

@Controller("tags")
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  findAll(@Query("page") page?: string, @Query("pageSize") pageSize?: string) {
    return this.tagService.findAll(page, pageSize);
  }

  @Post()
  create(@Body() dto: CreateTagDto) {
    return this.tagService.create(dto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateTagDto) {
    return this.tagService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tagService.remove(id);
  }
}

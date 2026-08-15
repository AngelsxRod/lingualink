import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import { User, UserDocument } from "./user.schema";
import { CreateUserDto } from "./dto/create-user.dto";

const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async ensureEmailUnique(email: string): Promise<void> {
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new ConflictException("El email ya está registrado");
    }
  }

  async ensureUsernameUnique(username: string): Promise<void> {
    const user = await this.userModel.findOne({ username });
    if (user) {
      throw new ConflictException("El username ya está registrado");
    }
  }

  async ensureExists(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException("El usuario no existe");
    }
    return user;
  }

  async create(data: CreateUserDto): Promise<UserDocument> {
    const user = new this.userModel(data);
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
    return user.save();
  }

  async findAll(page: number | string = 1, pageSize: number | string = 10) {
    const currentPage = Number(page);
    const currentPageSize = Number(pageSize);
    const skip = (currentPage - 1) * currentPageSize;
    const users = await this.userModel.find({ status: true }).skip(skip).limit(currentPageSize);
    const totalUsers = await this.userModel.countDocuments({ status: true });

    return {
      users,
      pageSize: currentPageSize,
      totalUsers,
      totalPages: Math.ceil(totalUsers / currentPageSize),
      currentPage,
    };
  }

  async findProfile(id: string): Promise<UserDocument> {
    return this.ensureExists(id);
  }
}

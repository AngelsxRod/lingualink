import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import { User, UserDocument } from "../user/user.schema";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginDto): Promise<{ user: UserDocument; token: string }> {
    const user = await this.userModel.findOne({ email: data.email });
    if (!user) {
      throw new UnauthorizedException("Usuario no encontrado");
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException("Contraseña incorrecta");
    }

    const token = this.signToken(user);
    return { user, token };
  }

  async register(data: RegisterDto): Promise<UserDocument> {
    await this.userService.ensureEmailUnique(data.email);
    await this.userService.ensureUsernameUnique(data.username);

    const user = new this.userModel({
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      username: data.username,
      password: data.password,
      role: data.role,
    });
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
    return user.save();
  }

  async changePassword(id: string, data: ChangePasswordDto): Promise<UserDocument> {
    const user = await this.userService.ensureExists(id);

    const isMatch = await bcrypt.compare(data.oldPassword, user.password);
    if (!isMatch) {
      throw new UnauthorizedException("La contraseña actual es incorrecta");
    }

    user.password = await bcrypt.hash(data.newPassword, SALT_ROUNDS);
    return user.save();
  }

  private signToken(user: UserDocument): string {
    return this.jwtService.sign({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    });
  }
}

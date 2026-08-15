import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import type { Request } from "express";
import { Model } from "mongoose";
import { User, UserDocument } from "../user/user.schema";
import type { ConfigShape } from "../../config/configuration";

interface JwtClaims {
  id: string;
  email: string;
  username: string;
  role?: string | null;
}

const cookieExtractor = (req: Request): string | null => {
  const cookies = req?.cookies as Record<string, string> | undefined;
  return cookies?.access_token || null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService<ConfigShape, true>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor, ExtractJwt.fromAuthHeaderAsBearerToken()]),
      ignoreExpiration: false,
      secretOrKey: configService.get("app", { infer: true }).jwtSecret,
    });
  }

  async validate(payload: JwtClaims): Promise<UserDocument> {
    const user = await this.userModel.findById(payload.id).populate({
      path: "role",
      populate: { path: "permissions" },
    });

    if (!user) {
      throw new UnauthorizedException("Usuario no encontrado");
    }
    if (!user.status) {
      throw new UnauthorizedException("Token no válido - usuario con estado:false");
    }

    return user;
  }
}

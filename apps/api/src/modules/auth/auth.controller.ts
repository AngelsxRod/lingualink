import { Body, Controller, HttpCode, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Response } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import type { UserDocument } from "../user/user.schema";
import type { ConfigShape } from "../../config/configuration";

const ACCESS_TOKEN_COOKIE = "access_token";
const EIGHT_HOURS_MS = 8 * 60 * 60 * 1000;

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<ConfigShape, true>,
  ) {}

  @Post("login")
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { user, token } = await this.authService.login(dto);
    res.cookie(ACCESS_TOKEN_COOKIE, token, this.cookieOptions());
    return { user };
  }

  @Post("register")
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post("change-password")
  @UseGuards(JwtAuthGuard)
  changePassword(@CurrentUser() user: UserDocument, @Body() dto: ChangePasswordDto) {
    return this.authService.changePassword(user.id, dto);
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(ACCESS_TOKEN_COOKIE, { path: "/" });
    return { message: "Sesión cerrada" };
  }

  private cookieOptions() {
    const isProd = this.configService.get("app", { infer: true }).isProd;
    return {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax" as const,
      path: "/",
      maxAge: EIGHT_HOURS_MS,
    };
  }
}

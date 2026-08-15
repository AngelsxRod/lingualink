import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { JwtService } from "@nestjs/jwt";
import { UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { User } from "../user/user.schema";

describe("AuthService", () => {
  let authService: AuthService;
  let userModel: { findOne: jest.Mock };
  let userService: { ensureEmailUnique: jest.Mock; ensureUsernameUnique: jest.Mock };

  beforeEach(async () => {
    userModel = { findOne: jest.fn() };
    userService = {
      ensureEmailUnique: jest.fn().mockResolvedValue(undefined),
      ensureUsernameUnique: jest.fn().mockResolvedValue(undefined),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getModelToken(User.name), useValue: userModel },
        { provide: UserService, useValue: userService },
        { provide: JwtService, useValue: { sign: jest.fn().mockReturnValue("signed-jwt") } },
      ],
    }).compile();

    authService = moduleRef.get(AuthService);
  });

  describe("login", () => {
    it("rechaza cuando el usuario no existe", async () => {
      userModel.findOne.mockResolvedValue(null);

      await expect(authService.login({ email: "missing@example.com", password: "x" })).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it("rechaza cuando la contraseña no coincide", async () => {
      const hashed = await bcrypt.hash("correcta123", 10);
      userModel.findOne.mockResolvedValue({ password: hashed });

      await expect(authService.login({ email: "user@example.com", password: "incorrecta" })).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it("devuelve el usuario y un token cuando las credenciales son correctas", async () => {
      const hashed = await bcrypt.hash("correcta123", 10);
      const user = { id: "u1", email: "user@example.com", username: "user1", role: null, password: hashed };
      userModel.findOne.mockResolvedValue(user);

      const result = await authService.login({ email: "user@example.com", password: "correcta123" });

      expect(result).toEqual({ user, token: "signed-jwt" });
    });
  });

  describe("register", () => {
    it("valida unicidad de email y username antes de crear el usuario", async () => {
      userService.ensureEmailUnique.mockRejectedValue(new Error("El email ya está registrado"));

      await expect(
        authService.register({
          name: "Ana",
          lastname: "Perez",
          email: "dup@example.com",
          username: "anap",
          password: "Str0ngPass!23",
          confirmPassword: "Str0ngPass!23",
        }),
      ).rejects.toThrow("El email ya está registrado");

      expect(userService.ensureEmailUnique).toHaveBeenCalledWith("dup@example.com");
    });
  });
});

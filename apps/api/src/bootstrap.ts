import "reflect-metadata";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import type { NestExpressApplication } from "@nestjs/platform-express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import type { Express } from "express";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import type { AppConfig, ConfigShape } from "./config/configuration";

export interface CreatedApp {
  app: NestExpressApplication;
  appConfig: AppConfig;
}

/** Fábrica compartida por main.ts (dev/servidor tradicional) y api/index.js (handler serverless de Vercel). */
export const createApp = async (): Promise<CreatedApp> => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService<ConfigShape, true>);
  const appConfig = configService.get("app", { infer: true });

  app.use(cookieParser());
  app.use(helmet());
  app.enableCors({
    origin: appConfig.corsOrigins.length ? appConfig.corsOrigins : true,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  return { app, appConfig };
};

/** Usado por el handler serverless: inicializa la app (sin listen) y expone el Express plano subyacente. */
export const createServer = async (): Promise<Express> => {
  const { app } = await createApp();
  await app.init();
  return app.getHttpAdapter().getInstance();
};

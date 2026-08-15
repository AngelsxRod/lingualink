import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import configuration, { ConfigShape } from "./config/configuration";
import { SeedModule } from "./config/seed.module";
import { CommonModule } from "./common/common.module";
import { AppController } from "./app.controller";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { TagModule } from "./modules/tag/tag.module";
import { PermissionModule } from "./modules/permission/permission.module";
import { RoleModule } from "./modules/role/role.module";
import { QuestionModule } from "./modules/question/question.module";
import { AnswerModule } from "./modules/answer/answer.module";
import { ResourceModule } from "./modules/resource/resource.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: [".env.local", ".env"],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigShape, true>) => ({
        uri: configService.get("app", { infer: true }).mongoUri,
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 10,
      }),
    }),
    CommonModule,
    SeedModule,
    AuthModule,
    UserModule,
    TagModule,
    PermissionModule,
    RoleModule,
    QuestionModule,
    AnswerModule,
    ResourceModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { Request } from "express";
import type { UserDocument } from "../../modules/user/user.schema";

export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext): UserDocument => {
  const request = ctx.switchToHttp().getRequest<Request & { user: UserDocument }>();
  return request.user;
});

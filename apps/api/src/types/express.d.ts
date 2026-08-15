import type { UserDocument } from "../modules/user/user.schema";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}

export {};

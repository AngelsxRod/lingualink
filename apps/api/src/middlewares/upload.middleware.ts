import multer, { type FileFilterCallback } from "multer";
import path from "path";
import type { Request } from "express";

const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (fileExtension === ".pdf") {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos PDF"));
  }
};

export const upload = multer({
  storage,
  fileFilter,
});

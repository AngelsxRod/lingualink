"use strict";
import { Tag } from "#tag";
import { check } from "express-validator";
import { validateFields } from "#middleware";

export const validateTagsExist = async (tags) => {
  if (tags && tags.length > 0) {
    for (const tagId of tags) {
      await validateTagExists(tagId);
    }
  }
  return true;
};

export const validateTagUnique = async (name) => {
  const tag = await Tag.findOne({ name });
  if (tag) {
    throw new Error("La etiqueta ya existe");
  }
  return true;
};

export const validateTagExists = async (id) => {
  const tag = await Tag.findById(id);
  if (!tag) {
    throw new Error(`La etiqueta no existe ${id}`);
  }
  return true;
};
export const validateTagUniqueForUpdate = async (name, id) => {
  const tag = await Tag.findOne({ name });
  if (tag && tag.id !== id) {
    throw new Error("La etiqueta ya existe");
  }
};

export const AddTagValidators = [
  check("name", "El nombre es obligatorio").notEmpty(),
  check("name", "El nombre debe tener al menos 3 caracteres").isLength({
    min: 3,
  }),
  check("name").custom(validateTagUnique),
  check("description", "La descripción es obligatoria").notEmpty(),
  check(
    "description",
    "La descripción debe tener al menos 3 caracteres"
  ).isLength({
    min: 3,
  }),
  validateFields,
];

export const UpdateTagValidators = [
  check("id", "El id es obligatorio").notEmpty(),
  check("id", "El id no es válido").isMongoId(),
  check("id").custom(validateTagExists),
  check("name", "El nombre debe tener al menos 3 caracteres")
    .optional()
    .isLength({ min: 3 })
    .custom(async (name, { req }) => {
      await validateTagUniqueForUpdate(name, req.params.id);
      return true;
    }),
  check("description").optional().isString(),
  validateFields,
];

export const DeleteTagValidators = [
  check("id", "El id es obligatorio").notEmpty(),
  check("id", "El id no es válido").isMongoId(),
  check("id").custom(validateTagExists),
  validateFields,
];

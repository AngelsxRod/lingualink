import { registerDecorator, ValidationOptions } from "class-validator";
import zxcvbn from "zxcvbn";

/** Rechaza contraseñas débiles según el score de zxcvbn (< 2), igual que el validador Express original. */
export function HasStrongPasswordScore(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      name: "hasStrongPasswordScore",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (typeof value !== "string") return false;
          return zxcvbn(value).score >= 2;
        },
        defaultMessage() {
          return "La contraseña es muy débil";
        },
      },
    });
  };
}

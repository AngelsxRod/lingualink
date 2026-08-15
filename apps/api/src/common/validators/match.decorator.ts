import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

/** Valida que este campo tenga el mismo valor que `property` (ej. confirmPassword === password). */
export function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      name: "match",
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints as [string];
          const relatedValue = (args.object as Record<string, unknown>)[relatedPropertyName];
          return value === relatedValue;
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints as [string];
          return `${args.property} debe coincidir con ${relatedPropertyName}`;
        },
      },
    });
  };
}

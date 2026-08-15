import { Lock, Mail } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, InputField } from "../ui";
import type { LoginDto } from "@lingualink/shared";

import useAuth from "../../hooks/useAuth";
export const LoginForm = () => {
  const methods = useForm<LoginDto>();
  const { handleSubmit } = methods;

  const { loginUser, isLoading } = useAuth();
  const onSubmit = async (data: LoginDto) => {
    await loginUser(data);
  };
  return (
    <FormProvider {...methods}>
      <form
        className="space-y-8"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          icon={Mail}
          name="email"
          type="email"
          label="Correo electrónico"
          placeholder="Ingresa tu correo"
          rules={{
            required: "El correo es obligatorio",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Correo no válido",
            },
          }}
        />
        <InputField
          label="Contraseña"
          icon={Lock}
          type="password"
          placeholder="Contraseña"
          name="password"
          rules={{
            required: "La contraseña es obligatoria",
            minLength: {
              value: 6,
              message: "Mínimo 6 caracteres",
            },
          }}
        />
        <div className="mt-4">
          <Button
            variant="solid"
            className="w-full py-2"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Iniciar sesión"}
          </Button>

        </div>
      </form>
    </FormProvider>
  );
};

import { FormProvider, useForm } from "react-hook-form";
import { Button, InputField } from "../ui";
import { Mail, Lock, User, Contact } from "lucide-react";
import { useRegisterMutation } from "../../features/api/authApi";
import toast from "react-hot-toast";
import useNavigator from "../../hooks/useNavigator";


const RegisterForm = () => {
  const methods = useForm();
  const { handleSubmit, reset } = methods;
  const [register, { isLoading }] = useRegisterMutation();
  const { goTo } = useNavigator();

  const onSubmit = async (data) => {
    try {
      await register(data).unwrap();
      toast.success("¡Registro exitoso!");
      goTo("/auth/login");
      reset();
    } catch (error) {
      console.error("Error en el registro:", error);
      toast.error(
        error?.data?.message || "Error en el registro, intenta nuevamente."
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-8"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          icon={User}
          name="name"
          type="text"
          label="Nombre"
          darkMode={true}
          placeholder="Ingresa tu nombre"
          rules={{
            required: "El nombre es obligatorio",
          }}
        />
        <InputField
          icon={User}
          name="lastname"
          type="text"
          label="Apellido"
          darkMode={true}
          placeholder="Ingresa tu apellido"
          rules={{
            required: "El apellido es obligatorio",
          }}
        />

        <InputField
          icon={Mail}
          name="email"
          type="email"
          label="Correo electrónico"
          darkMode={true}
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
          icon={Contact}
          name="username"
          type="text"
          label="Nombre de usuario"
          darkMode={true}
          placeholder="Ingresa tu nombre de usuario"
          rules={{
            required: "El nombre de usuario es obligatorio",
            minLength: {
              value: 3,
              message: "Mínimo 3 caracteres",
            },
          }}
        />
        <InputField
          icon={Lock}
          name="password"
          type="password"
          label="Contraseña"
          darkMode={true}
          placeholder="Ingresa tu contraseña"
          rules={{
            required: "La contraseña es obligatoria",
            minLength: {
              value: 6,
              message: "Mínimo 6 caracteres",
            },
          }}
        />
        <InputField
          icon={Lock}
          name="confirmPassword"
          type="password"
          label="Confirmar contraseña"
          darkMode={true}
          placeholder="Confirma tu contraseña"
          rules={{
            required: "La confirmación de la contraseña es obligatoria",
            validate: (value) =>
              value === methods.getValues("password") ||
              "Las contraseñas no coinciden",
          }}
        />
        <div className="md:col-span-2 ">
          <Button
            variant="solid"
            className="w-full py-3 "
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Crear cuenta"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;

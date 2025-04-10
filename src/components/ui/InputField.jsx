import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Importa los íconos de lucide-react
import { useFormContext } from "react-hook-form";

export const InputField = ({
  icon: Icon,
  type = "text",
  placeholder,
  label = "",
  name = "",
  rules = {},
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="relative">
      {/* LABEL */}
      {label && (
        <label
          htmlFor={name}
          className="block ml-1 text-gray-900 text-base font-semibold mb-2"
        >
          {label}
        </label>
      )}
      {/* INPUT */}
      <div className="flex items-center border-2 border-gray-200 py-3 px-3 rounded">
        {Icon && <Icon className="h-5 w-5 text-gray-400 mr-2" />}
        <input
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          {...register(name, rules)}
          className="outline-none border-none w-full"
        />
        {type === "password" && (
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </div>
        )}
      </div>
      {/* ERROR MESSAGE */}
      {errors[name] && (
        <span className="absolute ml-2 font-medium text-red-500 text-sm">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

"use client";

import { useState } from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import { useFormContext, type RegisterOptions } from "react-hook-form";

interface InputFieldProps {
  icon?: LucideIcon;
  type?: string;
  darkMode?: boolean;
  placeholder?: string;
  label?: string;
  name: string;
  rules?: RegisterOptions;
}

export const InputField = ({
  icon: Icon,
  type = "text",
  darkMode = false,
  placeholder,
  label = "",
  name = "",
  rules = {},
}: InputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  const labelClass = darkMode
    ? "block text-white text-base font-semibold mb-1"
    : "block text-gray-900 text-base font-semibold mb-1";

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="relative">
      {label && (
        <label htmlFor={name} className={`${labelClass}`}>
          {label}
        </label>
      )}
      <div className="flex items-center border-2 border-gray-200 py-3 px-3 rounded bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] focus-within:border-emerald-500 transition duration-200 ease-in-out">
        {Icon && <Icon className="h-5 w-5 text-gray-400 mr-2" />}
        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          {...register(name, rules)}
          className="outline-none border-none w-full"
        />
        {type === "password" && (
          <div onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
            {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
          </div>
        )}
      </div>
      {errorMessage && (
        <span className="absolute ml-2 font-medium text-rose-600 text-sm">{errorMessage}</span>
      )}
    </div>
  );
};

"use client";

import { useFormContext, type RegisterOptions } from "react-hook-form";

interface TextAreaProps {
  placeholder?: string;
  label?: string;
  name: string;
  rules?: RegisterOptions;
}

export const TextArea = ({ placeholder = "", label = "", name = "", rules = {} }: TextAreaProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="relative">
      {label && (
        <label htmlFor={name} className="block ml-1 text-gray-900 text-base font-semibold mb-2">
          {label}
        </label>
      )}
      <div className="flex items-center border-2 border-gray-200 py-3 px-3 rounded bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] focus-within:border-emerald-500 transition duration-200 ease-in-out">
        <textarea
          id={name}
          placeholder={placeholder}
          {...register(name, rules)}
          className="outline-none border-none w-full h-24 resize-none"
        />
      </div>
      {errorMessage && (
        <span className="absolute ml-2 font-semibold text-red-500 text-sm">{errorMessage}</span>
      )}
    </div>
  );
};

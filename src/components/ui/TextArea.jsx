import { useFormContext } from "react-hook-form";

export const TextArea = ({
  placeholder = "",
  label = "",
  name = "",
  rules = {},
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

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
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          {...register(name, rules)}
          className="outline-none border-none w-full h-24 resize-none"
        />
      </div>
      {/* ERROR MESSAGE */}
      {errors[name] && (
        <span className="absolute ml-2 font-semibold text-red-500 text-sm">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

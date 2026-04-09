import type {
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { get } from "react-hook-form";

export interface InputFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  required?: boolean;
}

export const InputField = <T extends FieldValues>({
  label,
  name,
  type,
  register,
  errors,
  required,
}: InputFieldProps<T>) => {
  const err: FieldError | undefined = get(errors, name);

  return (
    <div className="flex flex-col gap-1 mb-4">
      <label htmlFor={name} className="mb-1 text-sm font-bold capitalize">
        {label}
      </label>
      <input
        {...register(name, { required })}
        type={type || "text"}
        className="p-2 rounded bg-white shadow shadow-black/25 w-full"
        id={name}
      />
      {err && (
        <span className="text-red-500 text-xs mt-1">{`*${err.message} is required`}</span>
      )}
    </div>
  );
};

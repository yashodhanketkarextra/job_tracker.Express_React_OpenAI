import { api } from "@/api/client";
import { useAuthStore } from "@/store/auth";
import type { IUser } from "@/types/applications";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import type {
  FieldErrors,
  FieldValues,
  Path,
  SubmitHandler,
  UseFormRegister,
} from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  required?: boolean;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({ defaultValues: { email: "", password: "" } });

  const setToken = useAuthStore((s) => s.setToken);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    const res = await api.post("/auth/login", { ...data });
    setToken(res.data.token);
    navigate({ to: "/board" });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="shadow w-11/12 lg:w-1/3 p-6 rounded-xl">
        <h2 className="text-xl font-bold">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 w-full">
          <InputField
            label="Email"
            name="email"
            type="text"
            register={register}
            errors={errors}
            required
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            register={register}
            errors={errors}
            required
          />
          <button type="submit" className="w-full p-2 rounded shadow">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const InputField = <T extends FieldValues>({
  label,
  name,
  type,
  register,
  errors,
  required,
}: InputFieldProps<T>) => {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="mb-1 text-sm font-bold">
        {label}
      </label>
      <input
        {...register(name, { required })}
        type={type}
        className="p-2 rounded shadow w-full"
        id={name}
      />
      {errors[name] && (
        <span className="text-red-500 text-xs mt-1">{`*${label} is required`}</span>
      )}
    </div>
  );
};

export default LoginPage;

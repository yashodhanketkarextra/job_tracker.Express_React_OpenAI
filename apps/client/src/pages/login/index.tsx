import { useNavigate } from "@tanstack/react-router";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { api } from "@/api/client";
import { InputField } from "@/components/inputfield";
import { useAuthStore } from "@/store/auth";
import type { IUser } from "@/types/applications";

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
    <div className="shadow w-11/12 lg:w-1/3 p-6 rounded-xl mx-auto mt-[25%] lg:translate-y-[-50%] shadow  bg-zinc-100">
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
  );
};

export default LoginPage;

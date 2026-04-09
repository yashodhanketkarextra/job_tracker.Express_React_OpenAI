import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import type { AxiosError } from "axios";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { AiOutlineUser } from "react-icons/ai";

import { InputField } from "@/components/inputfield";
import type { IAuthForm } from "@/features/auth";
import { AuthFooter, authSchema } from "@/features/auth";
import { useAuth } from "@/store/query";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthForm>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "" },
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { useLoginMutation } = useAuth();

  const onSubmit: SubmitHandler<IAuthForm> = async (data) => {
    useLoginMutation.mutate(data);
    if (useLoginMutation.isError) {
      const err = (useLoginMutation.error as AxiosError)?.response?.data;

      setError((err as any)?.message || "Failed to login");
    }
  };

  return (
    <div className="shadow w-11/12 lg:w-1/3 p-6 rounded-xl mx-auto mt-[25%] lg:translate-y-[-50%] shadow  bg-zinc-100">
      <h2 className="text-xl font-bold">Login</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 w-full"
        onChange={() => setError("")}
      >
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
        <button
          type="submit"
          className="w-full p-2 rounded shadow inline-flex justify-center items-center gap-2"
        >
          <AiOutlineUser /> Login
        </button>
        {!!error && <p className="text-red-500 p-1 text-center">{error}</p>}
        <AuthFooter navigate={navigate} link="/register" name="register" />
      </form>
    </div>
  );
};

export default LoginPage;

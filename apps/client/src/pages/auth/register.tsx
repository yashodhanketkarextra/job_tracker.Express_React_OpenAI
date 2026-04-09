import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { api } from "@/api/client";
import { InputField } from "@/components/inputfield";

import type { IAuthForm } from "./common";
import { AuthFooter, authSchema } from "./common";

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

  const onSubmit: SubmitHandler<IAuthForm> = async (data) => {
    const res = await api.post("/auth/register", { ...data });
    if (res.status !== 200) setError("Failed to register");
    navigate({ to: "/" });
  };

  return (
    <div className="shadow w-11/12 lg:w-1/3 p-6 rounded-xl mx-auto mt-[25%] lg:translate-y-[-50%] shadow  bg-zinc-100">
      <h2 className="text-xl font-bold">Register</h2>
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
        <button type="submit" className="w-full p-2 rounded shadow">
          Register
        </button>
        {!!error && <p className="text-red-500 p-1 text-center">{error}</p>}
        <AuthFooter navigate={navigate} link="/" name="login" />
      </form>
    </div>
  );
};

export default LoginPage;

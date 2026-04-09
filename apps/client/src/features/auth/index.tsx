import type { UseNavigateResult } from "@tanstack/react-router";
import z from "zod";

interface AuthFooterProps {
  link: string;
  name: string;
  navigate: UseNavigateResult<string>;
}

export const authSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .pipe(z.email("Invalid email")),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(33, "Password too long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Must contain uppercase, lowercase, and number",
    ),
});

export type IAuthForm = z.infer<typeof authSchema>;

export const AuthFooter = ({ link, name, navigate }: AuthFooterProps) => {
  return (
    <p className="text-center p-1">
      {"Please "}
      <button
        type="button"
        className="underline italic font-bold pointer-cursor p-0! bg-transparent! text-black!"
        onClick={() => navigate({ to: link })}
      >
        {` ${name} `}
      </button>
      {" if you don't have an account"}
    </p>
  );
};

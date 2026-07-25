"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { loginSchema, LoginSchema } from "@/lib/validations/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    setServerError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
      setServerError(result.message);
      return;
    }
    router.push("/");
    console.log(result);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-md mx-auto mt-10"
    >
      <div>
        <input
          type="email"
          {...register("email")}
          placeholder="Email"
          className="border p-2 w-full"
        />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>
      </div>

      <div>
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="border p-2 w-full"
        />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>
      </div>

      {serverError && <p className="text-red-500">{serverError}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-black text-white p-2 rounded disabled:opacity-50"
      >
        {isSubmitting ? "Loading..." : "Login"}
      </button>
    </form>
  );
}

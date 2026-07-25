"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { registerSchema, RegisterSchema } from "@/lib/validations/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {  
    setServerError("");

    const response = await fetch("/api/auth/register", {
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
    router.push("/login");
    console.log(result);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-md mx-auto mt-10"
    >
      <div>
        <input
          {...register("name")}
          placeholder="Name"
          className="border p-2 w-full"
        />
        <p className="text-red-500 text-sm">{errors.name?.message}</p>
      </div>

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

      <div>
        <input
          type="password"
          {...register("confirmPassword")}
          placeholder="Confirm Password"
          className="border p-2 w-full"
        />
        <p className="text-red-500 text-sm">
          {errors.confirmPassword?.message}
        </p>
      </div>
      {serverError && <p className="text-red-500">{serverError}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-black text-white p-2 rounded disabled:opacity-50"
      >
        {isSubmitting ? "Creating Account..." : "Register"}
      </button>
    </form>
  );
}

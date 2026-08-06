"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { login } from "@/services/auth.service";
const schema = z.object({
  companyCode: z.string().min(1),
  email: z.email(),
  password: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    try {
      const response = await login(data); 
      const { accessToken, refreshToken, user } = response.data.user;
      localStorage.setItem("accessToken", accessToken);

      localStorage.setItem("refreshToken", refreshToken);
      toast.success(response.message);

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message ?? "Unable to login.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Label>Company Code</Label>

        <Input {...register("companyCode")} placeholder="TECHNOVA" />

        <p className="text-sm text-red-500">{errors.companyCode?.message}</p>
      </div>

      <div>
        <Label>Email</Label>

        <Input {...register("email")} placeholder="admin@example.com" />

        <p className="text-sm text-red-500">{errors.email?.message}</p>
      </div>

      <div>
        <Label>Password</Label>

        <Input type="password" {...register("password")} />

        <p className="text-sm text-red-500">{errors.password?.message}</p>
      </div>

      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
}

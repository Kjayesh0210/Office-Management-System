import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

import { registerSchema, loginSchema } from "@/lib/validations/auth";
import { userRepository } from "@/server/repositories/user.repository";

type RegisterData = z.infer<typeof registerSchema>;
type LoginData = z.infer<typeof loginSchema>;

export const authService = {
  async register(data: RegisterData) {
    const existingUser = await userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  },
  async login(data: LoginData) {
    const existingUser = await userRepository.findByEmail(data.email);
    if (!existingUser) {
      throw new Error("Invalid email or password");
    }
    const isPasswordCorrect = await bcrypt.compare(
      data.password,
      existingUser.password,
    );
    if (!isPasswordCorrect) {
      throw new Error("Invalid email or password");
    }
    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      },
    );
    return {
      token,
      user: {
        id: existingUser._id.toString(),
        name: existingUser.name,
        email: existingUser.email,
      },
    };
  },
};

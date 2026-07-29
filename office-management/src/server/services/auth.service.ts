import mongoose from "mongoose";

import { USER_ROLES } from "@/constants/roles";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "@/lib/auth/jwt";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { connectDB } from "@/lib/db";
import { ApiError } from "@/lib/errors/api-error";
import type {
  LoginInput,
  RefreshInput,
  SignupInput,
} from "@/lib/validations/auth";
import { companyRepository } from "@/server/repositories/company.repository";
import { userRepository } from "@/server/repositories/user.repository";
import type { AuthResult } from "@/types/auth";

export const authService = {
  async register(data: SignupInput): Promise<AuthResult> {
    await connectDB();

    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const email = data.email.trim().toLowerCase();
      const companyCode = data.companyCode.trim().toUpperCase();

      const existingCompany = await companyRepository.findByCompanyCode(
        companyCode,
        session,
      );

      if (existingCompany) {
        throw new ApiError(409, "Company code already exists.");
      }

      const existingUser = await userRepository.findByEmail(email, session);

      if (existingUser) {
        throw new ApiError(409, "Email already exists.");
      }

      const passwordHash = await hashPassword(data.password);

      const company = await companyRepository.create(
        {
          name: data.companyName.trim(),
          companyCode,
        },
        session,
      );

      const user = await userRepository.create(
        {
          companyId: company._id.toString(),
          name: data.name.trim(),
          email,
          passwordHash,
          role: USER_ROLES.SUPER_ADMIN,
        },
        session,
      );

      const accessToken = generateAccessToken({
        userId: user._id.toString(),
        companyId: company._id.toString(),
        role: user.role,
      });

      const refreshToken = generateRefreshToken({
        userId: user._id.toString(),
        companyId: company._id.toString(),
        role: user.role,
      });

      const refreshTokenHash = await hashPassword(refreshToken);

      await userRepository.updateRefreshToken(
        user._id.toString(),
        refreshTokenHash,
        session,
      );

      await session.commitTransaction();

      return {
        user: {
          id: user._id.toString(),
          companyId: company._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        },
        accessToken,
        refreshToken,
      };
    } catch (error: any) {
      if (session.inTransaction()) {
        await session.abortTransaction();
      }

      if (error?.code === 11000) {
        throw new ApiError(409, "Company code or email already exists.");
      }

      throw error;
    } finally {
      await session.endSession();
    }
  },

  async login(data: LoginInput): Promise<AuthResult> {
    await connectDB();

    const email = data.email.trim().toLowerCase();

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new ApiError(401, "Invalid email or password.");
    }

    const isPasswordValid = await verifyPassword(
      data.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password.");
    }

    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      companyId: user.companyId.toString(),
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user._id.toString(),
      companyId: user.companyId.toString(),
      role: user.role,
    });

    const refreshTokenHash = await hashPassword(refreshToken);

    await userRepository.updateRefreshToken(
      user._id.toString(),
      refreshTokenHash,
    );

    return {
      user: {
        id: user._id.toString(),
        companyId: user.companyId.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  },

  async refresh(data: RefreshInput): Promise<AuthResult> {
    await connectDB();

    let payload;

    try {
      payload = verifyRefreshToken(data.refreshToken);
    } catch {
      throw new ApiError(401, "Invalid refresh token.");
    }

    const user = await userRepository.findById(payload.userId);

    if (!user || !user.refreshTokenHash) {
      throw new ApiError(401, "Invalid refresh token.");
    }

    const isValid = await verifyPassword(
      data.refreshToken,
      user.refreshTokenHash,
    );

    if (!isValid) {
      throw new ApiError(401, "Invalid refresh token.");
    }

    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      companyId: user.companyId.toString(),
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user._id.toString(),
      companyId: user.companyId.toString(),
      role: user.role,
    });

    const refreshTokenHash = await hashPassword(refreshToken);

    await userRepository.updateRefreshToken(
      user._id.toString(),
      refreshTokenHash,
    );

    return {
      user: {
        id: user._id.toString(),
        companyId: user.companyId.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  },

  async logout(userId: string): Promise<void> {
    await connectDB();

    await userRepository.updateRefreshToken(userId, null);
  },

  async me(userId: string) {
    await connectDB();

    const user = await userRepository.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    return {
      id: user._id.toString(),
      companyId: user.companyId.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };
  },
};

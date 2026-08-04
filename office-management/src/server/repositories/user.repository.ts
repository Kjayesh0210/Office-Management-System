import type { ClientSession } from "mongoose";

import type { UserRole } from "@/constants/roles";
import { connectDB } from "@/lib/db";
import User from "@/server/models/user.model";

export interface CreateUserInput {
  companyId: string;
  employeeId?: string | null;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}

export const userRepository = {
  async findByEmail(email: string, session?: ClientSession) {
    await connectDB();

    return User.findOne({
      email: email.toLowerCase(),
    })
      .session(session ?? null)
      .lean();
  },

  async findByEmailAndTenant(
    email: string,
    companyId: string,
    session?: ClientSession,
  ) {
    await connectDB();

    return User.findOne({
      email: email.toLowerCase(),
      companyId,
    }).session(session ?? null);
  },

  async findById(id: string, session?: ClientSession) {
    await connectDB();

    return User.findById(id)
      .session(session ?? null)
      .lean();
  },

  async create(data: CreateUserInput, session?: ClientSession) {
    await connectDB();

    const [user] = await User.create([data], {
      session,
    });

    return user;
  },

  async updateRefreshToken(
    userId: string,
    refreshTokenHash: string | null,
    session?: ClientSession,
  ) {
    await connectDB();

    return User.findByIdAndUpdate(
      userId,
      {
        refreshTokenHash,
      },
      {
        new: true,
        session: session ?? null,
      },
    ).lean();
  },
  
};

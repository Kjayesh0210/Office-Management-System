import { ClientSession } from "mongoose";

import { connectDB } from "@/lib/db";
import { Department } from "@/server/models/department.model";
import type {
  CreateDepartmentInput,
  UpdateDepartmentInput,
} from "@/lib/validations/department";

export const departmentRepository = {
  async create(
    data: CreateDepartmentInput & { companyId: string },
    session?: ClientSession,
  ) {
    await connectDB();
    const [department] = await Department.create([data], {
      session,
    });

    return department.toObject();
  },

  async findById(
    companyId: string,
    departmentId: string,
    session?: ClientSession,
  ) {
    await connectDB();
    return Department.findOne({
      _id: departmentId,
      companyId,
    })
      .session(session ?? null)
      .lean();
  },

  async findByName(companyId: string, name: string, session?: ClientSession) {
    await connectDB();
    return Department.findOne({
      companyId,
      name,
    })
      .session(session ?? null)
      .lean();
  },

  async findByCode(companyId: string, code: string, session?: ClientSession) {
    await connectDB();

    return Department.findOne({
      companyId,
      code: code.toUpperCase(),
    })
      .session(session ?? null)
      .lean();
  },

  async findAll(companyId: string, session?: ClientSession) {
    await connectDB();
    return Department.find({
      companyId,
    })
      .sort({
        name: 1,
      })
      .session(session ?? null)
      .lean();
  },

  async update(
    companyId: string,
    departmentId: string,
    data: UpdateDepartmentInput,
    session?: ClientSession,
  ) {
    await connectDB();

    return Department.findOneAndUpdate(
      {
        _id: departmentId,
        companyId,
      },
      data,
      {
        new: true,
        session: session ?? null,
      },
    ).lean();
  },

  async delete(
    companyId: string,
    departmentId: string,
    session?: ClientSession,
  ) {
    await connectDB();
    return Department.findOneAndDelete(
      {
        _id: departmentId,
        companyId,
      },
      {
        session: session ?? null,
      },
    ).lean();
  },
};

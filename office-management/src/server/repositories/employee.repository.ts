import { ClientSession } from "mongoose";

import { connectDB } from "@/lib/db";
import { Employee } from "@/server/models/employee.models";
import type {
  CreateEmployeeInput,
  UpdateEmployeeInput,
} from "@/lib/validations/employee";

export const employeeRepository = {
  async create(
    data: CreateEmployeeInput & { companyId: string },
    session?: ClientSession,
  ) {
    await connectDB();

    const [employee] = await Employee.create([data], {
      session,
    });

    return employee.toObject();
  },
  async findById(
    companyId: string,
    employeeId: string,
    session?: ClientSession,
  ) {
    await connectDB();

    return Employee.findOne({
      _id: employeeId,
      companyId,
    })
      .session(session ?? null)
      .lean();
  },
  async findByEmployeeCode(
    companyId: string,
    employeeCode: string,
    session?: ClientSession,
  ) {
    await connectDB();

    return Employee.findOne({
      companyId,
      employeeCode,
    })
      .session(session ?? null)
      .lean();
  },
  async findByEmail(companyId: string, email: string, session?: ClientSession) {
    await connectDB();

    return Employee.findOne({
      companyId,
      email: email.toLowerCase(),
    })
      .session(session ?? null)
      .lean();
  },
  async findAll(
    companyId: string,
    page: number,
    limit: number,
    session?: ClientSession,
  ) {
    await connectDB();

    const skip = (page - 1) * limit;

    const [employee, total] = await Promise.all([
      Employee.find({ companyId })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .session(session ?? null)
        .lean(),

      Employee.countDocuments({
        companyId,
      }).session(session ?? null),
    ]);

    return {
      employee,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },
  async update(
    companyId: string,
    employeeId: string,
    data: UpdateEmployeeInput,
    session?: ClientSession,
  ) {
    await connectDB();

    return Employee.findOneAndUpdate(
      {
        _id: employeeId,
        companyId,
      },
      data,
      {
        new: true,
        session: session ?? null,
      },
    ).lean();
  },
  async delete(companyId: string, employeeId: string, session?: ClientSession) {
    await connectDB();

    return Employee.findOneAndDelete({
      _id: employeeId,
      companyId,
    })
      .session(session ?? null)
      .lean();
  },
};

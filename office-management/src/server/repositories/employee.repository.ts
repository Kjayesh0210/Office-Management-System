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
  async findAll(companyId: string, session?: ClientSession) {
    await connectDB();

    return Employee.find({
      companyId,
    })
      .session(session ?? null)
      .lean();
  },
  async update(id: string, data: UpdateEmployeeInput, session?: ClientSession) {
    await connectDB();

    return Employee.findByIdAndUpdate(id, data, {
      new: true,
      session: session ?? null,
    }).lean();
  },
  async delete(id: string, session?: ClientSession) {
    await connectDB();

    return Employee.findByIdAndDelete(id, {
      session: session ?? null,
    }).lean();
  },
};

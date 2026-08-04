import { ClientSession } from "mongoose";

import { connectDB } from "@/lib/db";
import { Employee } from "@/server/models/employee.model";
import type {
  CreateEmployeeInput,
  UpdateEmployeeInput,
} from "@/lib/validations/employee";
import "@/server/models/department.model";

export const employeeRepository = {
  async create(
    data: CreateEmployeeInput & { companyId: string },
    session?: ClientSession,
  ) {
    await connectDB();

    const [employee] = await Employee.create([data], {
      session,
    });

    return Employee.findById(employee._id)
      .populate("departmentId", "name code")
      .session(session ?? null)
      .lean();
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
      .populate("departmentId", "name code")
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
    options: {
      page: number;
      limit: number;
      search?: string;
      department?: string;
      designation?: string;
      status?: "ACTIVE" | "INACTIVE";
      sortBy?: string;
      order?: "asc" | "desc";
    },
    session?: ClientSession,
  ) {
    await connectDB();
    const {
      page,
      limit,
      search,
      department,
      designation,
      status,
      sortBy,
      order,
    } = options;

    const skip = (page - 1) * limit;

    const query: Record<string, any> = {
      companyId,
    };

    if (department) {
      query.departmentId = department;
    }

    if (designation) {
      query.designation = designation;
    }

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        {
          employeeCode: {
            $regex: search,
            $options: "i",
          },
        },
        {
          firstName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          lastName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }
    const sort: Record<string, 1 | -1> = {
      createdAt: -1,
    };

    if (sortBy) {
      sort[sortBy] = order === "asc" ? 1 : -1;
    }
    const [employee, total] = await Promise.all([
      Employee.find(query)
        .populate("departmentId", "name code")
        .skip(skip)
        .limit(limit)
        .sort(sort)
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
      hasNextPage: page * limit < total,
      hasPreviousPage: page > 1,
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
    )
      .populate("departmentId", "name code")
      .lean();
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

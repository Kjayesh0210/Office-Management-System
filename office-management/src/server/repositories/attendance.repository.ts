import { ClientSession } from "mongoose";

import { connectDB } from "@/lib/db";
import { Attendance } from "@/server/models/attendance.model";

import type {
  ManualAttendanceInput,
  UpdateAttendanceInput,
} from "@/lib/validations/attendance";
export const attendanceRepository = {
  async create(
    data: ManualAttendanceInput & {
      companyId: string;
      source: "SELF" | "MANUAL";
      approvalStatus: "PENDING" | "APPROVED";
      approvedBy?: string | null;
      approvedAt?: Date | null;
    },
    session?: ClientSession,
  ) {
    await connectDB();

    const [attendance] = await Attendance.create([data], {
      session,
    });

    return Attendance.findById(attendance._id)
      .populate("employeeId")
      .session(session ?? null)
      .lean();
  },

  async findTodayAttendance(
    companyId: string,
    employeeId: string,
    date: Date,
    session?: ClientSession,
  ) {
    await connectDB();

    return Attendance.findOne({
      companyId,
      employeeId,
      date,
    })
      .populate("employeeId")
      .session(session ?? null)
      .lean();
  },

  async findById(
    companyId: string,
    attendanceId: string,
    session?: ClientSession,
  ) {
    await connectDB();

    return Attendance.findOne({
      _id: attendanceId,
      companyId,
    })
      .populate("employeeId")
      .session(session ?? null)
      .lean();
  },

  async findPending(companyId: string, session?: ClientSession) {
    await connectDB();

    return Attendance.find({
      companyId,
      approvalStatus: "PENDING",
    })
      .populate("employeeId")
      .sort({
        createdAt: -1,
      })
      .session(session ?? null)
      .lean();
  },

  async findEmployeeAttendance(
    companyId: string,
    employeeId: string,
    session?: ClientSession,
  ) {
    await connectDB();

    return Attendance.find({
      companyId,
      employeeId,
    })
      .sort({
        date: -1,
      })
      .populate("employeeId")
      .session(session ?? null)
      .lean();
  },

  async update(
    companyId: string,
    attendanceId: string,
    data: UpdateAttendanceInput,
    session?: ClientSession,
  ) {
    await connectDB();

    return Attendance.findOneAndUpdate(
      {
        _id: attendanceId,
        companyId,
      },
      data,
      {
        new: true,
        session: session ?? null,
      },
    )
      .populate("employeeId")
      .lean();
  },

  async approve(
    companyId: string,
    attendanceId: string,
    approvedBy: string,
    remarks?: string,
    session?: ClientSession,
  ) {
    await connectDB();

    return Attendance.findOneAndUpdate(
      {
        _id: attendanceId,
        companyId,
      },
      {
        approvalStatus: "APPROVED",
        approvedBy,
        approvedAt: new Date(),
        ...(remarks && { remarks }),
      },
      {
        new: true,
        session: session ?? null,
      },
    )
      .populate("employeeId")
      .lean();
  },

  async reject(
    companyId: string,
    attendanceId: string,
    approvedBy: string,
    remarks: string,
    session?: ClientSession,
  ) {
    await connectDB();

    return Attendance.findOneAndUpdate(
      {
        _id: attendanceId,
        companyId,
      },
      {
        approvalStatus: "REJECTED",
        approvedBy,
        approvedAt: new Date(),
        remarks,
      },
      {
        new: true,
        session: session ?? null,
      },
    )
      .populate("employeeId")
      .lean();
  },
};

import { ApiError } from "@/lib/errors/api-error";

import {
  APPROVAL_STATUS,
  ATTENDANCE_SOURCE,
  ATTENDANCE_STATUS,
} from "@/server/models/attendance.model";

import { attendanceRepository } from "@/server/repositories/attendance.repository";
import { employeeRepository } from "@/server/repositories/employee.repository";

import type {
  ManualAttendanceInput,
  UpdateAttendanceInput,
  ApproveAttendanceInput,
  RejectAttendanceInput,
} from "@/lib/validations/attendance";
function getTodayDate() {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return today;
}
export const attendanceService = {
  async checkIn(companyId: string, employeeId: string) {
    const employee = await employeeRepository.findById(companyId, employeeId);

    if (!employee) {
      throw new ApiError(404, "Employee not found.");
    }

    const today = getTodayDate();

    const existingAttendance = await attendanceRepository.findTodayAttendance(
      companyId,
      employeeId,
      today,
    );

    if (existingAttendance) {
      throw new ApiError(409, "Already checked in today.");
    }

    return attendanceRepository.create({
      companyId,
      employeeId,
      date: today,
      checkIn: new Date(),
      status: ATTENDANCE_STATUS.PRESENT,
      source: ATTENDANCE_SOURCE.SELF,
      approvalStatus: APPROVAL_STATUS.PENDING,
    });
  },

  async checkOut(companyId: string, employeeId: string) {
    const today = getTodayDate();

    const attendance = await attendanceRepository.findTodayAttendance(
      companyId,
      employeeId,
      today,
    );

    if (!attendance) {
      throw new ApiError(400, "Please check in first.");
    }

    if (attendance.checkOut) {
      throw new ApiError(409, "Already checked out today.");
    }

    return attendanceRepository.update(companyId, attendance._id.toString(), {
      checkOut: new Date(),
    });
  },

  async createManualAttendance(
    companyId: string,
    adminUserId: string,
    data: ManualAttendanceInput,
  ) {
    const employee = await employeeRepository.findById(
      companyId,
      data.employeeId,
    );

    if (!employee) {
      throw new ApiError(404, "Employee not found.");
    }

    const existingAttendance = await attendanceRepository.findTodayAttendance(
      companyId,
      data.employeeId,
      data.date,
    );

    if (existingAttendance) {
      throw new ApiError(409, "Attendance already exists.");
    }

    return attendanceRepository.create({
      companyId,
      ...data,
      source: ATTENDANCE_SOURCE.MANUAL,
      approvalStatus: APPROVAL_STATUS.APPROVED,
      approvedBy: adminUserId,
      approvedAt: new Date(),
    });
  },

  async myAttendance(companyId: string, employeeId: string) {
    return attendanceRepository.findEmployeeAttendance(companyId, employeeId);
  },

  async pendingAttendance(companyId: string) {
    return attendanceRepository.findPending(companyId);
  },

  async update(
    companyId: string,
    attendanceId: string,
    data: UpdateAttendanceInput,
  ) {
    const attendance = await attendanceRepository.findById(
      companyId,
      attendanceId,
    );

    if (!attendance) {
      throw new ApiError(404, "Attendance not found.");
    }

    return attendanceRepository.update(companyId, attendanceId, data);
  },

  async approve(
    companyId: string,
    attendanceId: string,
    adminUserId: string,
    data: ApproveAttendanceInput,
  ) {
    const attendance = await attendanceRepository.findById(
      companyId,
      attendanceId,
    );

    if (!attendance) {
      throw new ApiError(404, "Attendance not found.");
    }

    return attendanceRepository.approve(
      companyId,
      attendanceId,
      adminUserId,
      data.remarks,
    );
  },

  async reject(
    companyId: string,
    attendanceId: string,
    adminUserId: string,
    data: RejectAttendanceInput,
  ) {
    const attendance = await attendanceRepository.findById(
      companyId,
      attendanceId,
    );

    if (!attendance) {
      throw new ApiError(404, "Attendance not found.");
    }

    return attendanceRepository.reject(
      companyId,
      attendanceId,
      adminUserId,
      data.remarks,
    );
  },
};

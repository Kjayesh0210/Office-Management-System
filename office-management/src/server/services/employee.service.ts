import { employeeRepository } from "@/server/repositories/employee.repository";
import {
  CreateEmployeeInput,
  UpdateEmployeeInput,
} from "@/lib/validations/employee";
import { ApiError } from "@/lib/errors/api-error";
export const employeeService = {
  async create(companyId: string, data: CreateEmployeeInput) {
    const existingEmployeeCode = await employeeRepository.findByEmployeeCode(
      companyId,
      data.employeeCode,
    );

    if (existingEmployeeCode) {
      throw new ApiError(409, "Employee code already exists.");
    }
    const existingEmail = await employeeRepository.findByEmail(
      companyId,
      data.email,
    );

    if (existingEmail) {
      throw new ApiError(409, "Employee email already exists.");
    }
    return employeeRepository.create({
      companyId,
      ...data,
    });
  },
  async findAll(companyId: string) {
    return employeeRepository.findAll(companyId);
  },
  async findById(companyId: string, employeeId: string) {
    const employee = await employeeRepository.findById(companyId, employeeId);

    if (!employee || employee.companyId.toString() !== companyId) {
      throw new ApiError(404, "Employee not found.");
    }

    return employee;
  },
  async update(
    companyId: string,
    employeeId: string,
    data: UpdateEmployeeInput,
  ) {
    const employee = await this.findById(companyId, employeeId);

    if (data.employeeCode && data.employeeCode !== employee.employeeCode) {
      const existing = await employeeRepository.findByEmployeeCode(
        companyId,
        data.employeeCode,
      );

      if (existing) {
        throw new ApiError(409, "Employee code already exists.");
      }
    }

    if (data.email && data.email !== employee.email) {
      const existing = await employeeRepository.findByEmail(
        companyId,
        data.email,
      );

      if (existing) {
        throw new ApiError(409, "Employee email already exists.");
      }
    }

    return employeeRepository.update(employeeId, data);
  },
  async delete(companyId: string, employeeId: string) {
    await this.findById(companyId, employeeId);

    return employeeRepository.delete(employeeId);
  },
};

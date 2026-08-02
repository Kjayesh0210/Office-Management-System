import { ApiError } from "@/lib/errors/api-error";
import type {
  CreateDepartmentInput,
  UpdateDepartmentInput,
} from "@/lib/validations/department";
import { departmentRepository } from "@/server/repositories/department.repository";

export const departmentService = {
  async create(companyId: string, data: CreateDepartmentInput) {
    const existingName = await departmentRepository.findByName(
      companyId,
      data.name,
    );

    if (existingName) {
      throw new ApiError(409, "Department name already exists.");
    }

    const existingCode = await departmentRepository.findByCode(
      companyId,
      data.code,
    );

    if (existingCode) {
      throw new ApiError(409, "Department code already exists.");
    }

    return departmentRepository.create({
      companyId,
      ...data,
    });
  },

  async findAll(companyId: string) {
    return departmentRepository.findAll(companyId);
  },
  
  async findById(companyId: string, departmentId: string) {
    const department = await departmentRepository.findById(
      companyId,
      departmentId,
    );

    if (!department) {
      throw new ApiError(404, "Department not found.");
    }

    return department;
  },

  async update(
    companyId: string,
    departmentId: string,
    data: UpdateDepartmentInput,
  ) {
    const department = await this.findById(companyId, departmentId);

    if (data.name && data.name !== department.name) {
      const existing = await departmentRepository.findByName(
        companyId,
        data.name,
      );

      if (existing) {
        throw new ApiError(409, "Department name already exists.");
      }
    }

    if (data.code && data.code !== department.code) {
      const existing = await departmentRepository.findByCode(
        companyId,
        data.code,
      );

      if (existing) {
        throw new ApiError(409, "Department code already exists.");
      }
    }

    const updatedDepartment = await departmentRepository.update(
      companyId,
      departmentId,
      data,
    );

    if (!updatedDepartment) {
      throw new ApiError(404, "Department not found.");
    }

    return updatedDepartment;
  },

  async delete(companyId: string, departmentId: string) {
    await this.findById(companyId, departmentId);

    const deletedDepartment = await departmentRepository.delete(
      companyId,
      departmentId,
    );

    if (!deletedDepartment) {
      throw new ApiError(404, "Department not found.");
    }

    return deletedDepartment;
  },
};

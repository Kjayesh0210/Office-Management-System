import type { ClientSession } from "mongoose";

import { connectDB } from "@/lib/db";
import Company from "@/server/models/company.model";

export interface CreateCompanyInput {
  name: string;
  companyCode: string;
  industry?: string;
}

export const companyRepository = {
  async findByCompanyCode(companyCode: string, session?: ClientSession) {
    await connectDB();

    return Company.findOne({
      companyCode,
    })
      .session(session ?? null)
      .lean();
  },

  async create(data: CreateCompanyInput, session?: ClientSession) {
    await connectDB();

    const [company] = await Company.create([data], {
      session,
    });

    return company;
  },
};

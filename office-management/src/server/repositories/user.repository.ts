import connectDB from "@/lib/db";
import User from "@/server/models/user.model";

export const userRepository = {
  async findByEmail(email: string) {
    await connectDB();
    return User.findOne({ email });
  },

  async create(data: { name: string; email: string; password: string }) {
    await connectDB();
    return User.create(data);
  },
};

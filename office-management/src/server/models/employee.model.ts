import { Schema, model, models } from "mongoose";

const employeeSchema = new Schema(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },

    employeeCode: {
      type: String,
      trim: true,
      default: null,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      default: null,
      index: true,
    },

    designation: {
      type: String,
      trim: true,
      default: "",
    },

    joiningDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  },
);

employeeSchema.index(
  {
    companyId: 1,
    employeeCode: 1,
  },
  {
    unique: true,
  },
);

employeeSchema.index(
  {
    companyId: 1,
    email: 1,
  },
  {
    unique: true,
  },
);

export const Employee = models.Employee || model("Employee", employeeSchema);

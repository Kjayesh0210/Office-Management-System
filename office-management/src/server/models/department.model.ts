import { Schema, model, models } from "mongoose";

const departmentSchema = new Schema(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

// A company cannot have two departments with the same name
departmentSchema.index(
  {
    companyId: 1,
    name: 1,
  },
  {
    unique: true,
  },
);

// A company cannot have two departments with the same code
departmentSchema.index(
  {
    companyId: 1,
    code: 1,
  },
  {
    unique: true,
  },
);

export const Department =
  models.Department || model("Department", departmentSchema);

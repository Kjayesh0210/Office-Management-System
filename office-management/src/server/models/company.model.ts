import { Schema, model, models } from "mongoose";

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    companyCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    industry: {
      type: String,
      default: "",
    },

    logoUrl: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    subscriptionPlan: {
      type: String,
      enum: ["FREE", "STARTER", "PRO", "ENTERPRISE"],
      default: "FREE",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    settings: {
      timezone: {
        type: String,
        default: "UTC",
      },

      currency: {
        type: String,
        default: "USD",
      },

      dateFormat: {
        type: String,
        default: "DD/MM/YYYY",
      },
    },
  },
  {
    timestamps: true,
  },
);

const Company = models.Company || model("Company", companySchema);

export default Company;

import { constants } from "buffer";
import { Schema, model, models, Types } from "mongoose";
import { USER_ROLES, USER_ROLE_VALUES } from "@/constants/roles";

const userSchema = new Schema(
  {
    companyId: {
      type: Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: USER_ROLE_VALUES,
      default: USER_ROLES.EMPLOYEE,
    },

    refreshTokenHash: {
      type: String,
      default: null,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLoginAt: Date,

    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      default: null,
    },

    updatedBy: {
      type: Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index(
  {
    companyId: 1,
    email: 1,
  },
  {
    unique: true,
  },
);

const User = models.User || model("User", userSchema);

export default User;

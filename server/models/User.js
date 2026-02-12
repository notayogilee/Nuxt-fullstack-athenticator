import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: [254, "Email is too long"],
      validate: {
        validator: function (v) {
          return validator.isEmail(v);
        },
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      maxlength: [128, "Password is too long"],
      select: false,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: [1, "Name must be at least 1 character"],
      maxlength: [100, "Name is too long"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
  },
  {
    strict: true, // Reject fields not in schema
    strictQuery: true, // Reject query operators not in schema
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

export default mongoose.model("User", userSchema);

import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [50, "Name must be less than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email must be unique"],
      minLength: [5, "Email must be at least 5 characters"],
      maxLength: [100, "Email must be less than 100 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters"],
      maxLength: [100, "Password must be less than 100 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    address: String,
    phone: String,
    avatar: String,
    resetPasswordAt: Date,
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcryptjs.hashSync(this.password, 10);
  next();
});

export default mongoose.model("User", userSchema);

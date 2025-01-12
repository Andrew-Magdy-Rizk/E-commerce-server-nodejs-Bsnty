import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [50, "Name must be less than 50 characters"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Category", categorySchema);

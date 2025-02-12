import mongoose from "mongoose";

const candelSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Please select product"],
    },
    description: {
      type: String,
      minLength: [20, "Description must be at least 20 characters"],
      maxLength: [2000, "Description can not exceed 2000 characters"],
    },
    type: {
      type: Number, // نوع الشامعة
      required: [true, "Type is required"],
      min: [1, "candel must be at least 1"],
      max: [7, "candel can not exceed 7"],
    },
    valid: { type: Boolean, default: true }, // سليمة ولا فاسدة
    startDate: { type: Date, required: [true, "Start date is required"] },
    endDate: { type: Date, required: [true, "End date is required"] }, // must be greater than start date
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please select customer"],
    },

    technical: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please select technical"],
    },
  },
  {
    timestamps: true,
  }
);

candelSchema.pre(/^find/, function (next) {
  this.populate({
    path: "product",
    select: "name description price category",
  });
  this.populate({
    path: "customer",
    select: "name address phone",
  });
  this.populate({
    path: "technical",
    select: "name address phone",
  });
  next();
});

export default mongoose.model("Candel", candelSchema);

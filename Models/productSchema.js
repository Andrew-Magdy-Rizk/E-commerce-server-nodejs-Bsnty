import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name must be less than 100 characters"],
    },
    description: {
      type: String,
      // required: [true, "Description is required"],
      minLength: [20, "Description must be at least 20 characters"],
      maxLength: [2000, "Description can not exceed 2000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      trim: true,
      max: [200000, "Price Can not exceed 200000"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],
    imageCover: {
      type: String,
      required: [true, "Image Cover is required"],
    },
    images: [String],
    inStock: {
      type: Boolean,
      default: true,
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Please select category"],
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name",
  });
  next();
});

export default mongoose.model("Product", productSchema);

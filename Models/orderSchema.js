import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please select customer"],
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Please select product"],
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
        },
        price: {
          type: Number,
          required: [true, "Price is required"],
        },
      },
    ],
    Date: {
      type: Date,
      default: Date.now,
    },
    address: String,
    note: String,
    phone: {
      type: String,
      maxLength: [15, "Phone must be less than 15 characters"],
    },
    // quantity is calculated
    //total is calculated
  },
  {
    timestamps: true,
  }
);

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "customer",
    select: "name address phone",
  });
  this.populate({
    path: "products.product",
    select: "name description price category",
  });
  next();
});

export default mongoose.model("Order", orderSchema);

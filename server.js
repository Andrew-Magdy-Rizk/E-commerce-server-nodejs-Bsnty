import path from "path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import ApiError from "./Utils/ApiError.js";
import GlobalError from "./Middlewares/globalErrorMiddleware.js";
import dbConnection from "./Config/dbConnection.js";

// import Routers
import categoryRouter from "./Routes/categoryRouter.js";
import productRouter from "./Routes/productRouter.js";
import userRouter from "./Routes/userRouter.js";
import authRouter from "./Routes/authRouter.js";
import candelRouter from "./Routes/candelRouter.js";
import orderRouter from "./Routes/orderRouter.js";
import compression from "compression";

// Load env vars
dotenv.config();

// db connection
dbConnection();

// Initialize express app
const app = express();

// Enable other domains to access your application
app.use(cors());
app.options("*", cors());

// compress all responses
app.use(compression());

// Set static folder
const __dirname = path.resolve();

// Middlewares
app.use(express.json({ limit: "20kb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/candels", candelRouter);
app.use("/api/v1/orders", orderRouter);

// Error handling middleware
app.all("*", (req, res, next) => {
  next(new ApiError(404, "Not found"));
});

app.use(GlobalError);

// Initialize port
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);

// Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});

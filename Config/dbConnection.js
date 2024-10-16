import mongoose from "mongoose";

const dbConnection = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

export default dbConnection;

import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Mongo Connected: ${conn.connection.host}`.bgCyan.bold);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;

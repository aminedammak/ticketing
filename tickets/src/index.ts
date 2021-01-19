import mongoose from "mongoose";
import { app } from "./app";
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI must be defined");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      /* Those options are needed to avoid some eventual errors and warnings */
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connecting to DB");
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();

import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected by :", process.env.MONGODB_URI);
  } catch (error) {
    console.log("cannot connect to mongodb cause =>: ", error);
  }
};

export default connectMongoDB;

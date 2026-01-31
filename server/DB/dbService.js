import mongoose from "mongoose";

export const connectToDb = () => {
  mongoose
    .connect(process.env.LOCAL_DB || "mongodb://127.0.0.1:27017/PortfolYou")
    .then(() => console.log("connected to MongoDb Locally!"))
    .catch((error) => console.log(`could not connect to mongoDb: ${error}`));
};
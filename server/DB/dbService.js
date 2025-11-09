import mongoose from "mongoose";

export const connectToDb = () => {
    mongoose
        .connect("mongodb://127.0.0.1:27017/PortfolYou")
        .then(() => console.log("connected to MongoDb Locally!"))
        .catch((error) => console.log(`could not connect to mongoDb: ${error}`));
};
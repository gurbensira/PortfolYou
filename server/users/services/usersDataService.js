import User from "../models/User.js";

export const createUser = async (user) => {
    try {
        const userForDb = new User(user);
        await userForDb.save();
        return userForDb;

    } catch (error) {
        console.error("Mongo error:", error);
        if (error.code === 11000 && error.keyPattern?.email) {
            throw new Error("Email already exists");
        }
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((e) => e.message);
            throw new Error(`Validation failed: ${messages.join(", ")}`);
        }
        if (
            error.name === "MongoNetworkError" ||
            error.message.includes("ECONNREFUSED")
        ) {
            throw new Error("Database connection error");
        }
        throw new Error("MongoDb - Error in creating new user");
    }
};
import Card from "../models/Card.js";

export const createCard = async (card) => {
    try {
        const cardForDb = new Card(card);
        await cardForDb.save();
        return cardForDb;

    } catch (error) {
        console.error("Mongo error:", error);
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
        throw new Error("MongoDb - Error in creating new card");
    }
};
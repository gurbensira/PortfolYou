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

export const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user;

    } catch (error) {
        console.error("Mongo error:", error);
        if (
            error.name === "MongoNetworkError" ||
            error.message.includes("ECONNREFUSED")
        ) {
            throw new Error("Database connection error");
        }
        throw new Error("MongoDb - Error in fetching user by email");
    }
};

export const getAllUsersFromDb = async (page = 1, limit = 20) => {
    try {
        const skip = (page - 1) * limit;

        const users = await User.find({ userType: { $ne: 'recruiter' }})
            .populate('following', 'name image profession address')
            .populate('followers', 'name image profession address')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const totalUsers = await User.countDocuments({ userType: { $ne: 'recruiter' } });

        return {
            users,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalUsers / limit),
                totalUsers,
                hasMore: skip + users.length < totalUsers,
                limit
            }
        };
    } catch (error) {
        console.error("Mongo error:", error);
        if (
            error.name === "MongoNetworkError" ||
            error.message.includes("ECONNREFUSED")
        ) {
            throw new Error("Database connection error");
        }
        throw new Error("MongoDb - Error in fetching users");
    }
};

export const getUserByIdFromDb = async (id) => {
    try {
        const user = await User.findById(id)
            .populate('following', 'name image profession address')
            .populate('followers', 'name image profession address');
        if (!user) {
            throw new Error("User not found");
        }
        return user;

    } catch (error) {
        console.error("Mongo error:", error);
        if (error.name === "CastError") {
            throw new Error("Invalid user ID format");
        }
        if (
            error.name === "MongoNetworkError" ||
            error.message.includes("ECONNREFUSED")
        ) {
            throw new Error("Database connection error");
        }
        if (error.message === "User not found") {
            throw error;
        }
        throw new Error("MongoDb - Error in fetching user");
    }
};

export const updateUserInDb = async (id, newUser) => {

    try {

        const userAfterUpdate = await User.findByIdAndUpdate(id, newUser, {
            new: true,
            runValidators: true,
        });


        if (!userAfterUpdate) {
            throw new Error("User not found");
        }

        return userAfterUpdate;

    } catch (error) {
        console.error("Mongo error:", error);
        if (error.name === "CastError") {
            throw new Error("Invalid user ID format");
        }
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
        if (error.message === "User not found") {
            throw error;
        }
        throw new Error("MongoDb - Error in updating user");
    }
};

export const deleteUserInDb = async (id) => {
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new Error("User not found");
        }
        return id;

    } catch (error) {
        console.error("Mongo error:", error);
        if (error.name === "CastError") {
            throw new Error("Invalid user ID format");
        }
        if (
            error.name === "MongoNetworkError" ||
            error.message.includes("ECONNREFUSED")
        ) {
            throw new Error("Database connection error");
        }
        if (error.message === "User not found") {
            throw error;
        }
        throw new Error("MongoDb - Error in deleting user");
    }
};
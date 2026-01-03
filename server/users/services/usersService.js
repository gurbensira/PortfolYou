import _ from "lodash";
import { generateToken } from "../../auth/providers/jwtProvider.js";
import { comparePassword, generatePassword } from "../helpers/bcrypt.js";
import { createUser, deleteUserInDb, getAllUsersFromDb, getUserByEmail, getUserByIdFromDb, updateUserInDb } from "./usersDataService.js";
import { validateUserLogin, validateUserRegistration, validateUserUpdate } from "../validation/userValidationService.js";
import User from "../models/User.js";

export const createNewUser = async (user, uploadedFile) => {
    try {

        if (uploadedFile) {
            user.image = {
                url: uploadedFile.path,
                alt: user.image?.alt || user.name.first || '',
            };
        }
        const { error } = validateUserRegistration(user);
        if (error) {
            throw new Error(error.details[0].message);
        }

        let hashPass = generatePassword(user.password);
        user.password = hashPass;
        const newUser = await createUser(user);
        const DTOuser = _.pick(newUser, ["email", "name", "_id", "image"]);
        return DTOuser;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const login = async (email, password) => {
    try {
        const { error } = validateUserLogin({ email, password });
        if (error) {
            throw new Error(error.details[0].message);
        }

        const user = await getUserByEmail(email);
        if (!user) {
            throw new Error("Email is incorrect");
        }

        if (!comparePassword(password, user.password)) {
            throw new Error("Password is incorrect");
        }

        return generateToken(user);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAllUsers = async () => {
    try {
        const users = await getAllUsersFromDb();
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getFullUserProfile = async (id, loggedInUser) => {
    try {
        const user = await getUserByIdFromDb(id);

        // Check authorization - only owner or admin can see full profile
        if (!loggedInUser.isAdmin && loggedInUser._id.toString() !== id) {
            throw new Error("Access denied - you can only view your own full profile");
        }

        // Return full user data (excluding password)
        const fullUser = user.toObject();
        delete fullUser.password; // Never return password, even hashed!

        return fullUser;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getPublicUserProfile = async (id) => {
    try {
        const user = await getUserByIdFromDb(id);

        // Return only public fields
        return {
            _id: user._id,
            name: user.name,
            image: user.image,
            profession: user.profession,
            address: {
                city: user.address?.city,
                country: user.address?.country
            },
            createdAt: user.createdAt
            // Add any other public portfolio fields
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateUser = async (id, newUser, userId) => {

    try {
        const existingUser = await getUserByIdFromDb(id);

        // Check authorization
        if (existingUser._id.toString() !== userId.toString()) {
            throw new Error("Access denied - you can only edit your own user");
        }

        // Validate update data
        const { error } = validateUserUpdate(newUser);
        if (error) {
            throw new Error(error.details[0].message);
        }

        // If password is being updated, hash it
        if (newUser.password) {
            newUser.password = generatePassword(newUser.password);
        }

        const modifiedUser = await updateUserInDb(userId, newUser);
        return modifiedUser;

    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteUser = async (id) => {
    try {
        const userToDelete = await getUserByIdFromDb(id);
        await User.deleteMany({ user_id: id });
        const deletedUserId = await deleteUserInDb(id);
        return {
            id: deletedUserId,
            name: userToDelete.name
        };
    } catch (error) {
        throw new Error(error.message);
    }
};
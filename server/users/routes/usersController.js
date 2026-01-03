import express from "express";
import { createNewUser, deleteUser, getAllUsers, getFullUserProfile, getPublicUserProfile, login, updateUser } from "../services/usersService.js";
import { uploadSingle } from "../../middlewares/uploadMiddleware.js";
import { auth, optionalAuth } from "../../auth/services/authService.js"


const router = express.Router();

router.post("/", uploadSingle, async (req, res) => {
    try {
        const newUser = req.body;
        const uploadedFile = req.file;
        const user = await createNewUser(newUser, uploadedFile);
        res.status(201).send(user);
    } catch (error) {
        console.error(error)
        res.status(400).send(error.message);
    }
});

router.post("/login", async (req, res) => {
    try {
        const { password, email } = req.body;
        const token = await login(email, password);
        res.send(token);
    } catch (error) {
        console.error(error)
        res.status(401).send(error.message);
    }
});

router.get("/", async (req, res) => {
    try {
        const allUsers = await getAllUsers();
        res.send(allUsers);
    } catch (error) {
        console.error("Error getting all users:", error);
        res.status(500).send(error.message);
    }
});

router.get("/:id", optionalAuth, async (req, res) => {
    try {
        const { id } = req.params;

        const loggedInUser = req.user; // Will be null if not authenticated

        let user;

        // If user is authenticated AND (viewing own profile OR is admin)
        if (loggedInUser && (loggedInUser._id === id || loggedInUser.isAdmin)) {
            user = await getFullUserProfile(id, loggedInUser);
        } else {
            // Otherwise, return public profile only
            user = await getPublicUserProfile(id);
        }
        res.send(user);
    } catch (error) {
        console.error("Error getting user:", error);

        if (error.message === "User not found") {
            return res.status(404).send(error.message);
        }
        if (error.message === "Invalid user ID format") {
            return res.status(400).send(error.message);
        }
        if (error.message.includes("Access denied")) {
            return res.status(403).send(error.message);
        }
        res.status(500).send(error.message);
    }
});

router.put("/:id", auth, uploadSingle, async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const newUser = req.body;

        const modifiedUser = await updateUser(id, newUser, user._id);
        console.log(modifiedUser);

        res.send(modifiedUser);
    } catch (error) {
        console.error("Error updating user:", error);

        if (error.message === "User not found") {
            return res.status(404).send(error.message);
        }
        if (error.message === "Invalid user ID format") {
            return res.status(400).send(error.message);
        }
        if (error.message.includes("Access denied")) {
            return res.status(403).send(error.message);
        }
        if (error.message.includes("Validation failed") || error.message.includes("Email already exists") || error.message.includes("must")) {
            return res.status(400).send(error.message);
        }

        res.status(500).send(error.message);
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;

        if (!user.isAdmin && user._id !== id) {
            return res.status(403).send("Only admin or account owner can delete user");
        }

        const deletedUser = await deleteUser(id);
        res.send(`User ${deletedUser.name} deleted successfully`);
    } catch (error) {
        console.error("Error deleting user:", error);

        if (error.message === "User not found") {
            return res.status(404).send(error.message);
        }
        if (error.message === "Invalid user ID format") {
            return res.status(400).send(error.message);
        }

        res.status(500).send(error.message);
    }
});

export default router;
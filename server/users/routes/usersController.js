import express from "express";
import { createNewUser, login } from "../services/usersService.js";
import { uploadSingle } from "../../middlewares/uploadMiddleware.js";


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

export default router;
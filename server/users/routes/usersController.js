import express from "express";
import { createNewUser } from "../services/usersService.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const newUser = req.body;
        const user = await createNewUser(newUser);
        res.status(201).send(user);
    } catch (error) {
        console.error(error)
        res.status(400).send(error.message);
    }
});

export default router;
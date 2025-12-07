import express from "express";
import { createNewCard } from "../services/cardsService.js";
import { auth } from "../../auth/services/authService.js";
import { uploadSingle } from "../../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/", auth, uploadSingle, async (req, res) => {
    try {
        const newCard = req.body;
        const user = req.user;

        if (!user) {
            return res.status(403).send("Only registered user can create project cards");
        }

        const uploadedFile = req.file;
        const card = await createNewCard(newCard, user._id, uploadedFile);

        res.status(201).send(card);
    } catch (error) {
        console.error("Error creating card:", error);
        res.status(400).send(error.message);
    }
});

export default router;
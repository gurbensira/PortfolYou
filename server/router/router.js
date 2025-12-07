import express from "express";

import usersController from "../users/routes/usersController.js";
import projectCardsController from "../projectCards/routes/projectCardsController.js";


const router = express.Router();


router.use("/users", usersController);
router.use("/projectCards", projectCardsController)

router.use((req, res) => {
    res.status(404).send("Path not found");
});

export default router;

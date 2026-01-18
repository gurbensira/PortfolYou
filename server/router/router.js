import express from "express";

import usersController from "../users/routes/usersController.js";
import projectCardsController from "../projectCards/routes/projectCardsController.js";
import jobsController from "../jobs/routes/jobsController.js";
import recruitersController from "../users/routes/recruitersController.js"; 



const router = express.Router();


router.use("/users", usersController);
router.use("/projectCards", projectCardsController);
router.use("/jobs", jobsController);
router.use("/recruiters", recruitersController);

router.use((req, res) => {
    res.status(404).send("Path not found");
});

export default router;

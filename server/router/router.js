import express from "express";
// import projectsController from "../cards/routes/projectsController.js";
import usersController from "../users/routes/usersController.js";

const router = express.Router();

// router.use("/projects", projectsController);
router.use("/users", usersController);

router.use((req, res) => {
    res.status(404).send("Path not found");
});

export default router;

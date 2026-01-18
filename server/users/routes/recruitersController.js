import express from "express";
import { 
    createNewRecruiter, 
    getAllRecruiters, 
    getRecruiterProfile, 
    updateRecruiter 
} from "../services/recruitersService.js";
import { uploadSingle } from "../../middlewares/uploadMiddleware.js";
import { auth } from "../../auth/services/authService.js";

const router = express.Router();

// Register new recruiter
router.post("/", uploadSingle, async (req, res) => {
    try {
        const recruiterData = req.body;
        const uploadedFile = req.file;
        const recruiter = await createNewRecruiter(recruiterData, uploadedFile);
        res.status(201).send(recruiter);
    } catch (error) {
        console.error("Recruiter registration error:", error);
        res.status(400).send(error.message);
    }
});

// Get all recruiters
router.get("/", async (req, res) => {
    try {
        const recruiters = await getAllRecruiters();
        res.send(recruiters);
    } catch (error) {
        console.error("Error getting recruiters:", error);
        res.status(500).send(error.message);
    }
});

// Get single recruiter profile
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const recruiter = await getRecruiterProfile(id);
        res.send(recruiter);
    } catch (error) {
        console.error("Error getting recruiter:", error);

        if (error.message === "User not found") {
            return res.status(404).send(error.message);
        }
        if (error.message === "Invalid user ID format") {
            return res.status(400).send(error.message);
        }
        if (error.message === "User is not a recruiter") {
            return res.status(400).send(error.message);
        }
        res.status(500).send(error.message);
    }
});

// Update recruiter profile
router.put("/:id", auth, uploadSingle, async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const newRecruiterData = req.body;

        // Handle uploaded file
        if (req.file) {
            newRecruiterData.image = {
                url: req.file.path,
                alt: newRecruiterData.image?.alt || 'recruiter profile image',
            };
        }

        const isAdminUser = user.userType === 'admin' || user.isAdmin;
        const modifiedRecruiter = await updateRecruiter(id, newRecruiterData, user._id, isAdminUser);
        
        res.send(modifiedRecruiter);
    } catch (error) {
        console.error("Error updating recruiter:", error);

        if (error.message === "User not found") {
            return res.status(404).send(error.message);
        }
        if (error.message === "Invalid user ID format") {
            return res.status(400).send(error.message);
        }
        if (error.message.includes("Access denied")) {
            return res.status(403).send(error.message);
        }
        if (error.message === "User is not a recruiter") {
            return res.status(400).send(error.message);
        }

        res.status(500).send(error.message);
    }
});

export default router;
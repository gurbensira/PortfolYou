import express from "express";
import { 
    createNewJob, 
    deleteJob, 
    getAllJobs, 
    getJobById, 
    getRecruiterJobs, 
    toggleJobActiveStatus, 
    updateJob 
} from "../services/jobsService.js";
import { getJobByIdFromDb } from "../services/jobsDataService.js";
import { auth, isRecruiter, isRecruiterOrAdmin } from "../../auth/services/authService.js";

const router = express.Router();

// Create new job (recruiter only)
router.post("/", auth, isRecruiter, async (req, res) => {
    try {
        const newJob = req.body;
        const user = req.user;

        if (!user) {
            return res.status(403).send("Only recruiters can create job postings");
        }

        // Get company name from user's recruiterInfo
        const companyName = user.recruiterInfo?.companyName || "Unknown Company";
        
        const job = await createNewJob(newJob, user._id, companyName);
        res.status(201).send(job);
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(400).send(error.message);
    }
});

// Get all jobs (public)
router.get("/", async (req, res) => {
    try {
        const allJobs = await getAllJobs();
        res.send(allJobs);
    } catch (error) {
        console.error("Error getting all jobs:", error);
        res.status(500).send(error.message);
    }
});

// Get jobs by recruiter ID (public)
router.get("/company/:recruiterId", async (req, res) => {
    try {
        const { recruiterId } = req.params;
        const recruiterJobs = await getRecruiterJobs(recruiterId);
        res.send(recruiterJobs);
    } catch (error) {
        console.error("Error getting recruiter jobs:", error);

        if (error.message === "Invalid recruiter ID format") {
            return res.status(400).send(error.message);
        }

        res.status(500).send(error.message);
    }
});

// Get single job by ID (public)
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const job = await getJobById(id);
        res.send(job);
    } catch (error) {
        console.error("Error getting job:", error);

        if (error.message === "Job not found") {
            return res.status(404).send(error.message);
        }
        if (error.message === "Invalid job ID format") {
            return res.status(400).send(error.message);
        }

        res.status(500).send(error.message);
    }
});

// Update job (owner or admin only)
router.put("/:id", auth, isRecruiterOrAdmin, async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const newJob = req.body;

        const isAdminUser = user.userType === 'admin' || user.isAdmin;
        const modifiedJob = await updateJob(id, newJob, user._id, isAdminUser);
        
        res.send(modifiedJob);
    } catch (error) {
        console.error("Error updating job:", error);

        if (error.message === "Job not found") {
            return res.status(404).send(error.message);
        }
        if (error.message === "Invalid job ID format") {
            return res.status(400).send(error.message);
        }
        if (error.message.includes("Access denied")) {
            return res.status(403).send(error.message);
        }

        res.status(400).send(error.message);
    }
});

// Delete job (owner or admin only)
router.delete("/:id", auth, isRecruiterOrAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;

        const job = await getJobByIdFromDb(id);
        const isAdminUser = user.userType === 'admin' || user.isAdmin;
        const isOwner = job.postedBy.toString() === user._id;

        if (!isAdminUser && !isOwner) {
            return res.status(403).send("Only admin or job owner can delete it");
        }

        await deleteJob(id, user._id, isAdminUser);
        res.send("Job deleted successfully");
    } catch (error) {
        console.error("Error deleting job:", error);

        if (error.message === "Job not found") {
            return res.status(404).send(error.message);
        }
        if (error.message === "Invalid job ID format") {
            return res.status(400).send(error.message);
        }

        res.status(500).send(error.message);
    }
});

// Toggle job active status (owner or admin only)
router.patch("/:id/toggle-active", auth, isRecruiterOrAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;

        const isAdminUser = user.userType === 'admin' || user.isAdmin;
        const updatedJob = await toggleJobActiveStatus(id, user._id, isAdminUser);
        
        res.send(updatedJob);
    } catch (error) {
        console.error("Error toggling job status:", error);

        if (error.message === "Job not found") {
            return res.status(404).send(error.message);
        }
        if (error.message === "Invalid job ID format") {
            return res.status(400).send(error.message);
        }
        if (error.message.includes("Access denied")) {
            return res.status(403).send(error.message);
        }

        res.status(500).send(error.message);
    }
});

export default router;
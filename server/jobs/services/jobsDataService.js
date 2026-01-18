import JobPosting from "../models/JobPosting.js";

export const createJob = async (job) => {
    try {
        const jobForDb = new JobPosting(job);
        await jobForDb.save();
        return jobForDb;
    } catch (error) {
        console.error("Mongo error:", error);
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((e) => e.message);
            throw new Error(`Validation failed: ${messages.join(", ")}`);
        }
        if (
            error.name === "MongoNetworkError" ||
            error.message.includes("ECONNREFUSED")
        ) {
            throw new Error("Database connection error");
        }
        throw new Error("MongoDb - Error in creating new job");
    }
};

export const getAllJobsFromDb = async () => {
    try {
        const jobs = await JobPosting.find({ isActive: true })
            .populate('postedBy', 'name email recruiterInfo')
            .sort({ createdAt: -1 });
        return jobs;
    } catch (error) {
        console.error("Mongo error:", error);
        if (
            error.name === "MongoNetworkError" ||
            error.message.includes("ECONNREFUSED")
        ) {
            throw new Error("Database connection error");
        }
        throw new Error("MongoDb - Error in fetching jobs");
    }
};

export const getJobByIdFromDb = async (id) => {
    try {
        const job = await JobPosting.findById(id)
            .populate('postedBy', 'name email phone recruiterInfo');
        
        if (!job) {
            throw new Error("Job not found");
        }
        return job;
    } catch (error) {
        console.error("Mongo error:", error);
        if (error.name === "CastError") {
            throw new Error("Invalid job ID format");
        }
        if (
            error.name === "MongoNetworkError" ||
            error.message.includes("ECONNREFUSED")
        ) {
            throw new Error("Database connection error");
        }
        if (error.message === "Job not found") {
            throw error;
        }
        throw new Error("MongoDb - Error in fetching job");
    }
};

export const updateJobInDb = async (id, newJob) => {
    try {
        const jobAfterUpdate = await JobPosting.findByIdAndUpdate(id, newJob, {
            new: true,
            runValidators: true,
        });
        
        if (!jobAfterUpdate) {
            throw new Error("Job not found");
        }
        return jobAfterUpdate;
    } catch (error) {
        console.error("Mongo error:", error);
        if (error.name === "CastError") {
            throw new Error("Invalid job ID format");
        }
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((e) => e.message);
            throw new Error(`Validation failed: ${messages.join(", ")}`);
        }
        if (
            error.name === "MongoNetworkError" ||
            error.message.includes("ECONNREFUSED")
        ) {
            throw new Error("Database connection error");
        }
        if (error.message === "Job not found") {
            throw error;
        }
        throw new Error("MongoDb - Error in updating job");
    }
};

export const deleteJobInDb = async (id) => {
    try {
        const deletedJob = await JobPosting.findByIdAndDelete(id);
        if (!deletedJob) {
            throw new Error("Job not found");
        }
        return id;
    } catch (error) {
        console.error("Mongo error:", error);
        if (error.name === "CastError") {
            throw new Error("Invalid job ID format");
        }
        if (
            error.name === "MongoNetworkError" ||
            error.message.includes("ECONNREFUSED")
        ) {
            throw new Error("Database connection error");
        }
        if (error.message === "Job not found") {
            throw error;
        }
        throw new Error("MongoDb - Error in deleting job");
    }
};

export const getJobsByRecruiterIdFromDb = async (recruiterId) => {
    try {
        const jobs = await JobPosting.find({ postedBy: recruiterId })
            .sort({ createdAt: -1 });
        return jobs;
    } catch (error) {
        console.error("Mongo error:", error);
        if (error.name === "CastError") {
            throw new Error("Invalid recruiter ID format");
        }
        if (
            error.name === "MongoNetworkError" ||
            error.message.includes("ECONNREFUSED")
        ) {
            throw new Error("Database connection error");
        }
        throw new Error("MongoDb - Error in fetching recruiter jobs");
    }
};
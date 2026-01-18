import { validateJobCreation, validateJobUpdate } from "../validation/jobValidationService.js";
import {
    createJob,
    deleteJobInDb,
    getAllJobsFromDb,
    getJobByIdFromDb,
    getJobsByRecruiterIdFromDb,
    updateJobInDb,
} from "./jobsDataService.js";

export const createNewJob = async (job, recruiterId, companyName) => {
    
    try {
        job.postedBy = recruiterId;
        job.companyName = companyName;
        job.isActive = true;

        const { error } = validateJobCreation(job);
        if (error) {
            throw new Error(error.details[0].message);
        }

        const newJob = await createJob(job);
        
        // Populate recruiter info
        const populatedJob = await getJobByIdFromDb(newJob._id);
        return populatedJob;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAllJobs = async () => {
    try {
        const jobs = await getAllJobsFromDb();
        return jobs;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getJobById = async (id) => {
    try {
        const job = await getJobByIdFromDb(id);
        
        // Increment view count
        job.views = (job.views || 0) + 1;
        await updateJobInDb(id, { views: job.views });
        
        return job;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateJob = async (jobId, newJob, userId, isAdmin) => {
    try {
        const existingJob = await getJobByIdFromDb(jobId);

        // Check authorization
        const isOwner = existingJob.postedBy._id.toString() === userId.toString();
        
        if (!isOwner && !isAdmin) {
            throw new Error("Access denied - you can only edit your own jobs");
        }

        const { error } = validateJobUpdate(newJob);
        if (error) {
            throw new Error(error.details[0].message);
        }

        newJob.updatedAt = Date.now();
        const modifiedJob = await updateJobInDb(jobId, newJob);
        return modifiedJob;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteJob = async (jobId, userId, isAdmin) => {
    try {
        const existingJob = await getJobByIdFromDb(jobId);

        // Check authorization
        const isOwner = existingJob.postedBy._id.toString() === userId.toString();
        
        if (!isOwner && !isAdmin) {
            throw new Error("Access denied - you can only delete your own jobs");
        }

        const idOfDeletedJob = await deleteJobInDb(jobId);
        return idOfDeletedJob;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getRecruiterJobs = async (recruiterId) => {
    try {
        const jobs = await getJobsByRecruiterIdFromDb(recruiterId);
        return jobs;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const toggleJobActiveStatus = async (jobId, userId, isAdmin) => {
    try {
        const existingJob = await getJobByIdFromDb(jobId);

        // Check authorization
        const isOwner = existingJob.postedBy._id.toString() === userId.toString();
        
        if (!isOwner && !isAdmin) {
            throw new Error("Access denied - you can only modify your own jobs");
        }

        const newStatus = !existingJob.isActive;
        const updatedJob = await updateJobInDb(jobId, { isActive: newStatus });
        
        return updatedJob;
    } catch (error) {
        throw new Error(error.message);
    }
};
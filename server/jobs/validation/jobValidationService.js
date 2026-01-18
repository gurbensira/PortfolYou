import { jobCreationSchema, jobUpdateSchema } from "./jobValidationSchema.js";

export const validateJobCreation = (job) => {
    return jobCreationSchema.validate(job);
};

export const validateJobUpdate = (job) => {
    return jobUpdateSchema.validate(job);
};
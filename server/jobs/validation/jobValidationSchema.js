import Joi from "joi";

const urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

export const jobCreationSchema = Joi.object({
    title: Joi.string().min(5).max(256).required(),
    description: Joi.string().min(20).max(5000).required(),
    requirements: Joi.array().items(Joi.string()).min(1).required(),
    responsibilities: Joi.array().items(Joi.string()).min(1).required(),
    techStack: Joi.array().items(Joi.string()).min(1).required(),
    experienceLevel: Joi.string()
        .valid('Junior', 'Mid', 'Senior', 'Lead', 'Any')
        .required(),
    location: Joi.string().min(2).max(256).required(),
    locationType: Joi.string()
        .valid('Remote', 'Hybrid', 'On-site')
        .required(),
    salaryRange: Joi.object({
        min: Joi.number().min(0).allow(null),
        max: Joi.number().min(0).allow(null),
        currency: Joi.string().default('USD'),
    }).allow(null),
    employmentType: Joi.string()
        .valid('Full-time', 'Part-time', 'Contract', 'Internship')
        .required(),
    applicationUrl: Joi.string()
        .ruleset.regex(urlRegex)
        .rule({ message: 'applicationUrl must be a valid url' })
        .required(),
        postedBy: Joi.string().allow(""),
        companyName:Joi.string().min(2).max(256).required(),
        isActive:Joi.boolean(),
});

export const jobUpdateSchema = Joi.object({
    title: Joi.string().min(5).max(256),
    description: Joi.string().min(20).max(5000),
    requirements: Joi.array().items(Joi.string()).min(1),
    responsibilities: Joi.array().items(Joi.string()).min(1),
    techStack: Joi.array().items(Joi.string()).min(1),
    experienceLevel: Joi.string()
        .valid('Junior', 'Mid', 'Senior', 'Lead', 'Any'),
    location: Joi.string().min(2).max(256),
    locationType: Joi.string()
        .valid('Remote', 'Hybrid', 'On-site'),
    salaryRange: Joi.object({
        min: Joi.number().min(0).allow(null),
        max: Joi.number().min(0).allow(null),
        currency: Joi.string(),
    }).allow(null),
    employmentType: Joi.string()
        .valid('Full-time', 'Part-time', 'Contract', 'Internship'),
    applicationUrl: Joi.string()
        .ruleset.regex(urlRegex)
        .rule({ message: 'applicationUrl must be a valid url' }),
    isActive: Joi.boolean(),
}).min(1); 
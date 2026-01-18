import userRegistrationSchema, { userLoginSchema, userUpdateSchema, recruiterRegistrationSchema   } from "./userValidationSchema.js";

export const validateUserRegistration = (user) => {
    return userRegistrationSchema.validate(user);
};

export const validateUserLogin = (credentials) => {
    return userLoginSchema.validate(credentials);
};

export const validateUserUpdate = (user) => {
    return userUpdateSchema.validate(user);
};

export const validateRecruiterRegistration = (recruiter) => {
    return recruiterRegistrationSchema.validate(recruiter);
};
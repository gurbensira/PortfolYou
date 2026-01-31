import _ from "lodash";
import { generatePassword } from "../helpers/bcrypt.js";
import { createUser, getUserByIdFromDb, updateUserInDb } from "./usersDataService.js";
import { validateRecruiterRegistration } from "../validation/userValidationService.js";
import User from "../models/User.js";

export const createNewRecruiter = async (recruiter, uploadedFile) => {
    
    try {
        if (uploadedFile) {
            recruiter.image = {
                url: uploadedFile.path,
                alt: recruiter.image?.alt || recruiter.name.first || '',
            };
        }

        const { error } = validateRecruiterRegistration(recruiter);
        if (error) {
            throw new Error(error.details[0].message);
        }

        let hashPass = generatePassword(recruiter.password);
        recruiter.password = hashPass;
        recruiter.userType = 'recruiter'; 
        recruiter.isAdmin = false;

        const newRecruiter = await createUser(recruiter);
        const DTORecruiter = _.pick(newRecruiter, [
            "email", 
            "name", 
            "_id", 
            "image", 
            "userType", 
            "recruiterInfo"
        ]);
        return DTORecruiter;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAllRecruiters = async () => {
    try {
        const recruiters = await User.find({ userType: 'recruiter' })
            .populate('following', 'name image')
            .populate('followers', 'name image')
            .sort({ createdAt: -1 })
            .select('-password');

        return recruiters;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getRecruiterProfile = async (id) => {
    try {
        const recruiter = await getUserByIdFromDb(id);

        if (recruiter.userType !== 'recruiter') {
            throw new Error("User is not a recruiter");
        }

        const recruiterData = recruiter.toObject();
        delete recruiterData.password;

        return recruiterData;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateRecruiter = async (id, newRecruiterData, userId, isAdmin) => {
    try {
        const existingRecruiter = await getUserByIdFromDb(id);

        if (existingRecruiter.userType !== 'recruiter') {
            throw new Error("User is not a recruiter");
        }

        if (!isAdmin && existingRecruiter._id.toString() !== userId.toString()) {
            throw new Error("Access denied - you can only edit your own profile");
        }

        const allowedUpdates = ['name', 'phone', 'image', 'recruiterInfo'];
        const updates = {};
        
        allowedUpdates.forEach(field => {
            if (newRecruiterData[field] !== undefined) {
                updates[field] = newRecruiterData[field];
            }
        });

        delete updates.userType;
        delete updates.email;
        delete updates.password;
        delete updates.isAdmin;

        const modifiedRecruiter = await updateUserInDb(id, updates);
        
        const recruiterResponse = modifiedRecruiter.toObject();
        delete recruiterResponse.password;
        
        return recruiterResponse;
    } catch (error) {
        throw new Error(error.message);
    }
};
import _ from "lodash";
import { generateToken } from "../../auth/providers/jwtProvider.js";
import { comparePassword, generatePassword } from "../helpers/bcrypt.js";
import { createUser, getUserByEmail } from "./usersDataService.js";
import { validateUserLogin, validateUserRegistration } from "../validation/userValidationService.js";

export const createNewUser = async (user, uploadedFile) => {
    try {

        if (uploadedFile) {
            user.image = {
                url: uploadedFile.path,
                alt: user.image?.alt || user.name.first || '',
            };
        }
        const { error } = validateUserRegistration(user);
        if (error) {
            throw new Error(error.details[0].message);
        }

        let hashPass = generatePassword(user.password);
        user.password = hashPass;
        const newUser = await createUser(user);
        const DTOuser = _.pick(newUser, ["email", "name", "_id", "image"]);
        return DTOuser;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const login = async (email, password) => {
    try {
        const { error } = validateUserLogin({ email, password });
        if (error) {
            throw new Error(error.details[0].message);
        }

        const user = await getUserByEmail(email);
        if (!user) {
            throw new Error("Email is incorrect");
        }

        if (!comparePassword(password, user.password)) {
            throw new Error("Password is incorrect");
        }

        return generateToken(user);
    } catch (error) {
        throw new Error(error.message);
    }
};
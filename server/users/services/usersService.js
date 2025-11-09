import _ from "lodash";
import { generatePassword } from "../helpers/bcrypt.js";
import { createUser } from "./usersDataService.js";
import { validateUserRegistration } from "../validation/userValidationService.js";

export const createNewUser = async (user) => {
    try {
        const { error } = validateUserRegistration(user);
        if (error) {
            throw new Error(error.details[0].message);
        }

        let hashPass = generatePassword(user.password);
        user.password = hashPass;
        const newUser = await createUser(user);
        const DTOuser = _.pick(newUser, ["email", "name", "_id"]);
        return DTOuser;
    } catch (error) {
        throw new Error(error.message);
    }
};
import {IUser, user_model} from "./models/user_model";

const getUserByEmail = async (email: string): Promise<IUser> => {
    return user_model.findOne({email});
}

const registerUser = async (email: string, name: string, password: string): Promise<void> => {
    await user_model.create({email, name, password});
}

export default {
    getUserByEmail,
    registerUser
}

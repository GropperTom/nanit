import authRepo from "./repository"
import adminRepo from "../admin/repository"
import bcrypt from "bcryptjs";

const registerNewUser = async (name: string, email: string, password: string): Promise<boolean> => {
    const user = await authRepo.getUserByEmail(email);
    if(user) {
        return false;
    }
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    await authRepo.registerUser(email, name, encryptedPassword);
    await adminRepo.addUser(email, name);
    return true;
}

const login = async (password: string, email: string): Promise<boolean> => {
    const user = await authRepo.getUserByEmail(email);
    if(!user) {
        return false;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
}

export default {
    login,
    registerNewUser
}

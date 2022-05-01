import {AdminModel, IAdmin} from "./models/AdminModel";

const getAllAdmins = async (): Promise<IAdmin[]> => {
    return AdminModel.find({});
};

const getMe = async (email: string): Promise<IAdmin> => {
    return AdminModel.findOne({email});
}

const setStatus = async (status: string, email: string): Promise<void> => {
    await AdminModel.findOneAndUpdate({email}, {$set: {status}});
    }

const addUser = async (email: string, name: string): Promise<void> => {
    const status = "WORKING";
    await AdminModel.create({email, name, status});
}

export default {
    getMe,
    getAllAdmins,
    addUser,
    setStatus
}

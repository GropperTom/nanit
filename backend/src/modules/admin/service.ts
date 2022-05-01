import {IAdmin, AdminModel, adminSchema} from "./models/AdminModel";
import adminRepo from "./repository"

const getMe = async (email: string): Promise<IAdmin> => {
    return await adminRepo.getMe(email)
}

const getAllAdmins = async (): Promise<IAdmin[]> => {
    return await adminRepo.getAllAdmins()
}

const setStatus = async (newStatus: string, email: string): Promise<any> => {
    await adminRepo.setStatus(newStatus, email);
}

const fillDbWithMock = async (): Promise<any> => {
    const newRecords: IAdmin[] = [...Array(20).keys()].map(i => {
        const randomType = ["WORKING", "ON_VACATION", "LUNCH_TIME", "BUSINESS_TRIP"][Math.floor(Math.random() * 4)];

        return new AdminModel({
            email: i.toString() + "@" + i.toString() + ".com",
            name: i.toString(),
            status: randomType
        });
    });

    // Recreate collection with newly generated records
    await AdminModel.insertMany(newRecords);
}

export default {
    getMe,
    getAllAdmins,
    setStatus,
    fillDbWithMock
}

import UserDaoI from "../interfaces/UserDaoI";
import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import AccountType from "../models/AccountType";
import MaritalStatus from "../models/MaritalStatus";

export default class UserDao implements UserDaoI {
    async findAllUsers(): Promise<User[]> {
        const userMongooseModels = await UserModel.find();
        return userMongooseModels
            .map((userMongooseModel) => {
                return new User(
                    userMongooseModel?._id.toString() ?? '',
                    userMongooseModel?.username ?? '',
                    userMongooseModel?.password ?? '',
                    userMongooseModel?.firstName ?? '',
                    userMongooseModel?.lastName ?? '',
                    userMongooseModel?.email ?? '',
                    userMongooseModel?.profilePhoto ?? '',
                    userMongooseModel?.headerImage ?? '',
                    userMongooseModel?.accountType ?? AccountType.Personal,
                    userMongooseModel?.maritalStatus ?? MaritalStatus.Single,
                    userMongooseModel?.biography ?? '',
                    userMongooseModel?.dateOfBirth ?? new Date(),
                    userMongooseModel?.joined ?? new Date(),
                    userMongooseModel?.location ?? {}
                );
            });
    }
    async findUserById(uid: string): Promise<User> {
        const userMongooseModel = await UserModel.findById(uid);
        return new User(
            userMongooseModel?._id.toString()??'',
            userMongooseModel?.username??'',
            userMongooseModel?.password??'',
            userMongooseModel?.firstName??'',
            userMongooseModel?.lastName??'',
            userMongooseModel?.email??'',
            userMongooseModel?.profilePhoto??'',
            userMongooseModel?.headerImage??'',
            userMongooseModel?.accountType?? AccountType.Personal,
            userMongooseModel?.maritalStatus?? MaritalStatus.Single,
            userMongooseModel?.biography??'',
            userMongooseModel?.dateOfBirth??new Date(),
            userMongooseModel?.joined??new Date(),
            userMongooseModel?.location??{}
        );
    }
    async createUser(user: User): Promise<User> {
        const userMongooseModel = await UserModel.create(user);
        return new User(
            userMongooseModel?._id.toString()??'',
            userMongooseModel?.username??'',
            userMongooseModel?.password??'',
            userMongooseModel?.firstName??'',
            userMongooseModel?.lastName??'',
            userMongooseModel?.email??'',
            userMongooseModel?.profilePhoto??'',
            userMongooseModel?.headerImage??'',
            userMongooseModel?.accountType?? AccountType.Personal,
            userMongooseModel?.maritalStatus?? MaritalStatus.Single,
            userMongooseModel?.biography??'',
            userMongooseModel?.dateOfBirth??new Date(),
            userMongooseModel?.joined??new Date(),
            userMongooseModel?.location??{}
        );
    }
    async deleteUser(uid: string):  Promise<any> {
        return await UserModel.deleteOne({_id: uid});
    }
    async updateUser(uid: string, user: User): Promise<any> {
        return UserModel.updateOne({_id: uid}, {
            $set: user
        });
    }
}
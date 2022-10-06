import TuitDaoI from "../interfaces/TuitDaoI";
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";

export default class TuitDao implements TuitDaoI {
    async createTuit(tuit: Tuit): Promise<Tuit> {
        const tuitMongooseModel = await TuitModel.create(tuit);
        return new Tuit(
            tuitMongooseModel?._id.toString() ?? '',
            tuitMongooseModel?.tuit.toString() ?? ''
        );
    }

    async deleteTuit(tid: string): Promise<any> {
        return await TuitModel.deleteOne({_id: tid});
    }

    async findAllTuits(): Promise<Tuit[]> {
        const tuitMongooseModel = await TuitModel.find();
        const tuitModels = tuitMongooseModel
            .map((tuitMongooseModel) => {
                return new Tuit(
                    tuitMongooseModel?._id.toString() ?? '',
                    tuitMongooseModel?.tuit.toString() ?? ''
                )
            });
        return tuitModels;
    }

    async findTuitById(tid: string): Promise<Tuit> {
        const tuitMongooseModel = await TuitModel.findById(tid);
        return new Tuit(
            tuitMongooseModel?._id.toString() ?? '',
            tuitMongooseModel?.tuit.toString() ?? ''
        )
    }

    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        const tuitMongooseModel = await TuitModel.find({postedBy: uid});
        const tuitModels = tuitMongooseModel
            .map((tuitMongooseModel) => {
                return new Tuit(
                    tuitMongooseModel?._id.toString() ?? '',
                    tuitMongooseModel?.tuit.toString() ?? ''
                )
            });
        return tuitModels;
    }

    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return await TuitModel.updateOne({_id: tid}, {$set: {
            tuit: tuit.tuitString,
            }});
    }

}
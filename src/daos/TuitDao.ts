import TuitDaoI from "../interfaces/TuitDaoI";
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";

export default class TuitDao implements TuitDaoI {
    async createTuit(tuit: Tuit): Promise<Tuit> {
        const tuitMongooseModel = await TuitModel.create(tuit);
        return new Tuit(
            tuitMongooseModel?._id.toString() ?? '',
            tuitMongooseModel?.tuit.toString() ?? '',
            tuitMongooseModel?.postedOn ?? undefined,
            tuitMongooseModel?.postedBy ?? undefined
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
                    tuitMongooseModel?.tuit.toString() ?? '',
                    tuitMongooseModel?.postedOn ?? undefined,
                    tuitMongooseModel?.postedBy ?? undefined
                )
            });
        return tuitModels;
    }

    async findTuitById(tid: string): Promise<Tuit> {
        const tuitMongooseModel = await TuitModel.findById(tid);
        return new Tuit(
            tuitMongooseModel?._id.toString() ?? '',
            tuitMongooseModel?.tuit.toString() ?? '',
            tuitMongooseModel?.postedOn ?? undefined,
            tuitMongooseModel?.postedBy ?? undefined
        )
    }

    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        const tuitMongooseModel = await TuitModel.find({postedBy: uid});
        const tuitModels = tuitMongooseModel
            .map((tuitMongooseModel) => {
                return new Tuit(
                    tuitMongooseModel?._id.toString() ?? '',
                    tuitMongooseModel?.tuit.toString() ?? '',
                    tuitMongooseModel?.postedOn ?? undefined,
                    tuitMongooseModel?.postedBy ?? undefined
                )
            });
        return tuitModels;
    }

    async updateTuit(tid: string, tuitObject: any): Promise<any> {
        // Here, a Tuit object is not used as parameter since it's not possible to use its getter
        // to fetch the tuit attribute. Tried it but it returned undefined.
        return await TuitModel.updateOne({_id: tid}, {
            $set: {
                tuit: tuitObject.tuit,
            }
        });
    }

}
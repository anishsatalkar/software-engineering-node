/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose DislikeModel
 * to integrate with MongoDB
 */
import DislikeDaoI from "../interfaces/DislikeDaoI";
import DislikeModel from "../mongoose/dislike/DislikeModel";
import Dislike from "../models/dislike/Dislike";

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Dislikes
 * @property {DislikeDao} dislikeDao Private single instance of DislikeDao
 */
export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): DislikeDao => {
        if (DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }

    private constructor() {
    }

    /**
     * Retrieves all users that disliked a tuit.
     * @param {string} tid Tuit for which users who have disliked this tuit.
     * @returns Promise To be notified when the users who have disliked the tuit are retrieved from the database.
     */
    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({tuit: tid})
            .populate("dislikedBy")
            .exec();

    /**
     * Retrieves all tuits disliked by a user.
     * @param {string} uid User for whom their disliked tuits are to be retrieved.
     * @returns Promise To be notified when the disliked tuits are retrieved from the database.
     */
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({dislikedBy: uid})
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();


    /**
     * Inserts a dislike instance into the database.
     * @param {string} uid User who wishes to dislike a tuit.
     * @param {string} tid Tuit that is disliked.
     * @returns Promise To be notified when a dislike instance is inserted into the database.
     */
    userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});

    /**
     * Removes a dislike instance from the database.
     * @param {string} uid User who wishes to un-dislike a tuit.
     * @param {string} tid Tuit that is un-disliked.
     * @returns Promise To be notified when a dislike instance in removed from the database.
     */
    userUnDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});

    /**
     * Count the total number of users who have disliked a tuit.
     * @param {string} tid Tuit for which the count is supposed to be returned.
     * @returns Promise To be notified when the count is retrieved from the database.
     */
    countHowManyDislikedTuit = async (tid: any) =>
        DislikeModel.count({tuit: tid});

    /**
     * Returns whether a user has disliked a tuit or not.
     * @param {string} uid User for whom its checked whether they have disliked a tuit or not.
     * @param {string} tid Tuit that is checked.
     * @returns Promise to be notified when the check is returned.
     */
    findUserDislikesTuit = async (uid: string, tid: string) =>
        DislikeModel.findOne(
            {tuit: tid, dislikedBy: uid});

}
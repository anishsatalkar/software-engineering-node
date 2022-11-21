/**
 * @file Implements DAO managing data storage of likes. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import DislikeDaoI from "../interfaces/DislikeDaoI";
import DislikeModel from "../mongoose/dislike/DislikeModel";
import Dislike from "../models/dislike/Dislike";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {LikeDao} likeDao Private single instance of LikeDao
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
     * Retrieves all users that liked a tuit.
     * @param {string} tid Tuit for which users who have liked this tuit.
     * @returns Promise To be notified when the users who have liked the tuit are retrieved from the database.
     */
    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({tuit: tid})
            .populate("dislikedBy")
            .exec();

    /**
     * Retrieves all tuits liked by a user.
     * @param {string} uid User for whom their liked tuits are to be retrieved.
     * @returns Promise To be notified when the liked tuits are retrieved from the database.
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
     * Inserts a like instance into the database.
     * @param {string} uid User who wishes to like a tuit.
     * @param {string} tid Tuit that is liked.
     * @returns Promise To be notified when a like instance in inserted into the database.
     */
    userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});

    /**
     * Removes a like instance from the database.
     * @param {string} uid User who wishes to unlike a tuit.
     * @param {string} tid Tuit that is unliked.
     * @returns Promise To be notified when a like instance in removed from the database.
     */
    userUnDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});

    countHowManyDislikedTuit = async (tid: any) =>
        DislikeModel.count({tuit: tid});

    findUserDislikesTuit = async (uid: string, tid: string) =>
        DislikeModel.findOne(
            {tuit: tid, dislikedBy: uid});

}
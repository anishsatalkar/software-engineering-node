/**
 * @file Implements DAO managing data storage of likes. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): LikeDao => {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    private constructor() {
    }

    /**
     * Retrieves all users that liked a tuit.
     * @param {string} tid Tuit for which users who have liked this tuit.
     * @returns Promise To be notified when the users who have liked the tuit are retrieved from the database.
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();

    /**
     * Retrieves all tuits liked by a user.
     * @param {string} uid User for whom their liked tuits are to be retrieved.
     * @returns Promise To be notified when the liked tuits are retrieved from the database.
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate("tuit")
            .exec();

    /**
     * Inserts a like instance into the database.
     * @param {string} uid User who wishes to like a tuit.
     * @param {string} tid Tuit that is liked.
     * @returns Promise To be notified when a like instance in inserted into the database.
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});

    /**
     * Removes a like instance from the database.
     * @param {string} uid User who wishes to unlike a tuit.
     * @param {string} tid Tuit that is unliked.
     * @returns Promise To be notified when a like instance in removed from the database.
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});
}
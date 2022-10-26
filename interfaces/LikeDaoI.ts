import Like from "../models/likes/Like";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface LikeDaoI {
    /**
     * Retrieves all users that liked a tuit.
     * @param {string} tid Tuit for which users who have liked this tuit.
     * @returns Promise To be notified when the users who have liked the tuit are retrieved from the database.
     */
    findAllUsersThatLikedTuit (tid: string): Promise<Like[]>;

    /**
     * Retrieves all tuits liked by a user.
     * @param {string} uid User for whom their liked tuits are to be retrieved.
     * @returns Promise To be notified when the liked tuits are retrieved from the database.
     */
    findAllTuitsLikedByUser (uid: string): Promise<Like[]>;

    /**
     * Removes a like instance from the database.
     * @param {string} uid User who wishes to unlike a tuit.
     * @param {string} tid Tuit that is unliked.
     * @returns Promise To be notified when a like instance in removed from the database.
     */
    userUnlikesTuit (tid: string, uid: string): Promise<any>;

    /**
     * Inserts a like instance into the database.
     * @param {string} uid User who wishes to like a tuit.
     * @param {string} tid Tuit that is liked.
     * @returns Promise To be notified when a like instance in inserted into the database.
     */
    userLikesTuit (tid: string, uid: string): Promise<Like>;
};
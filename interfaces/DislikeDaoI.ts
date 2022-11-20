import Dislike from "../models/dislike/Dislike";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface DislikeDaoI {
    /**
     * Retrieves all users that liked a tuit.
     * @param {string} tid Tuit for which users who have liked this tuit.
     * @returns Promise To be notified when the users who have liked the tuit are retrieved from the database.
     */
    findAllUsersThatDislikedTuit (tid: string): Promise<Dislike[]>;

    /**
     * Retrieves all tuits liked by a user.
     * @param {string} uid User for whom their liked tuits are to be retrieved.
     * @returns Promise To be notified when the liked tuits are retrieved from the database.
     */
    findAllTuitsDislikedByUser (uid: string): Promise<Dislike[]>;

    /**
     * Removes a like instance from the database.
     * @param {string} uid User who wishes to unlike a tuit.
     * @param {string} tid Tuit that is unliked.
     * @returns Promise To be notified when a like instance in removed from the database.
     */
    userUnDislikesTuit (tid: string, uid: string): Promise<any>;

    /**
     * Inserts a like instance into the database.
     * @param {string} uid User who wishes to like a tuit.
     * @param {string} tid Tuit that is liked.
     * @returns Promise To be notified when a like instance in inserted into the database.
     */
    userDislikesTuit (tid: string, uid: string): Promise<Dislike>;
};
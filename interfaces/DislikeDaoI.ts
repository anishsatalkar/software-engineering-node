import Dislike from "../models/dislike/Dislike";

/**
 * @file Declares API for Dislikes related data access object methods
 */
export default interface DislikeDaoI {
    /**
     * Retrieves all users that disliked a tuit.
     * @param {string} tid Tuit for which users who have disliked this tuit.
     * @returns Promise To be notified when the users who have disliked the tuit are retrieved from the database.
     */
    findAllUsersThatDislikedTuit (tid: string): Promise<Dislike[]>;

    /**
     * Retrieves all tuits disliked by a user.
     * @param {string} uid User for whom their disliked tuits are to be retrieved.
     * @returns Promise To be notified when the disliked tuits are retrieved from the database.
     */
    findAllTuitsDislikedByUser (uid: string): Promise<Dislike[]>;

    /**
     * Removes a disliked instance from the database.
     * @param {string} uid User who wishes to un-dislike a tuit.
     * @param {string} tid Tuit that is un-disliked.
     * @returns Promise To be notified when a dislike instance in removed from the database.
     */
    userUnDislikesTuit (tid: string, uid: string): Promise<any>;

    /**
     * Inserts a dislike instance into the database.
     * @param {string} uid User who wishes to dislike a tuit.
     * @param {string} tid Tuit that is disliked.
     * @returns Promise To be notified when a dislike instance in inserted into the database.
     */
    userDislikesTuit (tid: string, uid: string): Promise<Dislike>;
};
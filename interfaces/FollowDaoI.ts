/**
 * @file Declares API for Follows related data access object methods
 */
import Follow from "../models/follows/Follow";

export default interface FollowDaoI {

    /**
     * Inserts a follow instance into the database
     * @param {string} followerId User who wishes to follow another user.
     * @param {string} followedId User who is supposed to be followed.
     * @returns Promise To be notified when a follow instance is inserted into the database.
     */
    userFollows (followerId: string, followedId: string): Promise<Follow>;

    /**
     * Deletes a follow instance from the database.
     * @param {string} uid User who wishes to unfollow another user.
     * @param {string} followedId User who is supposed to be unfollowed.
     * @returns Promise To be notified when a follow instance is deleted from the database.
     */
    userUnfollows (uid: string, followedId: string): Promise<any>;

    /**
     * Retrieves users who are followed by a given user.
     * @param {string} uid User for whom their following needs to be retrieved.
     * @returns Promise To be notified when a users are fetched from the database.
     */
    findFollowingOfUser (uid: string): Promise<Follow[]>;

    /**
     * Retrieves followers of a user.
     * @param {string} uid User for whom their followers need to be fetched.
     * @returns Promise To be notified when a users are fetched from the database.
     */
    findFollowersOfUser (uid: string): Promise<Follow[]>;
}
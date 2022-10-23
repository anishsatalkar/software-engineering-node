/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/follows/Follow";
import FollowModel from "../mongoose/follows/FollowModel";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of UserDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}

    /**
     * Inserts a follow instance into the database
     * @param {string} followerId User who wishes to follow another user.
     * @param {string} followedId User who is supposed to be followed.
     * @returns Promise To be notified when a follow instance is inserted into the database.
     */
    userFollows = async (followerId: string, followedId: string): Promise<Follow> =>
        FollowModel
            .findOneAndUpdate({userFollowing: followerId, userFollowed: followedId},
            {userFollowing: followerId, userFollowed: followedId},{upsert: true, new: true})
            .then(follow => follow)
            .catch(error => error);

    /**
     * Deletes a follow instance from the database.
     * @param {string} uid User who wishes to unfollow another user.
     * @param {string} followedId User who is supposed to be unfollowed.
     * @returns Promise To be notified when a follow instance is deleted from the database.
     */
    userUnfollows = async (uid: string, followedId: string): Promise<any> =>
        FollowModel
            .deleteOne({userFollowing: uid, userFollowed: followedId})
            .then(status => status)
            .catch(error => error);

    /**
     * Retrieves users who are followed by a given user.
     * @param {string} uid User for whom their following needs to be retrieved.
     * @returns Promise To be notified when a users are fetched from the database.
     */
    findFollowingOfUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowed")
            .exec()
            .then(users => users)
            .catch(error => error);

    /**
     * Retrieves followers of a user.
     * @param {string} uid User for whom their followers need to be fetched.
     * @returns Promise To be notified when a users are fetched from the database.
     */
    findFollowersOfUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing")
            .exec()
            .then(users => users)
            .catch(error => error);

}

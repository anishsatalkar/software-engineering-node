/**
 * @file Declares API for Follows related data access object methods
 */
import Follow from "../models/follows/Follow";

export default interface FollowDaoI {
    userFollows (followerId: string, followedId: string): Promise<Follow>;
    userUnfollows (uid: string, followedId: string): Promise<any>;
    findFollowingOfUser (uid: string): Promise<Follow[]>;
    findFollowersOfUser (uid: string): Promise<Follow[]>;
}
/**
 * @file Declares Follow data type representing relationship between
 * users and users, as in user follows another user.
 */
import mongoose from "mongoose";
import User from "../users/User";

/**
 * @typedef Follow Represents follow relationship between a user and another user,
 * as in a user follows another user.
 * @property {User} userFollowed User who follows.
 * @property {User} userFollowing User who is being followed.
 */
export default interface Follow {
    _id?: mongoose.Schema.Types.ObjectId,
    userFollowed: User,
    userFollowing: User
}
/**
 * @file Declares Tuit data type representing tuits posted by users.
 */
import User from "../users/User";

/**
 * @typedef Tuit Represents a tuit posted by a user.
 * @property {User} postedBy User who posts the tuit.
 * @property {Date} postedOn Date on which the tuit was posted.
 */
export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
    stats: {
        replies: Number,
        retuits: Number,
        likes: Number,
        dislikes: Number
    }
};
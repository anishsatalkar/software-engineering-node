/**
 * @file Declares RESTful Web service API for follow resource
 */
import {Request, Response} from "express";

export default interface FollowControllerI {
    /**
     * A user follows another user.
     * @param {Request} req Represents request from client, including the path
     * parameters 'followerId' representing the user who wished to follow another user and 'followedId' representing
     * the user who would be followed.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object of the follow instance.
     */
    userFollows (req: Request, res: Response): void;

    /**
     * A user unfollows a followed user.
     * @param {Request} req Represents request from client, including the path
     * parameters 'uid' representing the user who has followed another user and 'followedId' representing
     * the user who would be unfollowed.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object of the unfollow instance.
     */
    userUnfollows (req: Request, res: Response): void;

    /**
     * Fetches users that a user follows.
     * @param {Request} req Represents request from client, including the path
     * parameters 'uid' representing the user for whom the users they follow need to be fetched.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON array of the followed users.
     */
    findFollowingOfUser (req: Request, res: Response): void;

    /**
     * Fetches the followers of a user.
     * @param {Request} req Represents request from client, including the path
     * parameters 'uid' representing the user for whom their followers need to be fetched.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON array of the user's followers.
     */
    findFollowersOfUser (req: Request, res: Response): void;
};
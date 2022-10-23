/**
 * @file FollowController RESTful Web service API for messages resource
 */
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";
import {Express, Request, Response} from "express";

/**
 * @class FollowController Implements RESTful Web service API for follow resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:followerId/follows/:followedId to follow a user.
 *     </li>
 *     <li>DELETE /api/users/:uid/follows/:followedId to unfollow a user.
 *     </li>
 *     <li>GET /api/users/:uid/follows to retrieve all users that a user follows.
 *     </li>
 *     <li>GET /api/users/:uid/follows/followers to retrieve all the followers of a user.
 *     </li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing likes CRUD operations
 * @property {FollowController} followController Singleton controller implementing FollowControllerI
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:followerId/follows/:followedId", FollowController.followController.userFollows);
            app.delete("/api/users/:uid/follows/:followedId", FollowController.followController.userUnfollows);
            app.get("/api/users/:uid/follows", FollowController.followController.findFollowingOfUser);
            app.get("/api/users/:uid/follows/followers", FollowController.followController.findFollowersOfUser);
        }
        return FollowController.followController;
    }

    private constructor() {}

    /**
     * A user follows another user.
     * @param {Request} req Represents request from client, including the path
     * parameters 'followerId' representing the user who wished to follow another user and 'followedId' representing
     * the user who would be followed.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object of the follow instance.
     */
    userFollows = (req: Request, res: Response) =>
        FollowController.followDao.userFollows(req.params.followerId, req.params.followedId)
            .then(follow => res.json(follow));

    /**
     * A user unfollows a followed user.
     * @param {Request} req Represents request from client, including the path
     * parameters 'uid' representing the user who has followed another user and 'followedId' representing
     * the user who would be unfollowed.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object of the unfollow instance.
     */
    userUnfollows = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollows(req.params.uid, req.params.followedId)
            .then(status => res.json(status));

    /**
     * Fetches users that a user follows.
     * @param {Request} req Represents request from client, including the path
     * parameters 'uid' representing the user for whom the users they follow need to be fetched.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON array of the followed users.
     */
    findFollowingOfUser = (req: Request, res: Response) =>
        FollowController.followDao.findFollowingOfUser(req.params.uid)
            .then(users => res.json(users));

    /**
     * Fetches the followers of a user.
     * @param {Request} req Represents request from client, including the path
     * parameters 'uid' representing the user for whom their followers need to be fetched.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON array of the user's followers.
     */
    findFollowersOfUser = (req: Request, res: Response) =>
        FollowController.followDao.findFollowersOfUser(req.params.uid)
            .then(users => res.json(users));

}
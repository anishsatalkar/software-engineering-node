import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";
import {Express, Request, Response} from "express";

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

    userFollows = (req: Request, res: Response) =>
        FollowController.followDao.userFollows(req.params.followerId, req.params.followedId)
            .then(follow => res.json(follow));

    userUnfollows = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollows(req.params.uid, req.params.followedId)
            .then(status => res.json(status));

    findFollowingOfUser = (req: Request, res: Response) =>
        FollowController.followDao.findFollowingOfUser(req.params.uid)
            .then(users => res.json(users));

    findFollowersOfUser = (req: Request, res: Response) =>
        FollowController.followDao.findFollowersOfUser(req.params.uid)
            .then(users => res.json(users));

}
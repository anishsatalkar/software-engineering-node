/**
 * @file Declares RESTful Web service API for follow resource
 */
import {Request, Response} from "express";

export default interface FollowControllerI {
    userFollows (req: Request, res: Response): void;
    userUnfollows (req: Request, res: Response): void;
    findFollowingOfUser (req: Request, res: Response): void;
    findFollowersOfUser (req: Request, res: Response): void;
};
/**
 * @file Declares RESTful Web service API for bookmark resource
 */
import {Request, Response} from "express";

export default interface BookmarkControllerI {
    /**
     * Bookmark a tuit.
     * @param {Request} req Represents request from client, including the path
     * parameters 'uid' representing the user who wishes to bookmark a tuit and 'tuid' representing the id of the tuit.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object of the bookmarked tuit.
     */
    userBookmarks (req: Request, res: Response): void;

    /**
     * Unbookmark a tuit.
     * @param {Request} req Represents request from client, including the path parameters 'uid'
     * representing the user who wishes to unbookmark a tuit and 'tuid' representing the id of the tuit.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object of the unbookmarked tuit.
     */
    userUnbookmarks (req: Request, res: Response): void;

    /**
     * Fetch all the tuits bookmarked by the user.
     * @param {Request} req Represents request from client, including the path parameters 'uid'
     * representing the user who has bookmarked some tuits.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON array of the bookmarked tuits.
     */
    userViewsTheirBookmarks (req: Request, res: Response): void;
};
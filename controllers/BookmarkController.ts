/**
 * @file BookmarkController RESTful Web service API for bookmark resource
 */
import {Express, Request, Response} from "express";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";
import BookmarkDao from "../daos/BookmarkDao";

/**
 * @class BookmarkController Implements RESTful Web service API for bookmark resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/bookmarks/:tuid to bookmark a tuit.
 *     </li>
 *     <li>DELETE /api/users/:uid/bookmarks/:tuid to unbookmark a tuit.
 *     </li>
 *     <li>GET /api/users/:uid/bookmarks to fetch all the tuits bookmarked by a user.
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing likes CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing BookmarkControllerI
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return BookmarkController
     */
    public static getInstance = (app: Express): BookmarkController => {
        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.post("/api/users/:uid/bookmarks/:tuid", BookmarkController.bookmarkController.userBookmarks);
            app.delete("/api/users/:uid/bookmarks/:tuid", BookmarkController.bookmarkController.userUnbookmarks);
            app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.userViewsTheirBookmarks);
        }
        return BookmarkController.bookmarkController;
    }

    private constructor() {
    }

    /**
     * Bookmark a tuit.
     * @param {Request} req Represents request from client, including the path
     * parameters 'uid' representing the user who wishes to bookmark a tuit and 'tuid' representing the id of the tuit.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object of the bookmarked tuit.
     */
    userBookmarks(req: Request, res: Response) {
        BookmarkController.bookmarkDao.userBookmarks(req.params.uid, req.params.tuid)
            .then(bookmark => res.json(bookmark));
    }

    /**
     * Unbookmark a tuit.
     * @param {Request} req Represents request from client, including the path parameters 'uid'
     * representing the user who wishes to unbookmark a tuit and 'tuid' representing the id of the tuit.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object of the unbookmarked tuit.
     */
    userUnbookmarks(req: Request, res: Response) {
        BookmarkController.bookmarkDao.userUnbookmarks(req.params.uid, req.params.tuid)
            .then(status => res.json(status));
    }

    /**
     * Fetch all the tuits bookmarked by the user.
     * @param {Request} req Represents request from client, including the path parameters 'uid'
     * representing the user who has bookmarked some tuits.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON array of the bookmarked tuits.
     */
    userViewsTheirBookmarks(req: Request, res: Response) {
        BookmarkController.bookmarkDao.userViewsTheirBookmarks(req.params.uid)
            .then(bookmarks => res.json(bookmarks))
    }

}
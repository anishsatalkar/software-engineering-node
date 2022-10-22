import {Express, Request, Response} from "express";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";
import BookmarkDao from "../daos/BookmarkDao";

export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

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

    userBookmarks(req: Request, res: Response) {
        BookmarkController.bookmarkDao.userBookmarks(req.params.uid, req.params.tuid)
            .then(bookmark => res.json(bookmark));
    }

    userUnbookmarks(req: Request, res: Response) {
        BookmarkController.bookmarkDao.userUnbookmarks(req.params.uid, req.params.tuid)
            .then(status => res.json(status));
    }

    userViewsTheirBookmarks(req: Request, res: Response) {
        BookmarkController.bookmarkDao.userViewsTheirBookmarks(req.params.uid)
            .then(bookmarks => res.json(bookmarks))
    }

}
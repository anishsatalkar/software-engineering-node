import {Request, Response} from "express";

export default interface BookmarkControllerI {
    userBookmarks (req: Request, res: Response): void;
    userUnbookmarks (req: Request, res: Response): void;
    userViewsTheirBookmarks (req: Request, res: Response): void;
};
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";

export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;

    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {
    }

    userBookmarks = async (uid: string, tuid: string): Promise<Bookmark> =>
        BookmarkModel
            .findOneAndUpdate({bookmarkedBy: uid, bookmarkedTuit: tuid},
            {bookmarkedBy: uid, bookmarkedTuit: tuid}, {upsert: true, new: true})
            .then(bookmark => bookmark)
            .catch((error) => error);

    userUnbookmarks = async (uid: string, tuid: string): Promise<any> =>
        BookmarkModel
            .deleteOne({bookmarkedBy: uid, bookmarkedTuit: tuid})
            .then(status => status)
            .catch((error) => error);

    userViewsTheirBookmarks = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedBy: uid})
            .populate("bookmarkedTuit")
            .exec()
            .then(bookmarks => bookmarks)
            .catch((error) => error);
}
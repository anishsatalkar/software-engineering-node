/**
 * @file Implements DAO managing data storage of users. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of UserDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {
    }

    /**
     * Inserts a bookmark instance into the database.
     * @param {string} uid User who wishes to bookmark a tuit.
     * @param {string} tuid Tuit that is bookmarked.
     * @returns Promise To be notified when a bookmark instance in inserted into the database.
     */
    userBookmarks = async (uid: string, tuid: string): Promise<Bookmark> =>
        BookmarkModel
            .findOneAndUpdate({bookmarkedBy: uid, bookmarkedTuit: tuid},
            {bookmarkedBy: uid, bookmarkedTuit: tuid}, {upsert: true, new: true})
            .then(bookmark => bookmark)
            .catch((error) => error);

    /**
     * Removes a bookmark instance from the database.
     * @param {string} uid User who wishes to unbookmark a tuit.
     * @param {string} tuid Tuit that is unbookmarked.
     * @returns Promise To be notified when a bookmark instance in removed from the database.
     */
    userUnbookmarks = async (uid: string, tuid: string): Promise<any> =>
        BookmarkModel
            .deleteOne({bookmarkedBy: uid, bookmarkedTuit: tuid})
            .then(status => status)
            .catch((error) => error);

    /**
     * Retrieves all bookmarked tuits by a user.
     * @param {string} uid User for whom their bookmarked tuits are to be retrieved.
     * @returns Promise To be notified when the bookmarked tuits are retrieved from the database.
     */
    userViewsTheirBookmarks = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedBy: uid})
            .populate("bookmarkedTuit")
            .exec()
            .then(bookmarks => bookmarks)
            .catch((error) => error);
}
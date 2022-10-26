/**
 * @file Declares API for Bookmarks related data access object methods
 */
import Bookmark from "../models/bookmarks/Bookmark";

export default interface BookmarkDaoI {
    /**
     * Inserts a bookmark instance into the database.
     * @param {string} uid User who wishes to bookmark a tuit.
     * @param {string} tuid Tuit that is bookmarked.
     * @returns Promise To be notified when a bookmark instance in inserted into the database.
     */
    userBookmarks (uid: string, tuid: string): Promise<Bookmark>;

    /**
     * Removes a bookmark instance from the database.
     * @param {string} uid User who wishes to unbookmark a tuit.
     * @param {string} tuid Tuit that is unbookmarked.
     * @returns Promise To be notified when a bookmark instance in removed from the database.
     */
    userUnbookmarks (uid: string, tuid: string): Promise<any>;

    /**
     * Retrieves all bookmarked tuits by a user.
     * @param {string} uid User for whom their bookmarked tuits are to be retrieved.
     * @returns Promise To be notified when the bookmarked tuits are retrieved from the database.
     */
    userViewsTheirBookmarks (uid: string): Promise<Bookmark[]>;
}
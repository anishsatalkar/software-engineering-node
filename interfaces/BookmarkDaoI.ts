import Bookmark from "../models/bookmarks/Bookmark";

export default interface BookmarkDaoI {
    userBookmarks (uid: string, tuid: string): Promise<Bookmark>;
    userUnbookmarks (uid: string, tuid: string): Promise<any>;
    userViewsTheirBookmarks (uid: string): Promise<Bookmark[]>;
}
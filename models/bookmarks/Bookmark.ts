import mongoose from "mongoose";
import Tuit from "../tuits/Tuit";
import User from "../users/User";

export default interface Bookmark {
    _id?: mongoose.Schema.Types.ObjectId,
    bookmarkedTuit: Tuit,
    bookmarkedBy: User
}
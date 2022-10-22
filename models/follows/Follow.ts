import mongoose from "mongoose";
import User from "../users/User";

export default interface Follow {
    _id?: mongoose.Schema.Types.ObjectId,
    userFollowed: User,
    userFollowing: User
}
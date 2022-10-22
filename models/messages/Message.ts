import mongoose from "mongoose";
import User from "../users/User";

export default interface Message {
    id?: mongoose.Schema.Types.ObjectId,
    message: string,
    to: User,
    from: User,
    sentOn: Date
}
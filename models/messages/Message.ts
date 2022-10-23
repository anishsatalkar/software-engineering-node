/**
 * @file Declares Message data type representing messages sent between users.
 */
import mongoose from "mongoose";
import User from "../users/User";

/**
 * @typedef Message Represents messages sent between users.
 * @property {string} message Content of the message.
 * @property {User} to User who receives the message.
 * @property {User} from User who sends the message.
 * @property {Date} sentOn Date at which the message was sent.
 */
export default interface Message {
    id?: mongoose.Schema.Types.ObjectId,
    message: string,
    to: User,
    from: User,
    sentOn: Date
}
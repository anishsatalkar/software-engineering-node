/**
 * @file Declares API for Messages related data access object methods
 */
import Message from "../models/messages/Message";

export default interface MessageDaoI {
    /**
     * Inserts a message instance into the database.
     * @param {string} from User who sends the message.
     * @param {string} to User who receives the message.
     * @param {string} message The content of the message.
     * @returns Promise To be notified when a message instance in inserted into the database.
     */
    sendMessage (from: string, to: string, message: string): Promise<Message>;

    /**
     * Retrieves messages sent by a user.
     * @param {string} from User who sent these messages.
     * @returns Promise To be notified when the messages are retrieved from the database.
     */
    viewAllSentMessages (from: string): Promise<Message[]>;

    /**
     * Retrieves messages received by a user.
     * @param {string} by User who has received the messages.
     * @returns Promise To be notified when the messages are retrieved from the database.
     */
    viewAllReceivedMessages (by: string): Promise<Message[]>;

    /**
     * Deletes a message sent by a user.
     * @param {string} uid User who sent the message.
     * @param {string} mid Message that needs to be deleted.
     * @returns Promise To be notified when the message is removed from the database
     */
    deleteMessage (uid: string, mid: string): Promise<any>;
}
/**
 * @file Implements DAO managing data storage of likes. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/messages/Message";
import MessageModel from "../mongoose/messages/MessageModel";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {messageDao} MessageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {
    }

    /**
     * Inserts a message instance into the database.
     * @param {string} from User who sends the message.
     * @param {string} to User who receives the message.
     * @param {string} message The content of the message.
     * @returns Promise To be notified when a message instance in inserted into the database.
     */
    sendMessage = async (from: string, to: string, message: string): Promise<Message> =>
        MessageModel
            .create({message, to, from})
            .then(message => message)
            .catch(error => error);

    /**
     * Retrieves messages sent by a user.
     * @param {string} from User who sent these messages.
     * @returns Promise To be notified when the messages are retrieved from the database.
     */
    viewAllSentMessages = async (from: string): Promise<Message[]> =>
        MessageModel
            .find({from})
            .exec()
            .then(messages => messages)
            .catch(error => error);

    /**
     * Retrieves messages received by a user.
     * @param {string} by User who has received the messages.
     * @returns Promise To be notified when the messages are retrieved from the database.
     */
    viewAllReceivedMessages = async (by: string): Promise<Message[]> =>
        MessageModel
            .find({to: by})
            .exec()
            .then(messages => messages)
            .catch(error => error);

    /**
     * Deletes a message sent by a user.
     * @param {string} uid User who sent the message.
     * @param {string} mid Message that needs to be deleted.
     * @returns Promise To be notified when the message is removed from the database
     */
    deleteMessage = async (uid: string, mid: string): Promise<any> =>
        MessageModel
            .deleteOne({from: uid, id: mid})
            .then(status => status)
            .catch(error => error);
}
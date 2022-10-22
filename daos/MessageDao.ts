import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/messages/Message";
import MessageModel from "../mongoose/messages/MessageModel";

export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {
    }

    sendMessage = async (from: string, to: string, message: string): Promise<Message> =>
        MessageModel
            .create({message, to, from})
            .then(message => message)
            .catch(error => error);

    viewAllSentMessages = async (from: string): Promise<Message[]> =>
        MessageModel
            .find({from})
            .exec()
            .then(messages => messages)
            .catch(error => error);

    viewAllReceivedMessages = async (by: string): Promise<Message[]> =>
        MessageModel
            .find({to: by})
            .exec()
            .then(messages => messages)
            .catch(error => error);


    deleteMessage = async (uid: string, mid: string): Promise<any> =>
        MessageModel
            .deleteOne({from: uid, id: mid})
            .then(status => status)
            .catch(error => error);
}
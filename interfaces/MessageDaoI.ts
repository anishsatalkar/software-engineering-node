import Message from "../models/messages/Message";

export default interface MessageDaoI {
    sendMessage (from: string, to: string, message: string): Promise<Message>;
    viewAllSentMessages (from: string): Promise<Message[]>;
    viewAllReceivedMessages (by: string): Promise<Message[]>;
    deleteMessage (uid: string, mid: string): Promise<any>;
}
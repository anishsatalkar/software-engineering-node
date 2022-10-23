/**
 * @file MessageController RESTful Web service API for messages resource
 */
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";
import {Express, Request, Response} from "express";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:from/messages/:to to send a message to a user.
 *     </li>
 *     <li>GET /api/users/:from/messages/sent to retrieve all messages sent by a user.
 *     </li>
 *     <li>GET /api/users/:by/messages/received to retrieve all messages received by a user.
 *     </li>
 *     <li>DELETE /api/users/:uid/messages/:mid to delete a message sent by a user.
 *     </li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing likes CRUD operations
 * @property {MessageController} messageController Singleton controller implementing MessageControllerI
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/users/:from/messages/:to", MessageController.messageController.sendMessage);
            app.get("/api/users/:from/messages/sent", MessageController.messageController.viewAllSentMessages);
            app.get("/api/users/:by/messages/received", MessageController.messageController.viewAllReceivedMessages);
            app.delete("/api/users/:uid/messages/:mid", MessageController.messageController.deleteMessage);

        }
        return MessageController.messageController;
    }

    private constructor() {
    }

    /**
     * Sends a message to a user.
     * @param {Request} req Represents request from client, including the path
     * parameters 'from' representing the user who sends a message and 'to' representing the receiver.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object of the sent message.
     */
    sendMessage = (req: Request, res: Response) =>
        MessageController.messageDao
            .sendMessage(req.params.from, req.params.to, req.body.message)
            .then(message => res.json(message));

    /**
     * Fetches all the messages sent by a user.
     * @param {Request} req Represents request from client, including the path
     * parameters 'from' representing the user who has sent messages to others.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON array of the sent messages.
     */
    viewAllSentMessages = (req: Request, res: Response) =>
        MessageController.messageDao.viewAllSentMessages(req.params.from)
            .then(messages => res.json(messages));


    /**
     * Fetches all the messages received by a user.
     * @param {Request} req Represents request from client, including the path
     * parameters 'by' representing the user who has received messages.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON array of the received messages.
     */
    viewAllReceivedMessages = (req: Request, res: Response) =>
        MessageController.messageDao
            .viewAllReceivedMessages(req.params.by)
            .then(messages => res.json(messages));

    /**
     * Deletes a message.
     * @param {Request} req Represents request from client, including the path
     * parameters 'uid' representing the user who had sent the message and 'mid' representing the message id.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object of the deleted count.
     */
    deleteMessage = (req: Request, res: Response) => {
        console.log(req.params.uid);
        console.log(req.params.mid);
        MessageController.messageDao
            .deleteMessage(req.params.uid, req.params.mid)
            .then(status => res.json(status));
    }

}
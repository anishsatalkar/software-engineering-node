import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";
import {Express, Request, Response} from "express";

export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

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

    sendMessage = (req: Request, res: Response) =>
        MessageController.messageDao
            .sendMessage(req.params.from, req.params.to, req.body.message)
            .then(message => res.json(message));

    viewAllSentMessages = (req: Request, res: Response) =>
        MessageController.messageDao.viewAllSentMessages(req.params.from)
            .then(messages => res.json(messages));



    viewAllReceivedMessages = (req: Request, res: Response) =>
        MessageController.messageDao
            .viewAllReceivedMessages(req.params.by)
            .then(messages => res.json(messages));



    deleteMessage = (req: Request, res: Response) => {
        console.log(req.params.uid);
        console.log(req.params.mid);
        MessageController.messageDao
            .deleteMessage(req.params.uid, req.params.mid)
            .then(status => res.json(status));
    }

}
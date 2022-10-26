/**
 * @file Declares RESTful Web service API for message resource
 */
import {Request, Response} from "express";

export default interface MessageControllerI {
    /**
     * Sends a message to a user.
     * @param {Request} req Represents request from client, including the path
     * parameters 'from' representing the user who sends a message and 'to' representing the receiver.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object of the sent message.
     */
    sendMessage (req: Request, res: Response): void;

    /**
     * Fetches all the messages sent by a user.
     * @param {Request} req Represents request from client, including the path
     * parameters 'from' representing the user who has sent messages to others.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON array of the sent messages.
     */
    viewAllSentMessages (req: Request, res: Response): void;

    /**
     * Fetches all the messages received by a user.
     * @param {Request} req Represents request from client, including the path
     * parameters 'by' representing the user who has received messages.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON array of the received messages.
     */
    viewAllReceivedMessages (req: Request, res: Response): void;

    /**
     * Deletes a message.
     * @param {Request} req Represents request from client, including the path
     * parameters 'uid' representing the user who had sent the message and 'mid' representing the message id.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object of the deleted count.
     */
    deleteMessage (req: Request, res: Response): void;
}
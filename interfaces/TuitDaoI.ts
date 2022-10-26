import Tuit from "../models/tuits/Tuit";

/**
 * @file Declares API for Tuits related data access object methods
 */
export default interface TuitDaoI {
    /**
     * Uses TuitModel to retrieve all tuit documents from tuits collection
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuits (): Promise<Tuit[]>;

    /**
     * Uses TuitModel to retrieve all tuits posted by a single user from the tuits collection.
     * @param {string} uid User's primary key
     * @returns Promise To be notified when tuits are retrieved from the database
     */
    findAllTuitsByUser (uid: string): Promise<Tuit[]>;

    /**
     * Uses TuitModel to retrieve single tuit document from users collection
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when tuit is retrieved from the database
     */
    findTuitById (tid: string): Promise<Tuit>;

    /**
     * Inserts tuit instance into the database
     * @param {string} uid User's primary key who posts the tuit.
     * @param {Tuit} tuit Instance to be inserted into the database
     * @returns Promise To be notified when tuit is inserted into the database
     */
    createTuitByUser (uid: string, tuit: Tuit): Promise<Tuit>;

    /**
     * Updates tuit with new values in database
     * @param {string} tid Primary key of tuit to be modified
     * @param {Tuit} tuit Tuit object containing properties and their new values
     * @returns Promise To be notified when tuit is updated in the database
     */
    updateTuit (tid: string, tuit: Tuit): Promise<any>;

    /**
     * Removes tuit from the database.
     * @param {string} tid Primary key of tuit to be removed
     * @returns Promise To be notified when tuit is removed from the database
     */
    deleteTuit (tid: string): Promise<any>;
};
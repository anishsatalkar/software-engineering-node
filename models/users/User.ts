/**
 * @file Declares User data type representing users.
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import mongoose from "mongoose";

/**
 * @typedef User Represents a user.
 * @property {string} username Username of the user.
 * @property {string} password Password of the user.
 * @property {string} email Email id of the user.
 * @property {string} firstName First name of the user.
 * @property {string} lastName Last name of the user.
 * @property {string} profilePhoto Link to the profile photo of the user.
 * @property {string} headerImage Link to the image header of the user.
 * @property {string} biography Biography of the user.
 * @property {Date} dateOfBirth Date of birth of the user.
 * @property {AccountType} accountType Account type of the user.
 * @property {MaritalStatus} maritalStatus Marital status of the user.
 * @property {Location} location Location of the user.
 * @property {number} salary Salary of the user.
 */
export default interface User {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    email: string,
    firstName?: string,
    lastName?: string,
    profilePhoto?: string,
    headerImage?: string,
    biography?: string,
    dateOfBirth?: Date,
    accountType?: AccountType,
    maritalStatus?: MaritalStatus,
    location?: Location,
    salary?: number
};
/**
 * @file Declares a Location representing the latitude and longitude of a location.
 */

/**
 * @typedef Location Represents the location of a user.
 * @property {number} latitude Latitude.
 * @property {number} longitude Longitude.
 */
export default interface Location {
    latitude: number,
    longitude: number
};
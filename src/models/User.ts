import MaritalStatus from "./MaritalStatus";
import AccountType from "./AccountType";
import Location from "./Location";

export default class User {
    private id: string;
    private username: string = '';
    private password: string = '';
    private firstName: string | null = null;
    private lastName: string | null = null;
    private email: string = '';
    private profilePhoto: string | null = null;
    private headerImage: string | null = null;
    private accountType: AccountType = AccountType.Personal;
    private maritalStatus: MaritalStatus = MaritalStatus.Single;
    private biography: string | null = null;
    private dateOfBirth: Date | null = null;
    private joined: Date = new Date();
    private location: Location | null = null;
    constructor(id: string, username: string, password: string,
                firstName: string, lastName: string, email: string,
                profilePhoto: string, headerImage: string, accountType: AccountType,
                maritalStatus: MaritalStatus, biography: string,
                dateOfBirth: Date, joined: Date, location: Location) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.profilePhoto = profilePhoto;
        this.headerImage = headerImage;
        this.accountType = accountType;
        this.maritalStatus = maritalStatus;
        this.biography = biography;
        this.dateOfBirth = dateOfBirth;
        this.joined = joined;
        this.location = location;
    }
}
import User from "./User";

export default class Tuit {
    private id: string;
    private tuit: string = '';
    private postedOn: Date = new Date();
    private postedBy: User | null = null;
    constructor(id: string, tuit: string, postedOn: Date, postedBy: User) {
        this.id = id; this.tuit = tuit; this.postedOn = postedOn; this.postedBy = postedBy;
    }
}
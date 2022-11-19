import {Express, Response} from "express";
import UserDao from "../daos/UserDao";

const bcrypt = require('bcrypt');
const saltRounds = 10;

// TODO: convert this to interface and implementation

const AuthenticationController = (app: Express) => {

    const userDao: UserDao = UserDao.getInstance();

    const signup = async (req: any, res: any) => {
        const newUser = req.body;
        const password = newUser.password;
        const hash = await bcrypt.hash(password, saltRounds);
        newUser.password = hash;

        const existingUser = await userDao
            .findUserByUsername(req.body.username);
        if (existingUser) {
            res.sendStatus(403);
            return;
        } else {
            const insertedUser = await userDao
                .createUser(newUser);
            insertedUser.password = '';
            res.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    }
    app.post("/api/auth/signup", signup);
}

export default AuthenticationController;
import sqlite3 from "sqlite3";
import { Login } from "./auth/login";
import { Register } from "./auth/register";
import { Authectication } from './auth/Authectication';

const db = new sqlite3.verbose();

db.open('./user.db', (err) => {
    if (err) {
        console.error(err.message);
    }
});

function Auth(app) {
    Login(app, db);
    Register(app, db);

}

export { Auth }
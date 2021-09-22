import "reflect-metadata";
import {createConnection} from "typeorm";
import { app, callback, port } from "./server";

createConnection().then(async __ => {

    app.listen(port, callback);

}).catch(error => console.log({error}));
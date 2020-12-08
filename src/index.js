import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from "mongoose"
import bluebird from "bluebird"
import dotenv from 'dotenv'
import passport from "passport";

import 'src/passport'
import api from "src/api";
import auth from 'src/auth'

dotenv.config()
mongoose.Promise = bluebird

const {
	MONGO_HOSTNAME,
	MONGO_PORT,
	MONGO_DB,
} = process.env;

//const url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;
const url = process.env.DEV_MONGO_URI

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const app = express()
const port = process.env.PORT || 5000;
const db = mongoose.connection

db.once('open', () => {
    app.use(cors());
    app.use(bodyParser.json());

    app.use("/auth", auth);
    app.use("/api", passport.authenticate("jwt", { session: false }), api);

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
})
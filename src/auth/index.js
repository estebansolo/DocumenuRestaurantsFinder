import express from 'express'
import validator from 'validator'
import passport from "passport";
import jwt from "jsonwebtoken";

import User from "src/controllers/users";
import { SECRET } from "src/config/config";
import { HTTP_STATUS, RESPONSES } from "src/config/constants";

const user = new User();
const router = express.Router()

router.post('/signup', (req, res) => {
    const body = {
        username: req.body.username
            ? validator.escape(validator.trim(req.body.username))
            : null,
        email: validator.isEmail(req.body.email)
            ? validator.escape(validator.trim(req.body.email))
            : null,
        password: req.body.password
            ? validator.escape(validator.trim(req.body.password))
            : null,
    };

    if(body.email && body.password && body.username){
        user.create(body).then(response => {
            res.json(response)
        }).catch(error => {
            res.status(HTTP_STATUS.BAD_REQUEST).send({ error })
        })
    } else {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
            error: RESPONSES.MISSING_FIELDS_OR_WRONG_INPUTS
        })
    }
})

router.post("/signin", (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: info ? info.message : "Login failed",
                user,
            });
        }
        
        req.login(user, { session: false }, err => {
            if(!err){
                user.salt = undefined
                user.password = undefined

                const token = jwt.sign(user, SECRET)
                return res.json({user, token})
            }

            res.send(err);
        });
        
    })
    (req, res)
});

router.post("/logout", (req, res) => {
    req.logOut()
    res.status(HTTP_STATUS.OK).send()
})

export default router
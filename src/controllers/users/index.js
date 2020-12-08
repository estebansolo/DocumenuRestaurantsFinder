import UserModel from "src/models/User";
import jwt from "jsonwebtoken";
import uniqid from "uniqid";

import { shaEncrypt } from 'src/config/utilities';
import { RESPONSES } from "src/config/constants";
import { SECRET } from 'src/config/config'

class User {
    constructor() {}

    create(userBody) {
        return UserModel.findOne({ email: userBody.email }).exec().then(user => {
            if (user) {
                // User already exists
                return Promise.reject(RESPONSES.USER_EXIST);
            }

            const newUser = new UserModel();

            newUser.email = userBody.email
            newUser.username = userBody.username
            
            newUser.salt = uniqid()
            newUser.password = shaEncrypt(newUser.salt + userBody.password)
            
            return newUser.save()
        }).then(newUser => {
            newUser.salt = undefined
            newUser.password = undefined
            
            const token = jwt.sign(newUser.toJSON(), SECRET)
            return Promise.resolve({ newUser, token })
        }).catch(err => {
            return Promise.reject(err)
        })
    }
}

export default User;
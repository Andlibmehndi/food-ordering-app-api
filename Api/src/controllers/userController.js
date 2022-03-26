//mport bcrypt from 'bcrypt';

import { UserModel,HistoryModel } from '../models';
import md5 from "md5";

async function checkUserLogin(email, password) {
    const user = await UserModel.findOne({ email: email });
   
    if (user) {
        const isMatch = md5(password) === user.password ? true : false
        if (isMatch) {
            return user;
        } else {
            return "401";
        }
    }else{
        return "404";
    }
    //throw new Error('User Not Found!');
}

export {
    checkUserLogin
};
import express from 'express';
import { userController } from '../controllers';
import {generateToken} from '../lib/auth'
const routes = express.Router();

routes.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body
        const record = await userController.checkUserLogin(email, password);
        if(record === "404"){
            res.json({ success: false, message:"User Not Found!" });
        }else if(record === "401"){
            res.json({ success: false, message:"Invalid email/password" });
        }else{
            res.json({ success: true, token: generateToken(record), message:"Login Successfully"});  
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({error: true, message: error.message})
        next(error);
    }
});

routes.get('/',async (req, res, next) => {
    res.send('Api Working properly...');
});

export default routes;
import jwt from 'jsonwebtoken'
import { omit } from 'lodash';

import { JWT_SECRET, TOKEN_EXPIRY } from './config';

export function generateToken(user) {

    let token = jwt.sign(
        {
            data: omit(user, ['password','_id']),
        },
        JWT_SECRET,
        {
            expiresIn: TOKEN_EXPIRY,
            algorithm: 'HS256'
        });

    return token
}

export function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    let result;

    if (token) {
        const options = {
            expiresIn: TOKEN_EXPIRY,
            algorithm: 'HS256'
        };

        try {
            result = jwt.verify(token, JWT_SECRET, options);
            req.decoded = result;
            next();
        }
        catch (err) {
            result = {
                error: `${err.message || err}`,
                authError:true,
                status: 401
            };

            res.status(401).send(result);
        }
    }
    else {
        result = {
            error: `Authentication error. Token required.`,
            authError:true,
            status: 401
        };

        res.status(401).send(result);
    }
}
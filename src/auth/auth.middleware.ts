import { NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export class AuthMiddleware implements NestMiddleware {
    resolve() {
        return (req, res, next: NextFunction) => {
            if (req.headers.authorization && (req.headers.authorization as string).split(' ')[0] === 'Bearer') {
                try{
                    const token = (req.headers.authorization as string).split(' ')[1];
                    const decoded = jwt.verify(token, process.env.JWT_SECRET);
                    req.userInfo = decoded;

                }
                catch (error){
                    if (error.name === 'TokenExpiredError') throw new HttpException('Expired token', HttpStatus.UNAUTHORIZED);
                        throw new HttpException('Authentication Error', HttpStatus.UNAUTHORIZED);
                }

                // TODO: check JWT with redis for user validity
                return next();
            }
            else {
                throw new HttpException('Unauthorized', 403);
            }
        };
    }
}
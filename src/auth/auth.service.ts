import * as jwt from 'jsonwebtoken';
import { Injectable, HttpException } from '@nestjs/common';
import { LoginDto } from './auth.dto';
import { JwtToken, JwtUserPayload } from './auth.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from '../user/user.model';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserModel>,
    ){}

    private async signJWT(payload: JwtUserPayload): Promise<string> {
        return await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRESIN});
    }

    public async findByEmailPassword(loginDto: LoginDto): Promise<JwtToken> {
        const foundUser = await this.userModel.findOne({
            $and: [
                { email: loginDto.email },
                { password: loginDto.password },
            ],
        });

        if (!foundUser) throw new HttpException('Email or password incorrect', 403);

        logger.info('User found with email %s', loginDto.email);

        const jwtUserPayload: JwtUserPayload = {
            id: foundUser._id,
            email: foundUser.email,
        };

        const token = await this.signJWT(jwtUserPayload);

        return new Promise<JwtToken>(
          (resolve, reject) => {
            resolve({token});
         });
    }
}
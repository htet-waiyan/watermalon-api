import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'user/user.schema';

declare var logger: any; // declaring global variables for logger

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema}])],
    exports: [],
})
export class AuthModule {}
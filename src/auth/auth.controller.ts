import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { JwtToken } from './auth.interface';

// TODO: Added Swagger API design
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ){}
    @Post('/login')
    public async login(@Body() loginDto: LoginDto): Promise<JwtToken> {
        return this.authService.findByEmailPassword(loginDto);
    }
}
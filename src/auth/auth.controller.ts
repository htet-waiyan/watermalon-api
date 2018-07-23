import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { JwtToken } from './auth.interface';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

// TODO: Added Swagger API design
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ){}
    @Post('/login')
    @ApiOperation({
        title: 'Login',
        description: 'Authentication by email/password',
    })
    @ApiResponse({status: 200, description: 'Login Successful'})
    @ApiResponse({status: 403, description: 'Authentication Failed'})
    public async login(@Body() loginDto: LoginDto): Promise<JwtToken> {
        return this.authService.findByEmailPassword(loginDto);
    }
}
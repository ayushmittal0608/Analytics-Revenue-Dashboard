import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto, response: Response): Promise<{
        message: string;
    }>;
    getMe(request: Request): Express.User | undefined;
    logout(response: Response): {
        message: string;
    };
}

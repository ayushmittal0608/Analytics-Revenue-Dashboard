import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken } = await this.authService.login(loginDto);
    response.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    });
    return {
      message: 'Login successful',
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@Req() request: Request) {
    return request.user;
  }

  @Post('logout')
  logout(
    @Res({ passthrough: true }) response: Response,
  ) {
    response.clearCookie('access_token');

    return {
      message: 'Logged out successfully',
    };
  }
}
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) =>
          request?.cookies?.access_token ?? null,
      ]),
      ignoreExpiration: false,
      secretOrKey:
        configService.getOrThrow<string>('JWT_SECRET'),
    });
  }
  async validate(payload: {
    sub: number;
    email: string;
    role: 'ADMIN' | 'MANAGER';
    region: 'NORTH' | 'SOUTH' | 'EAST' | 'WEST' | null;
  }) {
    const user = await this.usersService.findById(
      payload.sub,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
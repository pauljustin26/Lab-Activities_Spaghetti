// notes-backend/src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService){}

  async validateUser(email: string, pass: string){
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const ok = await bcrypt.compare(pass, user.password);
    if (ok) return user;
    return null;
  }

  async register(dto: RegisterDto){
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) throw new UnauthorizedException('Email already exists');

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create(dto.username, dto.email, hashed);

    return {
      _id: user._id,
      username: user.username,
      email: user.email
    };
  }

  async login(user: any){
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user: { _id: user._id, username: user.username, email: user.email },
    };
  }
}

// notes-backend/src/auth/auth.controller.ts
import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @Post('register')
  async register(@Body() dto: RegisterDto){
    try {
      return await this.authService.register(dto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('login')
  async login(@Body() body: { email: string, password: string }){
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) throw new BadRequestException('Invalid credentials');
    return this.authService.login(user);
  }

}

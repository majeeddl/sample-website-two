import { Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  /**
   *
   */
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Param('username') username: string, @Param('password') password: string) {
    return this.authService.login({
        username,
        password,
    });
  }
}

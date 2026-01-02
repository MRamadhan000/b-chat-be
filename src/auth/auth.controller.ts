import { Controller, Post, Body, HttpCode, HttpStatus, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto)

  }
  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto)
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async someMethod(@GetUser('id') userId: number) {
    const data = await this.authService.getUserProfile(userId)
    return {
      message : "Data Successfully Get",
      data : data
    }
  }

  @Get('all')
  async getAll() {
    const data = await this.authService.getAllUser()
    return {
      message : "Data Successfully Get",
      data : data
    }
  }
}
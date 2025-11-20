/* eslint-disable prettier/prettier */
import {Body,Controller,Post,Request,UseGuards,} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { UsersDto } from 'src/users/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: UsersDto) {
    const user = await this.authService.register(dto);
    return {
      message: 'Usuario registrado con éxito',
      userId: user.id,
    };
  }


  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}

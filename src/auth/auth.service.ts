/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UsersEntity } from 'src/users/users.entity';
import { UsersDto } from 'src/users/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) return null;

    const { password: _pw, ...result } = user;
    return result;
  }

  async login(user: any) {
    const roles = (user.roles ?? []).map((r: any) => r.role_name);

    const payload = {
      sub: user.id,
      email: user.email,
      roles, 
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(dto: UsersDto): Promise<UsersEntity> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = new UsersEntity();
    newUser.email = dto.email;
    newUser.password = hashedPassword;
    newUser.name = dto.name;
    newUser.phone = dto.phone;
    newUser.is_active = true;

    const created = await this.usersService.createUser(newUser);
    delete (created as any).password;
    return created;
  }
}


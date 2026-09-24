import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(
    @Body()
    body: {
      studentId: string;
      email: string;
      password: string;
      name: string;
    },
  ) {
    return this.usersService.createUser({
      studentId: body.studentId,
      email: body.email,
      password: body.password,
      name: body.name,
    });
  }

  @Post('login')
  async login(
    @Body()
    body: {
      identifier: string;
      password: string;
    },
  ) {
    const user = await this.usersService.validateLogin(
      body.identifier,
      body.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        studentId: user.studentId,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
}
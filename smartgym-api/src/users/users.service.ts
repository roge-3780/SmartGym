import { Injectable } from '@nestjs/common';
import argon2 from 'argon2';
import { db } from '../prisma/db.js';

@Injectable()
export class UsersService {
  async findByStudentId(studentId: string) {
    return db.orm.public.User.first({
      studentId,
    });
  }

  async findByEmail(email: string) {
    return db.orm.public.User.first({
      email,
    });
  }

  async createUser(data: {
    studentId: string;
    email: string;
    password: string;
    name: string;
  }) {
    const passwordHash = await argon2.hash(data.password);

    return db.orm.public.User.create({
      studentId: data.studentId,
      email: data.email,
      passwordHash,
      name: data.name,
    });
  }

  async validateLogin(identifier: string, password: string) {
    const user =
      (await this.findByStudentId(identifier)) ??
      (await this.findByEmail(identifier));

    if (!user) {
      return null;
    }

    const isValid = await argon2.verify(user.passwordHash, password);

    if (!isValid) {
      return null;
    }

    return user;
  }
}
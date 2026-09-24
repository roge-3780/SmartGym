import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { db } from '../prisma/db.js';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    // Prisma 8 ORM connection is initialized when `db` is used.
    console.log('Prisma database service initialized');
  }

  async onModuleDestroy() {
    // Connection cleanup is handled by the Prisma ORM runtime.
    console.log('Prisma database service destroyed');
  }

  get client() {
    return db;
  }
}
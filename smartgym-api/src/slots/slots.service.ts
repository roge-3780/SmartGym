import { Injectable } from '@nestjs/common';
import { db } from '../prisma/db.js';

@Injectable()
export class SlotsService {
  async getActiveSlots() {
    return db.orm.public.Slot.all();
  }

  async createSlot(data: {
    startTime: string;
    endTime: string;
    capacity?: number;
  }) {
    return db.orm.public.Slot.create({
      startTime: data.startTime,
      endTime: data.endTime,
      capacity: data.capacity ?? 30,
      isActive: true,
    });
  }
}
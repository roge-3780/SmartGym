import { Body, Controller, Get, Post } from '@nestjs/common';
import { SlotsService } from './slots.service.js';

@Controller('slots')
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @Get()
  async getActiveSlots() {
    return this.slotsService.getActiveSlots();
  }

  @Post()
  async createSlot(
    @Body()
    body: {
      startTime: string;
      endTime: string;
      capacity?: number;
    },
  ) {
    return this.slotsService.createSlot(body);
  }
}
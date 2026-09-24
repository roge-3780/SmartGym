import { Module } from '@nestjs/common';
import { SlotsService } from './slots.service.js';
import { SlotsController } from './slots.controller.js';

@Module({
  providers: [SlotsService],
  controllers: [SlotsController]
})
export class SlotsModule {}

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { BookingsService } from './bookings.service.js';

@Controller('bookings')
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
  ) {}

  @Post()
  createBooking(
    @Body()
    body: {
      userId: number;
      slotId: number;
    },
  ) {
    return this.bookingsService.createBooking(body);
  }

  @Get('user/:userId')
  getUserBookings(
    @Param('userId') userId: string,
  ) {
    return this.bookingsService.getUserBookings(
      Number(userId),
    );
  }

  @Post(':id/cancel')
  cancelBooking(
    @Param('id') id: string,
    @Body() body: { userId: number },
  ) {
    return this.bookingsService.cancelBooking({
      bookingId: Number(id),
      userId: body.userId,
    });
  }
}
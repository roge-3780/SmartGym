import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { db } from '../prisma/db.js';

@Injectable()
export class BookingsService {
  async createBooking(data: {
    userId: number;
    slotId: number;
  }) {
    return db.transaction(async (tx) => {
      const lockQuery = db.raw.sql`
        SELECT "id"
        FROM "slot"
        WHERE "id" = ${data.slotId}
        FOR UPDATE
      `
        .returnsRow({
          id: tx.sql.public.slot.columns.id,
        })
        .build();

      const lockedSlot = await tx.query(lockQuery);

      if (lockedSlot.length === 0) {
        throw new NotFoundException('Slot not found.');
      }

      const user = await tx.orm.public.User.first({
        id: data.userId,
      });

      if (!user) {
        throw new NotFoundException('User not found.');
      }

      const slot = await tx.orm.public.Slot.first({
        id: data.slotId,
      });

      if (!slot) {
        throw new NotFoundException('Slot not found.');
      }

      if (!slot.isActive) {
        throw new BadRequestException(
          'This slot is not active.',
        );
      }

      const existingBooking =
        await tx.orm.public.Booking.first({
          userId: data.userId,
          slotId: data.slotId,
        });

      if (
        existingBooking &&
        existingBooking.status === 'CONFIRMED'
      ) {
        throw new BadRequestException(
          'You have already booked this slot.',
        );
      }

      const result = await tx.orm.public.Booking
        .where({
          slotId: data.slotId,
          status: 'CONFIRMED',
        })
        .aggregate((a) => ({
          total: a.count(),
        }));

      if (result.total >= slot.capacity) {
        throw new BadRequestException(
          'This slot is full. Please choose another slot.',
        );
      }

      return tx.orm.public.Booking.create({
        userId: data.userId,
        slotId: data.slotId,
        status: 'CONFIRMED',
        attendanceStatus: 'PENDING',
      });
    });
  }

  async cancelBooking(data: {
    bookingId: number;
    userId: number;
  }) {
    return db.transaction(async (tx) => {
      const booking = await tx.orm.public.Booking.first({
        id: data.bookingId,
      });

      if (!booking) {
        throw new NotFoundException('Booking not found.');
      }

      if (booking.userId !== data.userId) {
        throw new BadRequestException(
          "You cannot cancel another user's booking.",
        );
      }

      if (booking.status !== 'CONFIRMED') {
        throw new BadRequestException(
          'This booking is not active.',
        );
      }

      const slot = await tx.orm.public.Slot.first({
        id: booking.slotId,
      });

      if (!slot) {
        throw new NotFoundException('Slot not found.');
      }

      const now = new Date();
      const slotStart = new Date(slot.startTime);

      const hoursUntilSlot =
        (slotStart.getTime() - now.getTime()) /
        (1000 * 60 * 60);

      if (hoursUntilSlot < 6) {
        throw new BadRequestException(
          'Bookings can only be cancelled at least 6 hours before the slot.',
        );
      }

      const updateQuery = db.raw.sql`
        UPDATE "booking"
        SET
          "status" = 'CANCELLED',
          "cancelledAt" = ${now.toISOString()}
        WHERE
          "id" = ${data.bookingId}
          AND "userId" = ${data.userId}
          AND "status" = 'CONFIRMED'
      `
        .affectedCount()
        .build();

      const updateResult = await tx.execute(updateQuery);

      if (updateResult.affectedRows === 0) {
        throw new BadRequestException(
          'Booking could not be cancelled.',
        );
      }

      return tx.orm.public.Booking.first({
        id: data.bookingId,
      });
    });
  }

  async getUserBookings(userId: number) {
    const user = await db.orm.public.User.first({
      id: userId,
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return db.orm.public.Booking
      .where({
        userId,
      })
      .all();
  }
}
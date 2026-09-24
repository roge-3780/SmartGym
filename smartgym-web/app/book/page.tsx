'use client';

import { useEffect, useState } from 'react';

type Slot = {
  id: number;
  startTime: string;
  endTime: string;
  capacity: number;
  isActive: boolean;
};

type Booking = {
  id: number;
  slotId: number;
  status: string;
  attendanceStatus: string;
};

export default function BookPage() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [bookedSlots, setBookedSlots] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingSlot, setBookingSlot] =
    useState<number | null>(null);
  const [message, setMessage] = useState('');

  // Temporary test user.
  // Later this will come from authentication.
  const userId = 36;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [slotsResponse, bookingsResponse] =
        await Promise.all([
          fetch('http://localhost:4000/slots', {
            cache: 'no-store',
          }),

          fetch(
            `http://localhost:4000/bookings/user/${userId}`,
            {
              cache: 'no-store',
            },
          ),
        ]);

      if (!slotsResponse.ok) {
        throw new Error('Failed to load slots.');
      }

      if (!bookingsResponse.ok) {
        throw new Error('Failed to load bookings.');
      }

      const slotsData: Slot[] =
        await slotsResponse.json();

      const bookingsData: Booking[] =
        await bookingsResponse.json();

      const confirmedSlotIds = bookingsData
        .filter(
          (booking) =>
            booking.status === 'CONFIRMED',
        )
        .map((booking) => booking.slotId);

      setSlots(slotsData);
      setBookedSlots(confirmedSlotIds);
    } catch (error) {
      console.error(error);
      setMessage('Unable to load gym data.');
    } finally {
      setLoading(false);
    }
  };

  const bookSlot = async (slotId: number) => {
    setBookingSlot(slotId);
    setMessage('');

    try {
      const response = await fetch(
        'http://localhost:4000/bookings',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
          body: JSON.stringify({
            userId,
            slotId,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message || 'Booking failed.',
        );
        return;
      }

      setBookedSlots((current) => [
        ...current,
        slotId,
      ]);

      setMessage('Slot booked successfully!');
    } catch (error) {
      console.error(error);
      setMessage(
        'Unable to connect to the server.',
      );
    } finally {
      setBookingSlot(null);
    }
  };

  const formatDateTime = (value: string) => {
    return new Date(value).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">
          Gym Slots
        </h1>

        <p className="mt-2 text-slate-400">
          Select a slot to book your gym session.
        </p>

        {message && (
          <div className="mt-6 rounded-lg border border-blue-500/30 bg-blue-500/10 p-4 text-blue-300">
            {message}
          </div>
        )}

        {loading ? (
          <div className="mt-8 text-slate-400">
            Loading gym data...
          </div>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {slots.map((slot) => {
              const isBooked =
                bookedSlots.includes(slot.id);

              const isBooking =
                bookingSlot === slot.id;

              return (
                <div
                  key={slot.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">
                      Slot #{slot.id}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        isBooked
                          ? 'bg-blue-500/10 text-blue-400'
                          : slot.isActive
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-red-500/10 text-red-400'
                      }`}
                    >
                      {isBooked
                        ? 'Booked'
                        : slot.isActive
                          ? 'Available'
                          : 'Inactive'}
                    </span>
                  </div>

                  <div className="mt-5">
                    <p className="text-sm text-slate-400">
                      Starts
                    </p>

                    <p className="mt-1 font-medium">
                      {formatDateTime(
                        slot.startTime,
                      )}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-slate-400">
                      Ends
                    </p>

                    <p className="mt-1 font-medium">
                      {formatDateTime(
                        slot.endTime,
                      )}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-slate-400">
                      Capacity
                    </p>

                    <p className="mt-1 font-medium">
                      {slot.capacity} students
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      bookSlot(slot.id)
                    }
                    disabled={
                      !slot.isActive ||
                      isBooked ||
                      isBooking
                    }
                    className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 font-medium transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
                  >
                    {isBooking
                      ? 'Booking...'
                      : isBooked
                        ? 'Booked'
                        : 'Book Slot'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
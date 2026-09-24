'use client';

import { useEffect, useState } from 'react';

type Booking = {
  id: number;
  slotId: number;
  status: string;
  attendanceStatus: string;
  bookedAt: string;
  cancelledAt: string | null;
};

type Slot = {
  id: number;
  startTime: string;
  endTime: string;
};

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] =
    useState<number | null>(null);
  const [message, setMessage] = useState('');

  // Temporary test user.
  // Later this will come from authentication.
  const userId = 36;

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const [bookingsResponse, slotsResponse] =
        await Promise.all([
          fetch(
            `http://localhost:4000/bookings/user/${userId}`,
          ),
          fetch('http://localhost:4000/slots'),
        ]);

      if (!bookingsResponse.ok) {
        throw new Error(
          'Failed to load bookings.',
        );
      }

      if (!slotsResponse.ok) {
        throw new Error(
          'Failed to load slots.',
        );
      }

      const bookingsData =
        await bookingsResponse.json();

      const slotsData =
        await slotsResponse.json();

      setBookings(bookingsData);
      setSlots(slotsData);
    } catch (error) {
      console.error(error);
      setMessage(
        'Unable to load your bookings.',
      );
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (
    bookingId: number,
  ) => {
    const confirmed = window.confirm(
      'Are you sure you want to cancel this booking?',
    );

    if (!confirmed) {
      return;
    }

    setCancellingId(bookingId);
    setMessage('');

    try {
      const response = await fetch(
        `http://localhost:4000/bookings/${bookingId}/cancel`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            'Unable to cancel booking.',
        );
        return;
      }

      setMessage(
        'Booking cancelled successfully.',
      );

      // Reload from the backend so the UI
      // always reflects the database.
      await loadBookings();
    } catch (error) {
      console.error(error);
      setMessage(
        'Unable to connect to the server.',
      );
    } finally {
      setCancellingId(null);
    }
  };

  const getSlot = (slotId: number) => {
    return slots.find(
      (slot) => slot.id === slotId,
    );
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
          My Bookings
        </h1>

        <p className="mt-2 text-slate-400">
          View and manage your gym bookings.
        </p>

        {message && (
          <div className="mt-6 rounded-lg border border-blue-500/30 bg-blue-500/10 p-4 text-blue-300">
            {message}
          </div>
        )}

        {loading ? (
          <div className="mt-8 text-slate-400">
            Loading your bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
            <p className="text-slate-400">
              You don't have any bookings yet.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            {bookings.map((booking) => {
              const slot = getSlot(
                booking.slotId,
              );

              const isConfirmed =
                booking.status === 'CONFIRMED';

              const isCancelling =
                cancellingId === booking.id;

              return (
                <div
                  key={booking.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm text-slate-400">
                        Booking #{booking.id}
                      </p>

                      <h2 className="mt-1 text-xl font-semibold">
                        Gym Slot #{booking.slotId}
                      </h2>

                      {slot && (
                        <div className="mt-3 space-y-1 text-sm text-slate-300">
                          <p>
                            Start:{' '}
                            {formatDateTime(
                              slot.startTime,
                            )}
                          </p>

                          <p>
                            End:{' '}
                            {formatDateTime(
                              slot.endTime,
                            )}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-start gap-3 md:items-end">
                      <div className="flex items-center gap-3">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${
                            isConfirmed
                              ? 'bg-green-500/10 text-green-400'
                              : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {booking.status}
                        </span>

                        <span className="text-sm text-slate-400">
                          Attendance:{' '}
                          {booking.attendanceStatus}
                        </span>
                      </div>

                      {isConfirmed && (
                        <button
                          onClick={() =>
                            cancelBooking(
                              booking.id,
                            )
                          }
                          disabled={isCancelling}
                          className="rounded-lg border border-red-500/40 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isCancelling
                            ? 'Cancelling...'
                            : 'Cancel Booking'}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 border-t border-slate-800 pt-4 text-sm text-slate-500">
                    Booked on:{' '}
                    {formatDateTime(
                      booking.bookedAt,
                    )}

                    {booking.cancelledAt && (
                      <span className="ml-4">
                        Cancelled on:{' '}
                        {formatDateTime(
                          booking.cancelledAt,
                        )}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
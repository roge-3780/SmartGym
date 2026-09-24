"use client";

import { useState } from "react";

export default function StudentDashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const upcomingSessions = [
    {
      date: "Today",
      time: "06:00 PM – 07:00 PM",
      status: "Confirmed",
    },
    {
      date: "Tomorrow",
      time: "07:00 AM – 08:00 AM",
      status: "Confirmed",
    },
  ];

  const recentBookings = [
    {
      date: "Sep 18, 2026",
      time: "06:00 PM – 07:00 PM",
      status: "Attended",
    },
    {
      date: "Sep 15, 2026",
      time: "07:00 AM – 08:00 AM",
      status: "Attended",
    },
    {
      date: "Sep 12, 2026",
      time: "06:00 PM – 07:00 PM",
      status: "Cancelled",
    },
  ];

  return (
    <div className="min-h-screen bg-[#07111f] text-white">

      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden w-64 flex-col border-r border-white/10 bg-[#0a1628] md:flex">

          {/* Logo */}
          <div className="border-b border-white/10 px-6 py-6">
            <div className="text-2xl font-bold tracking-tight">
              Smart<span className="text-blue-400">Gym</span>
            </div>

            <p className="mt-1 text-xs text-slate-400">
              University Gym
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">

            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Menu
            </p>

            <div className="space-y-1">

              {[
                { name: "Dashboard", icon: "▦" },
                { name: "Book a Slot", icon: "◷" },
                { name: "My Bookings", icon: "▤" },
                { name: "Waitlist", icon: "◌" },
                { name: "Profile", icon: "♙" },
              ].map((item) => (

                <button
                  key={item.name}
                  onClick={() => setActiveMenu(item.name)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                    activeMenu === item.name
                      ? "bg-blue-500/15 text-blue-400"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="w-5 text-center text-lg">
                    {item.icon}
                  </span>

                  {item.name}
                </button>

              ))}

            </div>
          </nav>

          {/* Account */}
          <div className="border-t border-white/10 p-4">

            <div className="rounded-xl bg-white/5 p-4">

              <p className="text-xs text-slate-500">
                Logged in as
              </p>

              <p className="mt-1 text-sm font-medium">
                Sri Vibhu
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Student ID: STU1024
              </p>

            </div>

            <button className="mt-3 w-full rounded-lg px-3 py-2 text-left text-sm text-slate-400 transition hover:bg-red-500/10 hover:text-red-400">
              ↪ Sign Out
            </button>

          </div>

        </aside>

        {/* Main */}
        <main className="flex-1">

          {/* Header */}
          <header className="flex items-center justify-between border-b border-white/10 bg-[#07111f]/80 px-6 py-5 backdrop-blur md:px-8">

            <div>

              <p className="text-sm text-slate-400">
                University Gym
              </p>

              <h1 className="mt-1 text-2xl font-bold">
                Student Dashboard
              </h1>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 font-semibold text-blue-400">
              S
            </div>

          </header>

          <div className="p-6 md:p-8">

            {/* Welcome */}
            <div className="mb-8">

              <h2 className="text-2xl font-semibold">
                Welcome back, Sri 👋
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Manage your gym sessions and keep your fitness routine on track.
              </p>

            </div>

            {/* Eligibility Banner */}
            <div className="mb-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">

              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xl text-emerald-400">
                    ✓
                  </div>

                  <div>

                    <h3 className="font-semibold text-emerald-300">
                      You are eligible to book
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      Your current booking window is{" "}
                      <span className="font-medium text-white">
                        15 days
                      </span>
                      .
                    </p>

                  </div>

                </div>

                <button className="rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-400">
                  Book a Slot
                </button>

              </div>

            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              {/* Booking Window */}
              <div className="rounded-2xl border border-white/10 bg-[#0a1628] p-5">

                <p className="text-sm text-slate-400">
                  Booking Window
                </p>

                <div className="mt-3 flex items-end justify-between">

                  <p className="text-3xl font-bold">
                    15
                  </p>

                  <span className="text-sm text-slate-500">
                    days
                  </span>

                </div>

              </div>

              {/* Attendance */}
              <div className="rounded-2xl border border-white/10 bg-[#0a1628] p-5">

                <p className="text-sm text-slate-400">
                  Attendance
                </p>

                <div className="mt-3 flex items-end justify-between">

                  <p className="text-3xl font-bold text-emerald-400">
                    91%
                  </p>

                  <span className="text-sm text-slate-500">
                    overall
                  </span>

                </div>

              </div>

              {/* No Shows */}
              <div className="rounded-2xl border border-white/10 bg-[#0a1628] p-5">

                <p className="text-sm text-slate-400">
                  No-Shows
                </p>

                <div className="mt-3 flex items-end justify-between">

                  <p className="text-3xl font-bold">
                    1
                  </p>

                  <span className="text-sm text-slate-500">
                    last 60 days
                  </span>

                </div>

              </div>

              {/* Active Bookings */}
              <div className="rounded-2xl border border-white/10 bg-[#0a1628] p-5">

                <p className="text-sm text-slate-400">
                  Active Bookings
                </p>

                <div className="mt-3 flex items-end justify-between">

                  <p className="text-3xl font-bold text-blue-400">
                    2
                  </p>

                  <span className="text-sm text-slate-500">
                    upcoming
                  </span>

                </div>

              </div>

            </div>

            {/* Upcoming + Quick Info */}
            <div className="mt-6 grid gap-6 lg:grid-cols-3">

              {/* Upcoming Sessions */}
              <div className="rounded-2xl border border-white/10 bg-[#0a1628] lg:col-span-2">

                <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

                  <div>

                    <h3 className="font-semibold">
                      Upcoming Sessions
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Your confirmed gym sessions
                    </p>

                  </div>

                  <button className="text-sm text-blue-400 hover:text-blue-300">
                    View all →
                  </button>

                </div>

                <div className="divide-y divide-white/5">

                  {upcomingSessions.map((session, index) => (

                    <div
                      key={index}
                      className="flex flex-col justify-between gap-4 px-6 py-5 sm:flex-row sm:items-center"
                    >

                      <div className="flex items-center gap-4">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                          ◷
                        </div>

                        <div>

                          <p className="font-medium">
                            {session.time}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {session.date}
                          </p>

                        </div>

                      </div>

                      <div className="flex items-center gap-3">

                        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                          {session.status}
                        </span>

                        <button className="rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-400 hover:bg-white/5 hover:text-white">
                          Cancel
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

              {/* Booking Rules */}
              <div className="rounded-2xl border border-white/10 bg-[#0a1628] p-6">

                <h3 className="font-semibold">
                  Booking Rules
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Your current limits
                </p>

                <div className="mt-5 space-y-4">

                  <div className="rounded-xl bg-white/5 p-4">

                    <p className="text-xs text-slate-500">
                      Booking window
                    </p>

                    <p className="mt-1 font-medium">
                      15 days
                    </p>

                  </div>

                  <div className="rounded-xl bg-white/5 p-4">

                    <p className="text-xs text-slate-500">
                      Active bookings
                    </p>

                    <p className="mt-1 font-medium">
                      2 maximum
                    </p>

                  </div>

                  <div className="rounded-xl bg-white/5 p-4">

                    <p className="text-xs text-slate-500">
                      Cancellation deadline
                    </p>

                    <p className="mt-1 font-medium">
                      6 hours before
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Recent History */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-[#0a1628]">

              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

                <div>

                  <h3 className="font-semibold">
                    Recent Booking History
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Your recent gym activity
                  </p>

                </div>

                <button className="text-sm text-blue-400 hover:text-blue-300">
                  View history →
                </button>

              </div>

              <div className="overflow-x-auto">

                <table className="w-full text-left text-sm">

                  <thead className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">

                    <tr>
                      <th className="px-6 py-4">
                        Date
                      </th>

                      <th className="px-6 py-4">
                        Slot
                      </th>

                      <th className="px-6 py-4">
                        Status
                      </th>
                    </tr>

                  </thead>

                  <tbody>

                    {recentBookings.map((booking, index) => (

                      <tr
                        key={index}
                        className="border-b border-white/5 last:border-0"
                      >

                        <td className="px-6 py-4 text-slate-300">
                          {booking.date}
                        </td>

                        <td className="px-6 py-4 text-slate-400">
                          {booking.time}
                        </td>

                        <td className="px-6 py-4">

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              booking.status === "Attended"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-yellow-500/10 text-yellow-400"
                            }`}
                          >
                            {booking.status}
                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

            {/* Prototype Notice */}
            <div className="mt-6 rounded-xl border border-blue-500/20 bg-blue-500/5 px-5 py-4">

              <p className="text-sm text-blue-300">
                <span className="font-semibold">
                  Prototype Mode:
                </span>{" "}
                Your booking, attendance and eligibility data are currently
                dummy data. These will be connected to the SmartGym backend
                later.
              </p>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}
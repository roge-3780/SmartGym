"use client";

import { useState } from "react";

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: "▦" },
    { name: "Slots", icon: "◷" },
    { name: "Bookings", icon: "▤" },
    { name: "Students", icon: "♙" },
    { name: "Waitlist", icon: "◌" },
    { name: "Penalties", icon: "⚠" },
    { name: "Analytics", icon: "⌁" },
    { name: "Settings", icon: "⚙" },
  ];

  const recentBookings = [
    {
      student: "Rahul Kumar",
      id: "STU1024",
      slot: "06:00 AM – 07:00 AM",
      date: "Today",
      status: "Confirmed",
    },
    {
      student: "Ananya Reddy",
      id: "STU1187",
      slot: "07:00 AM – 08:00 AM",
      date: "Today",
      status: "Confirmed",
    },
    {
      student: "Arjun Sharma",
      id: "STU0932",
      slot: "05:00 PM – 06:00 PM",
      date: "Today",
      status: "Cancelled",
    },
    {
      student: "Priya Singh",
      id: "STU1456",
      slot: "06:00 PM – 07:00 PM",
      date: "Tomorrow",
      status: "Confirmed",
    },
  ];

  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden w-64 flex-col border-r border-white/10 bg-[#0a1628] md:flex">

          <div className="border-b border-white/10 px-6 py-6">
            <div className="text-2xl font-bold tracking-tight">
              Smart<span className="text-blue-400">Gym</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Admin Management Portal
            </p>
          </div>

          <nav className="flex-1 px-4 py-6">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Management
            </p>

            <div className="space-y-1">
              {menuItems.map((item) => (
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

          <div className="border-t border-white/10 p-4">
            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-xs text-slate-500">Logged in as</p>
              <p className="mt-1 text-sm font-medium">Gym Administrator</p>
              <p className="mt-1 text-xs text-slate-500">
                admin@university.edu
              </p>
            </div>

            <button className="mt-3 w-full rounded-lg px-3 py-2 text-left text-sm text-slate-400 transition hover:bg-red-500/10 hover:text-red-400">
              ↪ Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">

          {/* Top Header */}
          <header className="flex items-center justify-between border-b border-white/10 bg-[#07111f]/80 px-6 py-5 backdrop-blur md:px-8">

            <div>
              <p className="text-sm text-slate-400">
                University Gym Management
              </p>
              <h1 className="mt-1 text-2xl font-bold">
                Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium">Gym Administrator</p>
                <p className="text-xs text-slate-500">
                  Administrator
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 font-semibold text-blue-400">
                A
              </div>
            </div>
          </header>

          <div className="p-6 md:p-8">

            {/* Welcome */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold">
                Good morning, Admin 👋
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Here's what's happening at the gym today.
              </p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              <div className="rounded-2xl border border-white/10 bg-[#0a1628] p-5">
                <p className="text-sm text-slate-400">
                  Today's Capacity
                </p>
                <div className="mt-3 flex items-end justify-between">
                  <p className="text-3xl font-bold">180</p>
                  <span className="text-sm text-slate-500">
                    total spots
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0a1628] p-5">
                <p className="text-sm text-slate-400">
                  Booked Today
                </p>
                <div className="mt-3 flex items-end justify-between">
                  <p className="text-3xl font-bold text-blue-400">
                    137
                  </p>
                  <span className="text-sm text-slate-500">
                    bookings
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0a1628] p-5">
                <p className="text-sm text-slate-400">
                  Available
                </p>
                <div className="mt-3 flex items-end justify-between">
                  <p className="text-3xl font-bold text-emerald-400">
                    43
                  </p>
                  <span className="text-sm text-slate-500">
                    spots left
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0a1628] p-5">
                <p className="text-sm text-slate-400">
                  Utilization
                </p>
                <div className="mt-3 flex items-end justify-between">
                  <p className="text-3xl font-bold">76%</p>
                  <span className="text-sm text-emerald-400">
                    Today
                  </span>
                </div>
              </div>

            </div>

            {/* Middle Section */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">

              {/* Utilization */}
              <div className="rounded-2xl border border-white/10 bg-[#0a1628] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">
                      Gym Utilization
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Today's overall booking utilization
                    </p>
                  </div>

                  <span className="text-2xl font-bold text-blue-400">
                    76%
                  </span>
                </div>

                <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{ width: "76%" }}
                  />
                </div>

                <div className="mt-4 flex justify-between text-xs text-slate-500">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Peak Hours */}
              <div className="rounded-2xl border border-white/10 bg-[#0a1628] p-6">
                <h3 className="font-semibold">
                  Peak Hours
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Most requested gym slots
                </p>

                <div className="mt-5 space-y-4">

                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span>6:00 PM – 7:00 PM</span>
                      <span className="text-slate-400">92%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: "92%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span>7:00 PM – 8:00 PM</span>
                      <span className="text-slate-400">87%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: "87%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span>5:00 PM – 6:00 PM</span>
                      <span className="text-slate-400">74%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: "74%" }}
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-[#0a1628]">

              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <div>
                  <h3 className="font-semibold">
                    Recent Bookings
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Latest gym reservations
                  </p>
                </div>

                <button className="text-sm text-blue-400 hover:text-blue-300">
                  View all →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">

                  <thead className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-6 py-4">Student</th>
                      <th className="px-6 py-4">Student ID</th>
                      <th className="px-6 py-4">Slot</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentBookings.map((booking, index) => (
                      <tr
                        key={index}
                        className="border-b border-white/5 last:border-0"
                      >
                        <td className="px-6 py-4 font-medium">
                          {booking.student}
                        </td>

                        <td className="px-6 py-4 text-slate-400">
                          {booking.id}
                        </td>

                        <td className="px-6 py-4 text-slate-300">
                          {booking.slot}
                        </td>

                        <td className="px-6 py-4 text-slate-400">
                          {booking.date}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              booking.status === "Confirmed"
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
                <span className="font-semibold">Prototype Mode:</span>{" "}
                Dashboard data is currently dummy data. Real bookings,
                students and analytics will be connected after the backend
                and database are implemented.
              </p>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:4000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Invalid credentials.');
        return;
      }

      setMessage(`Welcome, ${data.user.name}! Login successful.`);

      console.log('Logged in user:', data.user);

      setTimeout(() => {
        router.push('/dashboard');
      }, 500);
    } catch {
      setMessage('Unable to connect to the server.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold">
            Smart<span className="text-blue-400">Gym</span>
          </div>

          <p className="text-slate-400 mt-2">
            University Gym Management
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">

          <h1 className="text-2xl font-bold mb-2">
            Welcome Back
          </h1>

          <p className="text-slate-400 text-sm mb-7">
            Login to manage your gym sessions.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Student ID / Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Student ID or University Email
              </label>

              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter your student ID or email"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-blue-400 transition"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-slate-300">
                  Password
                </label>

                <a
                  href="#"
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  Forgot password?
                </a>
              </div>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-blue-400 transition"
              />
            </div>

            {/* Message */}
            {message && (
              <div className="text-sm text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-xl px-4 py-3">
                {message}
              </div>
            )}

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-blue-500 hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

          </form>

          {/* Signup */}
          <p className="text-center text-sm text-slate-400 mt-6">
            Don't have an account?{' '}
            <a
              href="/signup"
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Create an account
            </a>
          </p>
        </div>

        {/* Back */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-slate-500 hover:text-slate-300 transition"
          >
            ← Back to SmartGym
          </a>
        </div>

      </div>
    </main>
  );
}
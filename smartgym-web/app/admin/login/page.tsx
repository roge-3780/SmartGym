export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold">
            Smart<span className="text-blue-400">Gym</span>
          </div>

          <p className="text-slate-400 mt-2">
            Administration Portal
          </p>
        </div>

        {/* Admin Login Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <span className="text-blue-400 text-lg">
                ⚙
              </span>
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                Admin Login
              </h1>

              <p className="text-slate-500 text-xs mt-1">
                Sports Council Administration
              </p>
            </div>
          </div>

          <form className="space-y-5">

            {/* Admin Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Admin Email
              </label>

              <input
                type="email"
                placeholder="admin@university.edu"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-blue-400 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-blue-400 transition"
              />
            </div>

            {/* Login */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold transition"
            >
              Sign in to Admin Portal
            </button>

          </form>

          <div className="mt-6 pt-6 border-t border-slate-800">
            <p className="text-xs text-slate-500 text-center">
              Authorized personnel only
            </p>
          </div>

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
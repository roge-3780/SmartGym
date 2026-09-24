export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tight">
          Smart<span className="text-blue-400">Gym</span>
        </div>

        <div className="text-sm text-slate-400">
          University Gym Management
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 pt-20 pb-24">
        <div className="max-w-3xl">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-6">
            Smart Gym Slot Management
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Your gym.
            <br />
            <span className="text-blue-400">Your schedule.</span>
          </h1>

          <p className="mt-6 text-lg text-slate-400 max-w-2xl leading-8">
            Book your university gym slot easily, manage your sessions,
            and get fair access to limited gym capacity.
          </p>

          <div className="mt-10 flex gap-4">
            <button className="px-7 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold transition">
              Student Login
            </button>

            <button className="px-7 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 font-semibold transition">
              How it works
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <h2 className="text-2xl font-bold mb-10">
            Built for a better gym experience
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Feature
              title="Dynamic Booking"
              description="Book available gym slots based on your eligibility and usage history."
            />

            <Feature
              title="Fair Access"
              description="Limited slots are allocated safely without allowing overbooking."
            />

            <Feature
              title="Smart Management"
              description="Sports Council gets useful data about gym utilization and demand."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-8 py-8 text-sm text-slate-500">
          SmartGym — University Gym Management System
        </div>
      </footer>
    </main>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>

      <p className="text-slate-400 leading-7">
        {description}
      </p>
    </div>
  );
}
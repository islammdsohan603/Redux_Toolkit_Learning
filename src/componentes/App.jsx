"use client";

import { CounterView } from "@/app/features/counter/counterView";

const App = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      {/* Background Accent Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
      </div>

      {/* Main Card Container */}
      <div className="relative w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-indigo-950/20">
        {/* Header Section */}
        <header className="text-center mb-8">
          <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider text-indigo-400 uppercase bg-indigo-500/10 border border-indigo-500/20 rounded-full">
            Redux Toolkit
          </span>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Counter App
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            State Management Made Simple
          </p>
        </header>

        {/* Counter Component */}
        <CounterView />
      </div>
    </main>
  );
};

export default App;
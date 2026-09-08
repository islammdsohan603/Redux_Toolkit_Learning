"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "./counterSlice";
import { Plus, Minus, RotateCcw } from "lucide-react";

export const CounterView = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Counter Display Area */}
      <div className="relative flex items-center justify-center w-full py-8 bg-slate-950/50 border border-slate-800/80 rounded-2xl shadow-inner overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-indigo-500/5 to-transparent pointer-events-none" />
        <span className="text-6xl font-black tracking-tight text-white drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]">
          {count}
        </span>
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-3 gap-3 w-full">
        <button
          onClick={() => dispatch(decrement())}
          className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl font-medium bg-slate-800 hover:bg-rose-500/20 hover:border-rose-500/40 border border-slate-700/60 text-slate-200 hover:text-rose-400 transition-all active:scale-95 shadow-sm"
          title="Decrease"
        >
          <Minus className="w-5 h-5" />
        </button>

        <button
          onClick={() => dispatch(reset())}
          className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl font-medium bg-slate-800 hover:bg-amber-500/20 hover:border-amber-500/40 border border-slate-700/60 text-slate-200 hover:text-amber-400 transition-all active:scale-95 shadow-sm"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={() => dispatch(increment())}
          className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-all active:scale-95 shadow-lg shadow-indigo-600/30"
          title="Increase"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
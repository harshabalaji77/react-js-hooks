import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4 hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(124,111,234,0.15)] transition-all duration-200">
      <div>
        <h2 className="text-base font-semibold text-zinc-100">Counter</h2>
        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">useState holds a number and updates it on every click.</p>
      </div>

      <div className="text-5xl font-bold font-mono text-violet-400 text-center py-4 tracking-tight">
        {count}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setCount(count - 1)}
          className="flex-1 py-2 rounded-lg text-sm font-semibold bg-rose-500/90 text-white hover:bg-rose-500 active:scale-95 transition-all cursor-pointer"
        >
          − Decrease
        </button>
        <button
          onClick={() => setCount(0)}
          className="flex-1 py-2 rounded-lg text-sm font-semibold bg-zinc-700 text-zinc-200 hover:bg-zinc-600 active:scale-95 transition-all cursor-pointer"
        >
          Reset
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="flex-1 py-2 rounded-lg text-sm font-semibold bg-violet-500 text-white hover:bg-violet-400 active:scale-95 transition-all cursor-pointer"
        >
          + Increase
        </button>
      </div>
    </div>
  )
}

function Toggle() {
  const [isOn, setIsOn] = useState(false)

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4 hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(124,111,234,0.15)] transition-all duration-200">
      <div>
        <h2 className="text-base font-semibold text-zinc-100">Toggle</h2>
        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">useState holds a boolean and flips it on each click.</p>
      </div>

      <div className={`text-center text-2xl font-bold py-5 rounded-lg border transition-all duration-300 ${
        isOn
          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
          : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
      }`}>
        {isOn ? '✅ ON' : '❌ OFF'}
      </div>

      <button
        onClick={() => setIsOn(!isOn)}
        className="py-2 rounded-lg text-sm font-semibold bg-violet-500 text-white hover:bg-violet-400 active:scale-95 transition-all cursor-pointer"
      >
        Toggle
      </button>
    </div>
  )
}

function TextInput() {
  const [text, setText] = useState('')

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4 hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(124,111,234,0.15)] transition-all duration-200">
      <div>
        <h2 className="text-base font-semibold text-zinc-100">Text Input</h2>
        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">useState stores what you type and re-renders the output live.</p>
      </div>

      <input
        type="text"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-violet-500 transition-colors"
      />

      <div className="bg-zinc-800 border border-dashed border-zinc-700 rounded-lg px-4 py-3 text-sm min-h-11">
        {text
          ? <span className="text-zinc-100">You typed: <strong className="text-violet-400">{text}</strong></span>
          : <span className="text-zinc-500 italic">Nothing typed yet</span>
        }
      </div>
    </div>
  )
}

export default function UseStateDemo() {
  return (
    <section className="max-w-4xl mx-auto flex flex-col gap-10">

      <div className="flex flex-col gap-3">
        <span className="inline-block bg-violet-500/15 text-violet-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest w-fit">
          Hook #1
        </span>
        <h1 className="text-4xl font-bold font-mono text-violet-400 leading-none">useState</h1>
        <p className="text-sm text-zinc-400 leading-relaxed max-w-lg">
          Adds local state to a functional component. React re-renders the component whenever the state changes.
        </p>
        <div className="bg-zinc-900 border border-zinc-800 border-l-2 border-l-violet-500 rounded-lg px-4 py-3 w-fit">
          <code className="font-mono text-sm text-violet-400">
            const [value, setValue] = useState(initialValue)
          </code>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <Counter />
        <Toggle />
        <TextInput />
      </div>

    </section>
  )
}

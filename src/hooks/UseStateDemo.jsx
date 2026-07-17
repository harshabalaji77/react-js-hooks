import { useState } from 'react'

/* ─────────────────────────────────────────
   Shared primitives
───────────────────────────────────────── */

const Card = ({ children }) => (
  <div className="border border-zinc-800/70 rounded-2xl bg-[#111113] overflow-hidden flex flex-col">
    {children}
  </div>
)

const CardHeader = ({ label, title, desc }) => (
  <div className="px-6 pt-6 pb-5 border-b border-zinc-800/60">
    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-600 mb-2">{label}</p>
    <h2 className="text-base font-semibold text-zinc-100 leading-snug">{title}</h2>
    <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">{desc}</p>
  </div>
)

const CardBody = ({ children }) => (
  <div className="px-6 py-6 flex-1">{children}</div>
)

const Btn = ({ onClick, variant = 'ghost', className = '', children, disabled, type = 'button' }) => {
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 active:scale-95 cursor-pointer select-none px-4 py-2 text-xs disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100'
  const variants = {
    primary: 'bg-violet-600 text-white hover:bg-violet-500',
    ghost:   'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700/80 border border-zinc-700/60',
    danger:  'bg-transparent text-rose-400 hover:bg-rose-500/10 border border-zinc-700/60',
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

/* ─────────────────────────────────────────
   Example 1 — Counter
───────────────────────────────────────── */
const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <Card>
      <CardHeader
        label="Example 01"
        title="Counter"
        desc="A number stored in state. Every setCount call schedules a re-render with the new value."
      />
      <CardBody>
        <div className="flex flex-col gap-6 h-full">
          <div className="flex-1 flex items-center justify-center py-6">
            <span className={`mono text-8xl font-medium tracking-tight transition-colors duration-200 ${count < 0 ? 'text-rose-400' : 'text-zinc-100'}`}>
              {count}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <Btn variant="danger"   onClick={() => setCount(c => c - 1)} className="flex-1">− Dec</Btn>
            <Btn variant="ghost"    onClick={() => setCount(0)}           className="px-5">Reset</Btn>
            <Btn variant="primary"  onClick={() => setCount(c => c + 1)} className="flex-1">+ Inc</Btn>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

/* ─────────────────────────────────────────
   Example 2 — Live Text Preview
───────────────────────────────────────── */
const LiveText = () => {
  const [text, setText] = useState('')

  return (
    <Card>
      <CardHeader
        label="Example 02"
        title="Live Text Preview"
        desc="The input is fully controlled by state — React owns the value, not the DOM."
      />
      <CardBody>
        <div className="flex flex-col gap-4 h-full">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Type something…"
            className="w-full bg-[#0e0e10] border border-zinc-700/60 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-zinc-500 transition-colors"
          />

          <div className="flex-1 rounded-xl border border-dashed border-zinc-800 px-4 py-4 min-h-20 flex items-start">
            {text
              ? <p className="text-sm text-zinc-100 leading-relaxed">{text}</p>
              : <p className="text-xs text-zinc-600 italic mt-0.5">Preview appears here…</p>
            }
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-600">{text.length} characters</span>
            {text && <Btn variant="ghost" onClick={() => setText('')} className="py-1.5 text-[11px]">Clear</Btn>}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

/* ─────────────────────────────────────────
   Example 3 — Theme Toggle
───────────────────────────────────────── */
const ThemeToggle = () => {
  const [dark, setDark] = useState(true)

  return (
    <Card>
      <CardHeader
        label="Example 03"
        title="Theme Toggle"
        desc="A boolean flipped with one setState call — exactly how real theme switches work."
      />
      <CardBody>
        <div className="flex flex-col gap-5 h-full">
          {/* Preview panel */}
          <div className={`flex-1 rounded-xl border px-5 py-5 transition-all duration-300 ${
            dark
              ? 'bg-[#0e0e10] border-zinc-800 text-zinc-100'
              : 'bg-white border-zinc-200 text-zinc-900'
          }`}>
            <p className={`text-[10px] font-semibold uppercase tracking-wider mb-3 ${dark ? 'text-zinc-600' : 'text-zinc-400'}`}>
              App Preview
            </p>
            <div className="flex items-center gap-2 mb-1.5">
              <div className={`w-2 h-2 rounded-full ${dark ? 'bg-violet-400' : 'bg-violet-600'}`} />
              <span className="text-sm font-semibold">Dashboard</span>
            </div>
            <p className={`text-xs ${dark ? 'text-zinc-500' : 'text-zinc-400'}`}>
              {dark ? 'Dark mode is active' : 'Light mode is active'}
            </p>
          </div>

          {/* Toggle row */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">{dark ? '🌙 Dark mode' : '☀️ Light mode'}</span>
            <button
              onClick={() => setDark(v => !v)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 cursor-pointer outline-none ${dark ? 'bg-violet-600' : 'bg-zinc-300'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${dark ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
const UseStateDemo = () => (
  <div className="flex flex-col gap-10">

    <div className="flex flex-col gap-3 pb-6 border-b border-zinc-800/50">
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-600">Hook 01</span>
      <h1 className="text-4xl font-semibold text-zinc-100 tracking-tight">
        <span className="mono">useState</span>
      </h1>
      <p className="text-sm text-zinc-500 leading-relaxed max-w-xl">
        Declares a piece of <strong className="text-zinc-300 font-medium">reactive state</strong> inside a component.
        React re-renders automatically whenever the value changes.
      </p>
      <div className="inline-flex rounded-lg border border-zinc-800 bg-[#111113] px-4 py-2.5 w-fit">
        <code className="mono text-xs text-violet-400">const [value, setValue] = useState(initial)</code>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-5">
      <Counter />
      <LiveText />
      <ThemeToggle />
    </div>

  </div>
)

export default UseStateDemo

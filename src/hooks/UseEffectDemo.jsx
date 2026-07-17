import { useState, useEffect } from 'react'

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
    success: 'bg-emerald-700 text-white hover:bg-emerald-600',
    warning: 'bg-amber-600 text-white hover:bg-amber-500',
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

const DepTag = ({ deps }) => (
  <div className="flex items-center gap-2 flex-wrap">
    <span className="text-[10px] text-zinc-600 font-medium">runs when:</span>
    {deps.map(d => (
      <code key={d} className="mono text-[10px] text-violet-400 bg-violet-500/10 border border-violet-500/15 px-2 py-0.5 rounded-md">
        {d}
      </code>
    ))}
  </div>
)

/* ─────────────────────────────────────────
   Example 1 — Document Title
───────────────────────────────────────── */
const DocumentTitle = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = count === 0 ? 'React Hooks' : `(${count}) React Hooks`
    return () => { document.title = 'React Hooks' }
  }, [count])

  return (
    <Card>
      <CardHeader
        label="Example 01"
        title="Document Title"
        desc="The simplest useEffect — syncs the browser tab title whenever count changes."
      />
      <CardBody>
        <div className="flex flex-col gap-6 h-full">
          <DepTag deps={['count']} />

          <div className="flex-1 flex items-center justify-center py-6 rounded-xl border border-dashed border-zinc-800">
            <span className="mono text-8xl font-medium text-zinc-100">{count}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Btn variant="ghost"   onClick={() => setCount(c => c - 1)} className="flex-1">− Dec</Btn>
            <Btn variant="ghost"   onClick={() => setCount(0)}           className="px-5">Reset</Btn>
            <Btn variant="primary" onClick={() => setCount(c => c + 1)} className="flex-1">+ Inc</Btn>
          </div>

          <p className="text-[11px] text-zinc-600 text-center">
            Watch the browser tab — it updates with every change.
          </p>
        </div>
      </CardBody>
    </Card>
  )
}

/* ─────────────────────────────────────────
   Example 2 — Network Status
───────────────────────────────────────── */
const OnlineStatus = () => {
  const [online, setOnline] = useState(navigator.onLine)

  useEffect(() => {
    const up   = () => setOnline(true)
    const down  = () => setOnline(false)
    window.addEventListener('online',  up)
    window.addEventListener('offline', down)
    return () => {
      window.removeEventListener('online',  up)
      window.removeEventListener('offline', down)
    }
  }, [])

  return (
    <Card>
      <CardHeader
        label="Example 02"
        title="Network Status"
        desc="Registers event listeners on mount, removes them on unmount. Empty [] means run exactly once."
      />
      <CardBody>
        <div className="flex flex-col gap-6 h-full">
          <DepTag deps={['[ ]  —  mount only']} />

          <div className={`flex-1 flex flex-col items-center justify-center gap-4 rounded-xl border py-8 transition-all duration-300 ${
            online
              ? 'bg-emerald-500/5 border-emerald-500/20'
              : 'bg-rose-500/5 border-rose-500/20'
          }`}>
            <span className={`text-4xl ${online ? 'text-emerald-400' : 'text-rose-400'}`}>
              {online ? '🟢' : '🔴'}
            </span>
            <div className="text-center">
              <p className={`text-base font-semibold ${online ? 'text-emerald-300' : 'text-rose-300'}`}>
                {online ? 'Online' : 'Offline'}
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                {online ? 'Network connection is active' : 'No network connection'}
              </p>
            </div>
          </div>

          <p className="text-[11px] text-zinc-600 text-center">
            Toggle your network connection to see this update live.
          </p>
        </div>
      </CardBody>
    </Card>
  )
}

/* ─────────────────────────────────────────
   Example 3 — Timer
───────────────────────────────────────── */
const Timer = () => {
  const [running, setRunning] = useState(false)
  const [secs, setSecs]       = useState(0)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setSecs(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [running])

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  return (
    <Card>
      <CardHeader
        label="Example 03"
        title="Timer"
        desc="A setInterval starts when running is true. The cleanup function clears it when paused or unmounted."
      />
      <CardBody>
        <div className="flex flex-col gap-6 h-full">
          <DepTag deps={['running']} />

          <div className={`flex-1 flex items-center justify-center py-6 rounded-xl border transition-colors duration-300 ${
            running ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-zinc-800 bg-transparent'
          }`}>
            <span className={`mono text-6xl font-medium tracking-tight transition-colors ${
              running ? 'text-emerald-300' : 'text-zinc-400'
            }`}>
              {fmt(secs)}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <Btn variant="ghost"   onClick={() => { setRunning(false); setSecs(0) }} className="px-5">Reset</Btn>
            {running
              ? <Btn variant="warning" onClick={() => setRunning(false)} className="flex-1">⏸ Pause</Btn>
              : <Btn variant="success" onClick={() => setRunning(true)}  className="flex-1">▶ Start</Btn>
            }
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
const UseEffectDemo = () => (
  <div className="flex flex-col gap-10">

    <div className="flex flex-col gap-3 pb-6 border-b border-zinc-800/50">
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-600">Hook 02</span>
      <h1 className="text-4xl font-semibold text-zinc-100 tracking-tight">
        <span className="mono">useEffect</span>
      </h1>
      <p className="text-sm text-zinc-500 leading-relaxed max-w-xl">
        Runs a <strong className="text-zinc-300 font-medium">side effect</strong> after the component renders —
        subscriptions, timers, API calls, DOM mutations. Return a cleanup function to avoid memory leaks.
      </p>
      <div className="inline-flex rounded-lg border border-zinc-800 bg-[#111113] px-4 py-2.5 w-fit">
        <code className="mono text-xs text-violet-400">{'useEffect(() => { effect; return cleanup }, [deps])'}</code>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-5">
      <DocumentTitle />
      <OnlineStatus />
      <Timer />
    </div>

  </div>
)

export default UseEffectDemo

import { useState, useRef, useEffect } from 'react'

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
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

/* ─────────────────────────────────────────
   Example 1 — Focus Input
───────────────────────────────────────── */
const FocusInput = () => {
  const inputRef = useRef(null)

  const handleFocus = () => {
    inputRef.current?.focus()
  }

  const handleSelect = () => {
    inputRef.current?.select()
  }

  return (
    <Card>
      <CardHeader
        label="Example 01"
        title="Direct DOM Access"
        desc="Directly focus or select text in an input element using a DOM reference."
      />
      <CardBody>
        <div className="flex flex-col gap-5 justify-between h-full">
          <input
            ref={inputRef}
            type="text"
            defaultValue="Hello React Hooks!"
            className="w-full bg-[#161619] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-violet-500/80 focus:ring-1 focus:ring-violet-500/80 transition-all font-mono"
          />

          <div className="flex gap-2">
            <Btn variant="primary" onClick={handleFocus} className="flex-1">
              Focus Input
            </Btn>
            <Btn variant="ghost" onClick={handleSelect} className="flex-1">
              Select Text
            </Btn>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

/* ─────────────────────────────────────────
   Example 2 — State vs. Ref
───────────────────────────────────────── */
const StateVsRef = () => {
  const [stateCount, setStateCount] = useState(0)
  const refCount = useRef(0)

  const incrementState = () => {
    setStateCount(c => c + 1)
  }

  const incrementRef = () => {
    refCount.current += 1
  }

  return (
    <Card>
      <CardHeader
        label="Example 02"
        title="State vs. Ref"
        desc="Compare how updates to state refresh the UI, while updates to a ref happen silently."
      />
      <CardBody>
        <div className="flex flex-col gap-5 justify-between h-full">
          <div className="grid grid-cols-2 gap-3.5">
            <div className="border border-zinc-800 rounded-xl bg-zinc-950/50 p-4 text-center">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">State Value</span>
              <span className="mono text-2xl font-semibold text-violet-400">{stateCount}</span>
              <p className="text-[10px] text-zinc-650 mt-2">Forces Re-render</p>
            </div>
            <div className="border border-zinc-800 rounded-xl bg-zinc-950/50 p-4 text-center">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">Ref Value</span>
              <span className="mono text-2xl font-semibold text-zinc-400">{refCount.current}</span>
              <p className="text-[10px] text-zinc-650 mt-2">Zero Re-renders</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Btn variant="primary" onClick={incrementState} className="flex-1">
              + State
            </Btn>
            <Btn variant="ghost" onClick={incrementRef} className="flex-1">
              + Ref (Silent)
            </Btn>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

/* ─────────────────────────────────────────
   Example 3 — Previous State Tracker
───────────────────────────────────────── */
const PrevStateTracker = () => {
  const [text, setText] = useState('')
  const prevTextRef = useRef('')

  useEffect(() => {
    prevTextRef.current = text
  }, [text])

  return (
    <Card>
      <CardHeader
        label="Example 03"
        title="Track Previous Value"
        desc="Capture and display the value from the previous render before it was updated."
      />
      <CardBody>
        <div className="flex flex-col gap-5 justify-between h-full">
          <input
            type="text"
            value={text}
            placeholder="Type value here..."
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-[#161619] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-violet-500/80 focus:ring-1 focus:ring-violet-500/80 transition-all font-mono"
          />

          <div className="grid grid-cols-2 gap-3.5 text-center">
            <div className="border border-zinc-800 rounded-xl bg-zinc-950/50 py-3 px-2">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-0.5">Current</span>
              <span className="mono text-sm font-medium text-violet-400 break-words block min-h-[1.25rem]">
                {text || '—'}
              </span>
            </div>
            <div className="border border-zinc-800 rounded-xl bg-zinc-950/50 py-3 px-2">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-0.5">Previous</span>
              <span className="mono text-sm font-medium text-zinc-400 break-words block min-h-[1.25rem]">
                {prevTextRef.current || '—'}
              </span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
const UseRefDemo = () => (
  <div className="flex flex-col gap-10">
    <div className="flex flex-col gap-3 pb-6 border-b border-zinc-800/50">
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-600">Hook 03</span>
      <h1 className="text-4xl font-semibold text-zinc-100 tracking-tight">
        <span className="mono">useRef</span>
      </h1>
      <p className="text-sm text-zinc-500 leading-relaxed max-w-xl">
        Allows you to reference a value that’s <strong className="text-zinc-300 font-medium">not needed for rendering</strong> or access standard DOM elements directly.
      </p>
      <div className="inline-flex rounded-lg border border-zinc-800 bg-[#111113] px-4 py-2.5 w-fit">
        <code className="mono text-xs text-violet-400">const ref = useRef(initialValue)</code>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <FocusInput />
      <StateVsRef />
      <PrevStateTracker />
    </div>
  </div>
)

export default UseRefDemo

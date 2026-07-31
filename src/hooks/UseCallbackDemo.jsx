import { useState, useCallback, useEffect, useRef, memo } from 'react'

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

const Btn = ({ onClick, variant = 'ghost', className = '', children, disabled }) => {
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 active:scale-95 cursor-pointer select-none px-4 py-2 text-xs disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100'
  const variants = {
    primary: 'bg-violet-600 text-white hover:bg-violet-500',
    ghost:   'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700/80 border border-zinc-700/60',
    success: 'bg-emerald-700 text-white hover:bg-emerald-600',
    danger:  'bg-rose-700/80 text-white hover:bg-rose-700',
  }
  return (
    <button disabled={disabled} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

/* ─────────────────────────────────────────
   Example 1 — Without vs With useCallback

   The BEST way to understand useCallback is
   to see both cases in one single example:
   - RawChild  : gets a new function every render → always re-renders
   - StableChild: gets a memoized function     → skips re-render
───────────────────────────────────────── */

const RawChild = memo(({ onLike }) => {
  const count = useRef(0)
  count.current += 1
  return (
    <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 px-4 py-3 flex items-center justify-between">
      <div>
        <p className="text-[10px] text-rose-400 uppercase tracking-wider font-semibold">Without useCallback</p>
        <p className="text-xs text-zinc-400 mt-0.5">Gets a new function every render</p>
      </div>
      <div className="text-right">
        <span className="mono text-base font-bold text-rose-400 block">{count.current}×</span>
        <button onClick={onLike} className="text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors mt-0.5 cursor-pointer">Like</button>
      </div>
    </div>
  )
})
RawChild.displayName = 'RawChild'

const StableChild = memo(({ onLike }) => {
  const count = useRef(0)
  count.current += 1
  return (
    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 flex items-center justify-between">
      <div>
        <p className="text-[10px] text-emerald-400 uppercase tracking-wider font-semibold">With useCallback</p>
        <p className="text-xs text-zinc-400 mt-0.5">Gets same function reference</p>
      </div>
      <div className="text-right">
        <span className="mono text-base font-bold text-emerald-400 block">{count.current}×</span>
        <button onClick={onLike} className="text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors mt-0.5 cursor-pointer">Like</button>
      </div>
    </div>
  )
})
StableChild.displayName = 'StableChild'

const WithoutVsWith = () => {
  const [likes, setLikes] = useState(0)
  const [theme, setTheme] = useState(false)

  // BAD: new function every render → breaks React.memo
  const rawHandler = () => setLikes(l => l + 1)

  // GOOD: same reference every render → React.memo works correctly
  const stableHandler = useCallback(() => {
    setLikes(l => l + 1)
  }, [])

  return (
    <Card>
      <CardHeader
        label="Example 01"
        title="Without vs With"
        desc='Click "Toggle Theme" — an unrelated re-render. Watch which child re-renders and which stays put.'
      />
      <CardBody>
        <div className="flex flex-col gap-4 h-full justify-between">
          <div className="flex flex-col gap-2.5">
            <RawChild    onLike={rawHandler}    />
            <StableChild onLike={stableHandler} />
          </div>

          <div className="flex gap-2 items-center">
            <Btn variant="ghost" onClick={() => setTheme(t => !t)} className="flex-1">
              Toggle Theme (Re-render Parent)
            </Btn>
            <div className="border border-zinc-800 rounded-lg px-3 py-2 text-center min-w-16">
              <span className="text-[10px] text-zinc-500 block">Likes</span>
              <span className="mono text-sm font-semibold text-violet-400">{likes}</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

/* ─────────────────────────────────────────
   Example 2 — Debounced Search

   The most real-world useCallback use case.
   Stabilize a debounce wrapper so it is not
   recreated on every keystroke.
───────────────────────────────────────── */
const ITEMS = [
  'React', 'useCallback', 'useMemo', 'useState', 'useEffect',
  'useRef', 'useContext', 'useReducer', 'JavaScript', 'TypeScript',
  'Tailwind CSS', 'Vite', 'Next.js', 'Node.js', 'REST API',
]

const DebouncedSearch = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(ITEMS)
  const [searchCount, setSearchCount] = useState(0)
  const timerRef = useRef(null)

  // useCallback ensures this function reference is stable.
  // It is NOT recreated on every keystroke — only when results resets.
  const doSearch = useCallback((val) => {
    setSearchCount(c => c + 1)
    setResults(
      val.trim() === ''
        ? ITEMS
        : ITEMS.filter(i => i.toLowerCase().includes(val.toLowerCase()))
    )
  }, [])

  const handleChange = (e) => {
    const val = e.target.value
    setQuery(val)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => doSearch(val), 350)
  }

  useEffect(() => () => clearTimeout(timerRef.current), [])

  return (
    <Card>
      <CardHeader
        label="Example 02"
        title="Debounced Search"
        desc="The search function is stable via useCallback — it is only called 350ms after the user stops typing."
      />
      <CardBody>
        <div className="flex flex-col gap-4 h-full">
          <div className="relative">
            <input
              value={query}
              onChange={handleChange}
              placeholder="Search topics..."
              className="w-full bg-[#161619] border border-zinc-800 rounded-lg pl-3 pr-24 py-2 text-sm text-zinc-100 focus:outline-none focus:border-violet-500/80 transition-all font-mono"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600 mono">
              {searchCount} searches
            </span>
          </div>

          <div className="flex-1 rounded-xl border border-zinc-800/60 bg-zinc-950/40 overflow-y-auto max-h-[140px]">
            {results.length === 0 ? (
              <p className="text-xs text-zinc-600 text-center py-4">No results found</p>
            ) : (
              results.map(item => (
                <div key={item} className="flex items-center gap-2 px-3 py-2 border-b border-zinc-800/30 last:border-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500/60 shrink-0" />
                  <span className="text-xs text-zinc-300 mono">{item}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

/* ─────────────────────────────────────────
   Example 3 — Event Listener Registration

   addEventListener + removeEventListener MUST
   receive the SAME function reference.
   useCallback guarantees this.
───────────────────────────────────────── */
const EventListenerDemo = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isTracking, setIsTracking] = useState(false)
  const boxRef = useRef(null)

  // Without useCallback, removeEventListener would receive a DIFFERENT function
  // reference and the listener would NEVER be cleaned up — a memory leak.
  const handleMouseMove = useCallback((e) => {
    if (!boxRef.current) return
    const rect = boxRef.current.getBoundingClientRect()
    setPosition({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    })
  }, [])

  useEffect(() => {
    const box = boxRef.current
    if (!box) return

    if (isTracking) {
      box.addEventListener('mousemove', handleMouseMove)
    } else {
      box.removeEventListener('mousemove', handleMouseMove)
    }
    return () => box.removeEventListener('mousemove', handleMouseMove)
  }, [isTracking, handleMouseMove])

  return (
    <Card>
      <CardHeader
        label="Example 03"
        title="Event Listener Cleanup"
        desc="addEventListerner and removeEventListener must receive the exact same reference. useCallback ensures that."
      />
      <CardBody>
        <div className="flex flex-col gap-4 h-full justify-between">
          <div
            ref={boxRef}
            className={`flex-1 rounded-xl border border-dashed flex flex-col items-center justify-center gap-2 select-none transition-colors duration-200 min-h-28 ${
              isTracking
                ? 'border-violet-500/40 bg-violet-500/5 cursor-crosshair'
                : 'border-zinc-800 bg-transparent cursor-default'
            }`}
          >
            {isTracking ? (
              <>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Cursor position</span>
                <span className="mono text-lg font-semibold text-violet-400">
                  {position.x}, {position.y}
                </span>
              </>
            ) : (
              <span className="text-xs text-zinc-600">Enable tracking to start</span>
            )}
          </div>

          <Btn
            variant={isTracking ? 'danger' : 'primary'}
            onClick={() => setIsTracking(t => !t)}
            className="w-full"
          >
            {isTracking ? 'Stop Tracking' : 'Start Tracking'}
          </Btn>
        </div>
      </CardBody>
    </Card>
  )
}

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
const UseCallbackDemo = () => (
  <div className="flex flex-col gap-10">
    <div className="flex flex-col gap-3 pb-6 border-b border-zinc-800/50">
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-600">Hook 07</span>
      <h1 className="text-4xl font-semibold text-zinc-100 tracking-tight">
        <span className="mono">useCallback</span>
      </h1>
      <p className="text-sm text-zinc-500 leading-relaxed max-w-xl">
        Caches a <strong className="text-zinc-300 font-medium">function definition</strong> between renders.
        Every render creates a new function in memory — <code className="text-zinc-400 mono text-xs">useCallback</code> prevents that by
        returning the same reference unless dependencies change.
      </p>
      <div className="inline-flex rounded-lg border border-zinc-800 bg-[#111113] px-4 py-2.5 w-fit">
        <code className="mono text-xs text-violet-400">{"const fn = useCallback(() => doSomething(a), [a])"}</code>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <WithoutVsWith />
      <DebouncedSearch />
      <EventListenerDemo />
    </div>
  </div>
)

export default UseCallbackDemo

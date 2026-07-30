import { useState, useMemo, useEffect, useRef } from 'react'

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
  }
  return (
    <button disabled={disabled} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

/* ─────────────────────────────────────────
   Example 1 — Expensive Calculation
───────────────────────────────────────── */
const ExpensiveCalc = () => {
  const [count, setCount] = useState(1)
  const [otherState, setOtherState] = useState(false)
  
  // Keep track of how many times the calculation actually runs
  const calcCount = useRef(0)

  // This will ONLY re-run when 'count' changes.
  // Clicking "Toggle Irrelevant State" will NOT trigger this block.
  const expensiveValue = useMemo(() => {
    calcCount.current += 1
    
    // Artificial delay to simulate heavy math (e.g. 150ms)
    const start = performance.now()
    while (performance.now() - start < 150) {} 
    
    return count * 1024
  }, [count])

  return (
    <Card>
      <CardHeader
        label="Example 01"
        title="Expensive Calculation"
        desc="Caches the result of heavy math. Notice how changing the irrelevant state doesn't trigger a recalculation delay."
      />
      <CardBody>
        <div className="flex flex-col gap-5 h-full justify-between">
          
          <div className="flex gap-4 items-center">
            <div className="flex-1 rounded-xl border border-dashed border-zinc-800 bg-zinc-950/50 p-4 text-center">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">Result</span>
              <span className="mono text-2xl font-semibold text-violet-400">{expensiveValue}</span>
              <p className="text-[10px] text-emerald-500 mt-2 font-mono">Ran {calcCount.current} times</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="mono text-xs text-zinc-500 w-16">Count: {count}</span>
              <Btn variant="ghost" onClick={() => setCount(c => c + 1)} className="flex-1">
                + Increment (Slow)
              </Btn>
            </div>
            <div className="flex items-center gap-2">
              <span className="mono text-xs text-zinc-500 w-16">{otherState ? 'ON' : 'OFF'}</span>
              <Btn variant="primary" onClick={() => setOtherState(s => !s)} className="flex-1">
                Toggle Unrelated (Fast)
              </Btn>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

/* ─────────────────────────────────────────
   Example 2 — Filtering a List
───────────────────────────────────────── */
const USERS = Array.from({ length: 50 }, (_, i) => `User ${i + 1}`)

const FilterList = () => {
  const [search, setSearch] = useState('')
  const [themeDark, setThemeDark] = useState(true)
  const filterCount = useRef(0)

  // Only re-filter the array when 'search' changes.
  // Changing the theme state won't cause the filter logic to run again.
  const filteredUsers = useMemo(() => {
    filterCount.current += 1
    if (!search) return USERS
    return USERS.filter(u => u.toLowerCase().includes(search.toLowerCase()))
  }, [search])

  return (
    <Card>
      <CardHeader
        label="Example 02"
        title="Filtering Lists"
        desc="Caches derived data like filtered arrays. Keeps the UI fast when unrelated state (like theme) updates."
      />
      <CardBody>
        <div className={`flex flex-col gap-4 h-full transition-colors duration-300 rounded-xl -m-2 p-2 ${themeDark ? 'bg-transparent' : 'bg-zinc-200/5'}`}>
          <div className="flex gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="flex-1 bg-[#161619] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-violet-500/80 transition-all font-mono"
            />
            <Btn variant="ghost" onClick={() => setThemeDark(d => !d)} className="px-3">
              {themeDark ? '☀️' : '🌙'}
            </Btn>
          </div>

          <div className="flex-1 rounded-xl border border-zinc-800/60 bg-zinc-950/40 p-2 overflow-y-auto max-h-[120px]">
            {filteredUsers.map(u => (
              <div key={u} className="text-xs text-zinc-400 py-1 px-2 border-b border-zinc-800/30 last:border-0">
                {u}
              </div>
            ))}
          </div>
          <div className="text-right">
             <span className="text-[10px] text-zinc-600 font-mono">Filtered {filterCount.current} times</span>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

/* ─────────────────────────────────────────
   Example 3 — Referential Equality
───────────────────────────────────────── */
const ReferentialEquality = () => {
  const [isActive, setIsActive] = useState(false)
  const [clicks, setClicks] = useState(0)
  const [effectCount, setEffectCount] = useState(0)

  // In JavaScript, {} !== {}. 
  // If we didn't useMemo here, config would be a BRAND NEW object in memory on every render!
  const config = useMemo(() => {
    return {
      status: isActive ? 'Active' : 'Inactive',
      color: isActive ? '#34d399' : '#a1a1aa'
    }
  }, [isActive])

  // Because 'config' is memoized, this effect ONLY runs when 'isActive' actually changes,
  // NOT when we click the random button.
  useEffect(() => {
    setEffectCount(c => c + 1)
  }, [config])

  return (
    <Card>
      <CardHeader
        label="Example 03"
        title="Referential Equality"
        desc="Maintains the exact same object reference in memory to prevent useEffects from firing unnecessarily."
      />
      <CardBody>
        <div className="flex flex-col gap-5 h-full justify-between">
          <div className="grid grid-cols-2 gap-3.5 text-center">
            <div className="border border-zinc-800 rounded-xl bg-zinc-950/50 py-3 px-2">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">State Clicks</span>
              <span className="mono text-xl font-medium text-zinc-300 block">
                {clicks}
              </span>
            </div>
            <div className="border border-dashed border-violet-500/30 rounded-xl bg-violet-500/5 py-3 px-2">
              <span className="text-[10px] text-violet-400 uppercase tracking-wider block mb-1">Effect Runs</span>
              <span className="mono text-xl font-medium text-violet-300 block">
                {effectCount}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Btn variant={isActive ? 'success' : 'ghost'} onClick={() => setIsActive(!isActive)} className="flex-1">
              Toggle Config
            </Btn>
            <Btn variant="primary" onClick={() => setClicks(c => c + 1)} className="flex-1">
              Click (No Effect)
            </Btn>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
const UseMemoDemo = () => (
  <div className="flex flex-col gap-10">
    <div className="flex flex-col gap-3 pb-6 border-b border-zinc-800/50">
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-600">Hook 06</span>
      <h1 className="text-4xl font-semibold text-zinc-100 tracking-tight">
        <span className="mono">useMemo</span>
      </h1>
      <p className="text-sm text-zinc-500 leading-relaxed max-w-xl">
        Caches the <strong className="text-zinc-300 font-medium">result of a calculation</strong> between renders. 
        It only recalculates when its dependencies change, preventing expensive work on unrelated re-renders.
      </p>
      <div className="inline-flex rounded-lg border border-zinc-800 bg-[#111113] px-4 py-2.5 w-fit">
        <code className="mono text-xs text-violet-400">{"const cachedValue = useMemo(() => calculateValue(a, b), [a, b])"}</code>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <ExpensiveCalc />
      <FilterList />
      <ReferentialEquality />
    </div>
  </div>
)

export default UseMemoDemo

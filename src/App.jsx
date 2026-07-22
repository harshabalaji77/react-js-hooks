import { useState } from 'react'
import UseStateDemo from './hooks/UseStateDemo'
import UseEffectDemo from './hooks/UseEffectDemo'
import UseRefDemo from './hooks/UseRefDemo'

const HOOKS = [
  { name: 'useState',    label: 'useState',    number: 1, component: <UseStateDemo /> },
  { name: 'useEffect',   label: 'useEffect',   number: 2, component: <UseEffectDemo /> },
  { name: 'useRef',      label: 'useRef',      number: 3, component: <UseRefDemo /> },
  { name: 'useContext',  label: 'useContext',  number: 4, component: null },
  { name: 'useReducer',  label: 'useReducer',  number: 5, component: null },
  { name: 'useMemo',     label: 'useMemo',     number: 6, component: null },
  { name: 'useCallback', label: 'useCallback', number: 7, component: null },
]

const App = () => {
  const [active, setActive] = useState('useState')
  const current = HOOKS.find((h) => h.name === active)

  return (
    /* Full-bleed container — no max-width here */
    <div className="flex h-screen overflow-hidden bg-[#0e0e10] text-zinc-200">

      {/* ── Sidebar — owns its own background ── */}
      <aside className="w-48 shrink-0 bg-[#141416] border-r border-white/[0.05] flex flex-col pt-8 px-3 pb-6 gap-7">
        <div className="px-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-600">
            React Hooks
          </p>
        </div>

        <nav className="flex-1">
          <ul className="flex flex-col gap-0.5">
            {HOOKS.map((h) => {
              const isActive   = h.name === active
              const available  = !!h.component
              return (
                <li key={h.name}>
                  <button
                    disabled={!available}
                    onClick={() => setActive(h.name)}
                    className={`w-full text-left flex items-center gap-2.5 px-2 py-1.5 rounded-md transition-colors cursor-pointer disabled:cursor-not-allowed ${
                      isActive
                        ? 'bg-white/[0.07] text-zinc-100'
                        : available
                          ? 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]'
                          : 'text-zinc-700 opacity-50'
                    }`}
                  >
                    <span className={`mono text-[9px] w-4 text-right shrink-0 tabular-nums ${
                      isActive ? 'text-violet-400' : 'text-zinc-700'
                    }`}>
                      {String(h.number).padStart(2, '0')}
                    </span>
                    <span className="mono text-[12px] tracking-tight">{h.label}</span>
                    {!available && (
                      <span className="ml-auto text-[9px] text-zinc-700 uppercase tracking-wider">soon</span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>

      {/* ── Main — max-width lives here only ── */}
      <main className="flex-1 overflow-y-auto bg-[#0e0e10]">
        <div className="max-w-6xl mx-auto w-full px-10 py-10">
          {current?.component}
        </div>
      </main>

    </div>
  )
}

export default App

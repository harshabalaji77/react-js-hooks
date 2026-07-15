import UseStateDemo from './hooks/UseStateDemo'

const hooks = [
  { name: 'useState', active: true },
  { name: 'useEffect', active: false },
  { name: 'useRef', active: false },
  { name: 'useContext', active: false },
  { name: 'useReducer', active: false },
  { name: 'useMemo', active: false },
  { name: 'useCallback', active: false },
]

export default function App() {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">

      <nav className="w-56 shrink-0 bg-zinc-900 border-r border-zinc-800 flex flex-col gap-6 p-5">
        <span className="text-violet-400 font-bold text-sm tracking-wide px-2">⚛ React Hooks</span>
        <ul className="flex flex-col gap-1">
          {hooks.map((h) => (
            <li
              key={h.name}
              className={`px-3 py-2 rounded-lg text-sm font-mono transition-all
                ${h.active
                  ? 'bg-violet-500/15 text-violet-400 border-l-2 border-violet-500 pl-2.5'
                  : 'text-zinc-500 opacity-40 cursor-not-allowed'
                }`}
            >
              {h.name}
            </li>
          ))}
        </ul>
      </nav>

      <main className="flex-1 px-10 py-12 overflow-y-auto">
        <UseStateDemo />
      </main>

    </div>
  )
}

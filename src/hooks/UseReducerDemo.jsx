import { useReducer, useState } from 'react'

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
    danger:  'bg-rose-700 text-white hover:bg-rose-600',
  }
  return (
    <button disabled={disabled} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

/* ─────────────────────────────────────────
   Example 1 — State Machine (Data Fetching)
   Prevents impossible states (e.g. loading and error).
───────────────────────────────────────── */
const fetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { status: 'loading', data: null, error: null }
    case 'FETCH_SUCCESS':
      return { status: 'success', data: action.payload, error: null }
    case 'FETCH_ERROR':
      return { status: 'error', data: null, error: action.payload }
    case 'RESET':
      return { status: 'idle', data: null, error: null }
    default:
      return state
  }
}

const FetchDemo = () => {
  const [state, dispatch] = useReducer(fetchReducer, { status: 'idle', data: null, error: null })

  const simulateFetch = (shouldFail) => {
    dispatch({ type: 'FETCH_START' })
    setTimeout(() => {
      if (shouldFail) {
        dispatch({ type: 'FETCH_ERROR', payload: 'Failed to connect.' })
      } else {
        dispatch({ type: 'FETCH_SUCCESS', payload: { user: 'Alice', role: 'Admin' } })
      }
    }, 1000)
  }

  return (
    <Card>
      <CardHeader
        label="Example 01"
        title="State Machine"
        desc="Prevents impossible states. A fetch can only be loading, success, or error, never multiple at once."
      />
      <CardBody>
        <div className="flex flex-col gap-6 h-full justify-between">
          <div className="flex-1 rounded-xl border border-zinc-800 bg-zinc-950/50 p-4 flex flex-col justify-center items-center text-center relative overflow-hidden">
            {state.status === 'idle' && <span className="text-zinc-500 text-sm">Ready to fetch</span>}
            {state.status === 'loading' && <span className="text-violet-400 text-sm animate-pulse">Loading data...</span>}
            {state.status === 'error' && <span className="text-rose-400 text-sm">{state.error}</span>}
            {state.status === 'success' && (
              <div className="flex flex-col items-center">
                <span className="text-emerald-400 text-sm font-semibold">{state.data.user}</span>
                <span className="text-xs text-zinc-500">{state.data.role}</span>
              </div>
            )}
            
            <div className="absolute top-2 right-3">
               <span className={`text-[10px] uppercase tracking-widest font-semibold ${
                 state.status === 'success' ? 'text-emerald-500' :
                 state.status === 'error' ? 'text-rose-500' :
                 state.status === 'loading' ? 'text-violet-500' :
                 'text-zinc-600'
               }`}>
                 {state.status}
               </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Btn variant="primary" onClick={() => simulateFetch(false)} disabled={state.status === 'loading'} className="flex-1">
              Success
            </Btn>
            <Btn variant="danger" onClick={() => simulateFetch(true)} disabled={state.status === 'loading'} className="flex-1">
              Error
            </Btn>
            <Btn variant="ghost" onClick={() => dispatch({ type: 'RESET' })} disabled={state.status === 'loading'} className="px-3">
              ↺
            </Btn>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

/* ─────────────────────────────────────────
   Example 2 — Form State
   Manage an object with multiple fields
   using a single reducer.
───────────────────────────────────────── */
const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }
    case 'CLEAR':
      return { username: '', email: '' }
    default:
      return state
  }
}

const FormDemo = () => {
  const [state, dispatch] = useReducer(formReducer, { username: '', email: '' })

  const handleChange = (e) => {
    dispatch({ type: 'SET_FIELD', field: e.target.name, value: e.target.value })
  }

  return (
    <Card>
      <CardHeader
        label="Example 02"
        title="Form State"
        desc="Easily update complex objects (like form data) by dispatching the field name and its new value."
      />
      <CardBody>
        <div className="flex flex-col gap-4 h-full justify-between">
          <div className="flex flex-col gap-3">
            <input
              name="username"
              value={state.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full bg-[#161619] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-violet-500/80 transition-all font-mono"
            />
            <input
              name="email"
              value={state.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full bg-[#161619] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-violet-500/80 transition-all font-mono"
            />
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 py-3">
            <pre className="text-[10px] text-zinc-400 mono">
              {JSON.stringify(state, null, 2)}
            </pre>
          </div>

          <Btn variant="ghost" onClick={() => dispatch({ type: 'CLEAR' })} className="w-full">
            Clear Form
          </Btn>
        </div>
      </CardBody>
    </Card>
  )
}

/* ─────────────────────────────────────────
   Example 3 — Todo List
   Manage an array of objects.
───────────────────────────────────────── */
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), text: action.text, done: false }]
    case 'TOGGLE':
      return state.map(t => t.id === action.id ? { ...t, done: !t.done } : t)
    case 'DELETE':
      return state.filter(t => t.id !== action.id)
    default:
      return state
  }
}

const TodoDemo = () => {
  const [todos, dispatch] = useReducer(todoReducer, [
    { id: 1, text: 'Learn useReducer', done: true },
    { id: 2, text: 'Build a cool app', done: false }
  ])
  const [text, setText] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    dispatch({ type: 'ADD', text })
    setText('')
  }

  return (
    <Card>
      <CardHeader
        label="Example 03"
        title="Todo List Array"
        desc="Handle array operations (add, map, filter) predictably without mutating the original state."
      />
      <CardBody>
        <div className="flex flex-col gap-4 h-full">
          <form onSubmit={handleAdd} className="flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="New task..."
              className="flex-1 bg-[#161619] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-violet-500/80 transition-all font-mono"
            />
            <Btn type="submit" variant="primary">Add</Btn>
          </form>

          <div className="flex flex-col gap-2 flex-1 overflow-y-auto max-h-[160px] pr-1">
            {todos.length === 0 && (
              <p className="text-xs text-zinc-500 text-center py-4">No tasks yet.</p>
            )}
            {todos.map(todo => (
              <div key={todo.id} className="flex items-center justify-between rounded-lg border border-zinc-800/60 bg-zinc-950/40 px-3 py-2 group hover:border-zinc-700 transition-colors">
                <div 
                  className={`text-sm cursor-pointer select-none transition-colors ${todo.done ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}
                  onClick={() => dispatch({ type: 'TOGGLE', id: todo.id })}
                >
                  {todo.text}
                </div>
                <button
                  onClick={() => dispatch({ type: 'DELETE', id: todo.id })}
                  className="text-zinc-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all px-2 py-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
const UseReducerDemo = () => (
  <div className="flex flex-col gap-10">
    <div className="flex flex-col gap-3 pb-6 border-b border-zinc-800/50">
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-600">Hook 05</span>
      <h1 className="text-4xl font-semibold text-zinc-100 tracking-tight">
        <span className="mono">useReducer</span>
      </h1>
      <p className="text-sm text-zinc-500 leading-relaxed max-w-xl">
        An alternative to <code className="text-zinc-400">useState</code> for more complex state logic. It lets you manage state transitions through a <strong className="text-zinc-300 font-medium">reducer function</strong> and actions.
      </p>
      <div className="inline-flex rounded-lg border border-zinc-800 bg-[#111113] px-4 py-2.5 w-fit">
        <code className="mono text-xs text-violet-400">const [state, dispatch] = useReducer(reducer, initialState)</code>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <FetchDemo />
      <FormDemo />
      <TodoDemo />
    </div>
  </div>
)

export default UseReducerDemo

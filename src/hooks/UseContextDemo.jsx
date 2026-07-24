import { createContext, useContext, useState } from 'react'

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

const Btn = ({ onClick, variant = 'ghost', className = '', children }) => {
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 active:scale-95 cursor-pointer select-none px-4 py-2 text-xs'
  const variants = {
    primary: 'bg-violet-600 text-white hover:bg-violet-500',
    ghost:   'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700/80 border border-zinc-700/60',
    success: 'bg-emerald-700 text-white hover:bg-emerald-600',
  }
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

/* ─────────────────────────────────────────
   Example 1 — Theme Context
   The classic use case: share a dark/light
   theme value across deeply nested children.
───────────────────────────────────────── */
const ThemeContext = createContext('dark')

const ThemedBox = () => {
  const theme = useContext(ThemeContext)
  const isDark = theme === 'dark'

  return (
    <div className={`rounded-xl border px-5 py-4 transition-all duration-300 ${isDark
      ? 'bg-zinc-900 border-zinc-700 text-zinc-100'
      : 'bg-white border-zinc-200 text-zinc-900'
    }`}>
      <p className={`text-[10px] uppercase tracking-widest font-semibold mb-2 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
        Deep Child
      </p>
      <p className="text-sm font-medium">
        Current theme: <span className={`mono font-semibold ${isDark ? 'text-violet-400' : 'text-violet-600'}`}>{theme}</span>
      </p>
      <p className={`text-xs mt-1 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
        No props were passed — context delivered this value.
      </p>
    </div>
  )
}

const ThemeDemo = () => {
  const [theme, setTheme] = useState('dark')

  return (
    <Card>
      <CardHeader
        label="Example 01"
        title="Theme Context"
        desc="Share a theme value with any child component without passing it as a prop at every level."
      />
      <CardBody>
        <div className="flex flex-col gap-4 h-full justify-between">
          <ThemeContext.Provider value={theme}>
            <ThemedBox />
          </ThemeContext.Provider>

          <div className="flex gap-2">
            <Btn
              variant={theme === 'dark' ? 'primary' : 'ghost'}
              onClick={() => setTheme('dark')}
              className="flex-1"
            >
              Dark
            </Btn>
            <Btn
              variant={theme === 'light' ? 'primary' : 'ghost'}
              onClick={() => setTheme('light')}
              className="flex-1"
            >
              Light
            </Btn>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

/* ─────────────────────────────────────────
   Example 2 — User Auth Context
   Simulates a logged-in user shared globally.
   Child reads user info without any props.
───────────────────────────────────────── */
const UserContext = createContext(null)

const UserCard = () => {
  const user = useContext(UserContext)

  if (!user) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-800 px-5 py-4 text-center">
        <p className="text-zinc-600 text-sm">No user logged in.</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 px-5 py-4 flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center text-white font-semibold text-sm shrink-0">
        {user.name[0]}
      </div>
      <div>
        <p className="text-sm font-semibold text-zinc-100">{user.name}</p>
        <p className="text-xs text-zinc-500">{user.role}</p>
      </div>
    </div>
  )
}

const UserAuthDemo = () => {
  const [user, setUser] = useState(null)

  return (
    <Card>
      <CardHeader
        label="Example 02"
        title="User Auth Context"
        desc="Share a logged-in user object across components without prop drilling."
      />
      <CardBody>
        <div className="flex flex-col gap-4 h-full justify-between">
          <UserContext.Provider value={user}>
            <UserCard />
          </UserContext.Provider>

          <div className="flex gap-2">
            <Btn
              variant="success"
              onClick={() => setUser({ name: 'Harsha', role: 'Admin' })}
              className="flex-1"
              disabled={!!user}
            >
              Log In
            </Btn>
            <Btn
              variant="ghost"
              onClick={() => setUser(null)}
              className="flex-1"
              disabled={!user}
            >
              Log Out
            </Btn>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

/* ─────────────────────────────────────────
   Example 3 — Language / Locale Context
   Switch the UI language for all children
   from a single context value.
───────────────────────────────────────── */
const LangContext = createContext('en')

const TRANSLATIONS = {
  en: { greeting: 'Hello!', msg: 'Welcome to React Hooks.', btn: 'Switch to Kannada' },
  kn: { greeting: 'ನಮಸ್ಕಾರ!', msg: 'React Hooks ಗೆ ಸ್ವಾಗತ.', btn: 'Switch to English' },
}

const LocaleCard = () => {
  const lang = useContext(LangContext)
  const t = TRANSLATIONS[lang]

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 px-5 py-4 flex flex-col gap-1.5">
      <p className="text-base font-semibold text-zinc-100">{t.greeting}</p>
      <p className="text-xs text-zinc-400">{t.msg}</p>
      <span className="text-[10px] mono text-zinc-600 mt-1">lang: <span className="text-violet-400">{lang}</span></span>
    </div>
  )
}

const LangDemo = () => {
  const [lang, setLang] = useState('en')

  const toggle = () => setLang(l => l === 'en' ? 'kn' : 'en')

  return (
    <Card>
      <CardHeader
        label="Example 03"
        title="Language Context"
        desc="Switch the UI language for all child components from one context value, no prop drilling needed."
      />
      <CardBody>
        <div className="flex flex-col gap-4 h-full justify-between">
          <LangContext.Provider value={lang}>
            <LocaleCard />
          </LangContext.Provider>

          <Btn variant="primary" onClick={toggle} className="w-full">
            {TRANSLATIONS[lang].btn}
          </Btn>
        </div>
      </CardBody>
    </Card>
  )
}

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
const UseContextDemo = () => (
  <div className="flex flex-col gap-10">

    <div className="flex flex-col gap-3 pb-6 border-b border-zinc-800/50">
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-600">Hook 04</span>
      <h1 className="text-4xl font-semibold text-zinc-100 tracking-tight">
        <span className="mono">useContext</span>
      </h1>
      <p className="text-sm text-zinc-500 leading-relaxed max-w-xl">
        Reads a value from the nearest <strong className="text-zinc-300 font-medium">Context Provider</strong> above it in the tree —
        without passing props through every intermediate component.
      </p>
      <div className="inline-flex rounded-lg border border-zinc-800 bg-[#111113] px-4 py-2.5 w-fit">
        <code className="mono text-xs text-violet-400">const value = useContext(MyContext)</code>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <ThemeDemo />
      <UserAuthDemo />
      <LangDemo />
    </div>

  </div>
)

export default UseContextDemo

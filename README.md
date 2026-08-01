# React Hooks

A dark-themed, interactive reference dashboard that demonstrates every standard React hook through minimal, production-grade examples.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white&style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white&style=flat-square)
![ESLint](https://img.shields.io/badge/ESLint-10-4B32C3?logo=eslint&logoColor=white&style=flat-square)


### Overview

**React Hooks** is a self-contained learning environment designed to make every built-in React hook instantly understandable. Rather than reading abstract documentation, you interact with live demos — each one isolated, annotated, and stripped of boilerplate so the hook's behaviour is front and centre.

The app features a dark sidebar navigator, letting you switch between hook demos instantly without page reloads.


### Tech Stack

| Layer | Technology | Version |
| :--- | :--- | :--- |
| UI Library | React | ^19.2.7 |
| Build Tool | Vite | ^8.1.1 |
| Styling | Tailwind CSS | ^4.3.2 |
| Linting | ESLint + react-hooks plugin | ^10.x |


### Getting Started

**Prerequisites:** Node.js ≥ 18 and npm ≥ 9.

```bash
# 1. Clone the repository
git clone https://github.com/harshabalaji77/react-js-hooks.git
cd react-js-hooks

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. Hot Module Replacement (HMR) is enabled — changes reflect instantly.


### Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Build an optimised production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the entire project |


### Hook Catalog

All seven standard hooks are covered, each with three focused, runnable examples.

| # | Hook | Purpose in one line | Demo File |
| :---: | :--- | :--- | :--- |
| 01 | `useState` | Manage local component state | [UseStateDemo.jsx](src/hooks/UseStateDemo.jsx) |
| 02 | `useEffect` | Synchronise with external systems & side effects | [UseEffectDemo.jsx](src/hooks/UseEffectDemo.jsx) |
| 03 | `useRef` | Persist values or reference DOM nodes without re-rendering | [UseRefDemo.jsx](src/hooks/UseRefDemo.jsx) |
| 04 | `useContext` | Read shared context without prop drilling | [UseContextDemo.jsx](src/hooks/UseContextDemo.jsx) |
| 05 | `useReducer` | Handle complex state logic via a reducer + dispatch | [UseReducerDemo.jsx](src/hooks/UseReducerDemo.jsx) |
| 06 | `useMemo` | Cache expensive computed values between renders | [UseMemoDemo.jsx](src/hooks/UseMemoDemo.jsx) |
| 07 | `useCallback` | Cache function references to prevent unnecessary re-renders | [UseCallbackDemo.jsx](src/hooks/UseCallbackDemo.jsx) |


### Demo Breakdown

### 1. `useState`
> Manages component-local state. React schedules a re-render whenever state changes.

- **Counter** — Simple arithmetic manipulation demonstrating state increments and decrements.
- **Live Text Input** — Explains controlled input binding and real-time UI synchronisation.
- **Theme Toggle** — Demonstrates swapping component layouts via a boolean state value.

#

### 2. `useEffect`
> Synchronises your component with external systems or side effects.

- **Document Title** — Modifies the browser tab title and cleans up on unmount.
- **Network Status** — Subscribes to `online`/`offline` document events and releases listeners on cleanup.
- **Timer** — Implements an automated interval, demonstrating correct `clearInterval` cleanup.

#

### 3. `useRef`
> Holds a mutable value that persists across renders without triggering a re-render, or provides direct access to a DOM node.

- **Direct DOM Access** — Controls standard DOM elements (focus, selection, scroll) imperatively.
- **State vs. Ref** — Side-by-side illustration of `useState` (triggers re-render) vs. `useRef` (silent mutation).
- **Track Previous Value** — Uses a ref as offset memory to inspect what a value was on the previous render.

#

### 4. `useContext`
> Reads a value from the nearest Context Provider in the tree — no props required.

- **Theme Context** — Shares a dark/light theme value across child components without prop drilling.
- **User Auth Context** — Provides a logged-in user object to any component in the tree.
- **Language Context** — Switches the UI language globally from a single context value.

#

### 5. `useReducer`
> An alternative to `useState` for complex state logic — uses a reducer function and dispatched actions.

- **Data Fetching (State Machine)** — Prevents impossible states by ensuring the app is always in one explicit status: `idle`, `loading`, `success`, or `error`.
- **Form State** — Manages a multi-field object, dynamically updating properties by input name.
- **Todo List Array** — Handles `add`, `update`, and `delete` operations predictably without mutating state.

#

### 6. `useMemo`
> Caches the result of a calculation. Only re-computes when dependencies change.

- **Expensive Calculation** — Simulates heavy JS math to show how caching prevents UI freezes when unrelated state (e.g., theme) changes.
- **Filtering Lists** — Prevents an array `.filter()` from running on every render.
- **Referential Equality** — Proves how wrapping an object in `useMemo` breaks infinite loops in `useEffect` dependency arrays.

#

### 7. `useCallback`
> Caches a function definition so its reference stays stable across renders.

- **Prevent Child Re-renders** — A stable callback paired with `React.memo` stops a child from re-rendering when unrelated parent state changes.
- **Stable in `useEffect`** — Wrapping a callback in `useCallback` prevents an infinite loop when that function is a `useEffect` dependency.
- **`useMemo` vs `useCallback`** — A side-by-side comparison: `useMemo` caches a *value*, `useCallback` caches the *function itself*.


### Project Structure

```
react-hooks/
├── public/                  # Static assets served as-is
├── src/
│   ├── hooks/               # One demo file per React hook
│   │   ├── UseStateDemo.jsx
│   │   ├── UseEffectDemo.jsx
│   │   ├── UseRefDemo.jsx
│   │   ├── UseContextDemo.jsx
│   │   ├── UseReducerDemo.jsx
│   │   ├── UseMemoDemo.jsx
│   │   └── UseCallbackDemo.jsx
│   ├── App.jsx              # Sidebar navigator + demo renderer
│   ├── index.css            # Global styles & Tailwind imports
│   └── main.jsx             # React DOM entry point
├── index.html               # HTML shell
├── vite.config.js           # Vite + React plugin config
├── eslint.config.js         # ESLint flat config
└── package.json
```


### Adding a New Hook Demo

1. Create `src/hooks/UseXxxDemo.jsx` following the structure of an existing demo.
2. Import it in `src/App.jsx` and add an entry to the `HOOKS` array.
3. The sidebar and router update automatically — no other wiring needed.

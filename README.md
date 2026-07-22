## React Hooks Catalog

An interactive, dark-themed learning laboratory demonstrating standard React hooks through minimal, production-grade examples. Built using React 19, Vite, and Tailwind CSS.

### Getting Started

Follow these steps to run the interactive dashboard locally:

```bash
# Install dependencies
npm install

# Start the local development server
npm run dev
```

---

### Hooks Status & Directory Map

| # | Hook | Status | Demo File |
| :--- | :--- | :--- | :--- |
| 01 | `useState` | Completed | [UseStateDemo.jsx](src/hooks/UseStateDemo.jsx) |
| 02 | `useEffect` | Completed | [UseEffectDemo.jsx](src/hooks/UseEffectDemo.jsx) |
| 03 | `useRef` | Completed | [UseRefDemo.jsx](src/hooks/UseRefDemo.jsx) |
| 04 | `useContext` | Planned | *Coming soon* |
| 05 | `useReducer` | Planned | *Coming soon* |
| 06 | `useMemo` | Planned | *Coming soon* |
| 07 | `useCallback` | Planned | *Coming soon* |

---

#### Detailed Catalog & Included Examples

#### 1. useState
Manages component-local state. React automatically schedules a re-render when state changes.
* **Counter:** Simple arithmetic manipulation demonstrating state increments and decrements.
* **Live Text Input:** Explains controlled input binding and real-time UI synchronization.
* **Theme Toggle:** Demonstrates swapping component layouts via boolean state values.

#### 2. useEffect
Synchronizes your code with external systems or side effects.
* **Document Title:** Modifies the browser tab title, cleaning up upon component change.
* **Network Status:** Subscribes to document event listeners (`online`/`offline`) and releases resources.
* **Timer:** Implements an automated interval timer demonstrating correct hook cleanup behavior.

#### 3. useRef
Holds persistent values that persist across renders without triggering a re-render, or references DOM elements directly.
* **Direct DOM Access:** Controls standard DOM elements (like focus/selection attributes).
* **State vs. Ref:** Illustrates the functional difference between re-rendering state vs. silent refs.
* **Track Previous Value:** Implements an offset memory reference to inspect a value's state on the previous render.

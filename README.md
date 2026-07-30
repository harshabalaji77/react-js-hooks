# React Hooks

An interactive, dark-themed learning laboratory demonstrating standard React hooks through minimal, production-grade examples. Built using React 19, Vite, and Tailwind CSS.

### Getting Started

Follow these steps to run the interactive dashboard locally:

```bash
# Install dependencies
npm install

# Start the local development server
npm run dev
```

#

### Hooks Status & Directory Map

| # | Hook | Status | Demo File |
| :--- | :--- | :--- | :--- |
| 01 | `useState` | Completed | [UseStateDemo.jsx](src/hooks/UseStateDemo.jsx) |
| 02 | `useEffect` | Completed | [UseEffectDemo.jsx](src/hooks/UseEffectDemo.jsx) |
| 03 | `useRef` | Completed | [UseRefDemo.jsx](src/hooks/UseRefDemo.jsx) |
| 04 | `useContext` | Completed | [UseContextDemo.jsx](src/hooks/UseContextDemo.jsx) |
| 05 | `useReducer` | Completed | [UseReducerDemo.jsx](src/hooks/UseReducerDemo.jsx) |
| 06 | `useMemo` | Completed | [UseMemoDemo.jsx](src/hooks/UseMemoDemo.jsx) |
| 07 | `useCallback` | Planned | *Coming soon* |

#

### Detailed Catalog & Included Examples

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

#### 4. useContext
Reads a value from the nearest Context Provider in the tree without prop drilling.
* **Theme Context:** Shares a dark/light theme value across child components with no props.
* **User Auth Context:** Provides a logged-in user object to any component in the tree.
* **Language Context:** Switches the UI language globally from a single context value.

#### 5. useReducer
An alternative to `useState` for managing more complex state logic using a reducer function and dispatched actions.
* **Data Fetching (State Machine):** Prevents impossible states by guaranteeing the app is only ever in one explicit status (idle, loading, success, or error) at a time.
* **Form State:** Manages an object with multiple fields, dynamically updating properties based on input names.
* **Todo List Array:** Handles array operations (add, map, filter/delete) predictably without mutating the original state.

#### 6. useMemo
Caches the result of a calculation between renders. It only recalculates when dependencies change, protecting performance.
* **Expensive Calculation:** Simulates heavy JS math to demonstrate how caching the result prevents the UI from freezing when unrelated state (like theme) changes.
* **Filtering Lists:** Prevents an expensive array `filter()` operation from running on every single render.
* **Referential Equality:** Proves how wrapping an object configuration in `useMemo` prevents infinite loops in `useEffect` dependency checks.



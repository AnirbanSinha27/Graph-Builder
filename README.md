# App Graph Builder

A small frontend application that visualizes and inspects application service graphs using an interactive canvas.

This project was built as a take-home assignment to demonstrate **modern React frontend architecture**, including layout composition, graph rendering, global state management, and server-state handling with mock APIs.

---

## ✨ Features

- **Structured layout**
  - Top bar, left rail, center canvas, right inspector panel
  - Responsive: inspector becomes a slide-over drawer on smaller screens

- **Interactive graph canvas**
  - Built with **ReactFlow (xyflow)**
  - Drag, pan, zoom
  - Select nodes
  - Delete nodes with `Delete` / `Backspace`
  - Fit view control

- **Service Node Inspector**
  - Contextual panel shown when a node is selected
  - Status pill (Healthy / Degraded / Down)
  - Tabs (Config / Runtime)
  - Editable node name and description
  - Slider + numeric input (fully synced)
  - Changes persist directly to the node data

- **Mock backend with TanStack Query**
  - Fetch apps list
  - Fetch graph (nodes + edges) per app
  - Simulated latency
  - Simulated error states
  - Cached results and automatic refetch on app change

- **State management**
  - **Zustand** for global UI state
    - selected app
    - selected node
    - mobile panel open/close
    - active inspector tab
  - **TanStack Query** for server state
  - **ReactFlow** for graph state

---

## 🧱 Tech Stack

- **React + Vite**
- **TypeScript** (strict mode enabled)
- **ReactFlow (xyflow)** – graph rendering
- **TanStack Query** – server state & caching
- **Zustand** – global UI state
- **Tailwind CSS** – styling
- **shadcn/ui** – UI components
- **ESLint** – linting

---

## 🧠 Architecture Overview

- **Server data (apps, graph)**  
  → Managed by TanStack Query via mock async functions

- **Client/UI state**  
  → Managed by Zustand (selection, UI toggles)

- **Graph state (nodes, edges)**  
  → Managed in React state and passed to both canvas and inspector  
  → Single source of truth shared between ReactFlow and inspector

This separation avoids duplicated state and keeps updates predictable.

---

## 🔌 Mock API Strategy

This project uses **function-based mock APIs** (no real HTTP server), as allowed by the task.

```ts
fetchApps(): Promise<App[]>
fetchGraph(appId): Promise<{ nodes; edges }>
```

- In-memory data
- Simulated latency via `setTimeout`
- Random error simulation
- Consumed directly by TanStack Query

There are no real `/apps` or `/apps/:id/graph` endpoints exposed in the browser.

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open: 👉 http://localhost:5173

---

## 🧪 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript type checking
```

---

## 📝 Notes

- This project focuses on correctness, clarity, and architecture, not pixel-perfect UI.
- The left rail is intentionally static, as allowed by the assignment.
- Mock APIs are implemented at the function level to keep the project frontend-only.

---

## ✅ Assignment Coverage

All required criteria from the task are implemented:

- Layout composition
- ReactFlow interactions
- Service node inspector
- TanStack Query with mock APIs
- Zustand global state
- Strict TypeScript
- Linting and scripts
- Responsive behavior

---

Built as part of a frontend intern take-home assignment to demonstrate real-world React patterns and state management.
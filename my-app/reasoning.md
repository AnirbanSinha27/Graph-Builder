# Reasoning & Design Decisions

This document explains the approach, architectural decisions, and trade-offs made while building the **App Graph Builder** frontend.

The goal of this project was to demonstrate correct usage of modern React tooling, clean separation of concerns, and predictable state management rather than pixel-perfect UI or excessive features.

---

## 1. Overall Approach

The application is structured around three clearly separated responsibilities:

- **Server state** (apps list, graph data)
- **Client/UI state** (selection, panel visibility)
- **Graph rendering and interaction**

Each responsibility is handled by a tool that is well-suited for that problem space.

This separation keeps the codebase easy to reason about and avoids duplicated or conflicting state.

---

## 2. State Management Strategy

### Server State — TanStack Query

TanStack Query is used for all data that conceptually comes from the backend:

- Applications list
- Graph data (nodes and edges) per application

Reasons for this choice:
- Built-in caching and refetching
- Explicit loading and error states
- Automatic refetch when query keys change
- Clear distinction between server and client state

Mock APIs are implemented as Promise-based functions with simulated latency and errors, as allowed by the assignment.

---

### Client/UI State — Zustand

Zustand is used for global UI state that needs to be accessed across multiple components:

- `selectedAppId`
- `selectedNodeId`
- `isMobilePanelOpen`
- `activeInspectorTab`

Reasons for this choice:
- Minimal API and boilerplate
- No provider nesting
- Avoids prop drilling
- Predictable updates without over-storing derived data

Only identifiers and UI flags are stored in Zustand; full node data is intentionally not stored there.

---

### Graph State — ReactFlow + React State

ReactFlow manages graph behavior (dragging, zooming, selection), while the actual `nodes` and `edges` live in React state.

Reasons for this choice:
- Single source of truth for graph data
- Inspector and canvas both operate on the same node state
- Node edits remain predictable and immutable
- Avoids syncing issues that arise when duplicating graph data in global stores

---

## 3. Layout & Component Structure

The UI is composed into clear layout sections:

- Top bar
- Left rail (static icon-style navigation)
- Center canvas (ReactFlow)
- Right panel (apps list + node inspector)

This mirrors real-world dashboard layouts and allows each area to evolve independently.

On smaller screens, the right panel becomes a slide-over drawer controlled via Zustand.

---

## 4. Service Node Inspector Design

The inspector is intentionally driven by the currently selected node ID:

- When no node is selected, the inspector shows a placeholder
- When a node is selected, its data is passed into the inspector
- All edits are propagated back to the ReactFlow node state

The inspector UI includes:
- Status indicator
- Tab-based sections (Config / Runtime)
- Synchronized slider and numeric input
- Editable name and description

This mirrors how real infrastructure or workflow tools expose node configuration.

---

## 5. Keyboard & Interaction Handling

Keyboard shortcuts (Delete / Backspace) are handled at the canvas level to allow:

- Deleting the currently selected node
- Automatically removing connected edges
- Clearing selection after deletion

Clicking on empty canvas space clears the selection, keeping the UI state consistent.

---

## 6. TypeScript & Code Quality

TypeScript strict mode is enabled to ensure:

- Explicit data models
- Safe state updates
- Early detection of integration bugs

ESLint is used to enforce:
- Hook dependency correctness
- Avoidance of `any`
- Consistent React patterns

Some ESLint rules are selectively disabled for `shadcn/ui` components where library-generated patterns conflict with strict refresh rules.

---

## 7. Trade-offs & Scope Decisions

- No real backend or HTTP endpoints were implemented, as the assignment explicitly allows mock APIs.
- The left navigation rail is static to keep focus on core requirements.
- Styling is intentionally minimal and functional rather than pixel-perfect.
- MSW was not used to avoid unnecessary complexity for a frontend-only task.

---

## 8. Summary

This project prioritizes:
- Correct architectural decisions
- Clean state separation
- Predictable data flow
- Readability and maintainability

The result is a small but realistic frontend application that demonstrates real-world React patterns and decision-making.

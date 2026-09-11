# Metrics Dashboard — Week 1: Dashboard Shell

A React + TypeScript dashboard shell with a draggable widget grid, collapsible sidebar, theme system, and full state persistence.

## Stack

- Vite + React + TypeScript
- React Router v7 (client-side routing)
- Tailwind CSS (styling)
- No external drag library — drag/keyboard-move logic is hand-built

## Architecture

The app has three independent features — **sidebar**, **theme**, **widget layout grid** — all wired into one central state object rather than managing their own local state. This was a deliberate constraint from the start: no feature is allowed to hold a duplicate or derived copy of something already tracked centrally.

src/
state/
types.ts # AppState, LayoutItem, StoredEnvelope shapes
defaults.ts # fallback state used on first load / corrupted data
storage.ts # the ONLY file allowed to touch localStorage
reducer.ts # every state transition, as one switch statement
StateContext.tsx # React context + provider wrapping useReducer
features/
sidebar/
Sidebar.tsx
SidebarItem.tsx
useSidebarState.ts
useMediaQuery.ts
layout-grid/
LayoutGrid.tsx
Widget.tsx
gridMath.ts # pure functions — no React imports, fully testable
metric-cards/
MetricCard.tsx
cardRegistry.ts # card id -> title/config lookup (separate from layout)
mockApi.ts # simulated fetch, ~15% random failure rate
useMetricData.ts
debug/
DebugPanel.tsx # export/import state as JSON
app/
App.tsx
routes/
DashboardPage.tsx
SettingsPage.tsx
NotFoundPage.tsx
theme.css # CSS custom properties for light/dark tokens
main.tsx
index.html # blocking inline theme-bootstrap script


Theme is a special case: it's partially handled *outside* React entirely. A synchronous inline `<script>` in `index.html`'s `<head>` reads the saved theme preference and sets `data-theme` on `<html>` before the page paints — this prevents a flash of the wrong theme on reload. Once React mounts, `StateContext` takes over syncing `data-theme` whenever `state.theme` changes.

## State structure

Everything lives in one object, held by a single `useReducer` inside `StateContext.tsx`:

```json
{
  "theme": "dark",
  "sidebar": { "collapsed": false },
  "layout": [
    { "id": "w1", "x": 0, "y": 0, "w": 2, "h": 1, "collapsed": false },
    { "id": "w2", "x": 2, "y": 0, "w": 2, "h": 2, "collapsed": false }
  ]
}
```

Rules followed throughout:
- No component holds its own copy of theme, sidebar-collapsed, or layout — they all read from `useAppState()`.
- Values that can be derived on render (e.g. `isMobile` from a media query, active route from the router) are computed each render, never stored.
- Metric *values* (the numbers shown on each card) are intentionally **not** part of this state — they live in local component state inside `useMetricData`, refetched fresh on every mount. Persisting fetched data would risk showing stale numbers after reload with no indication they're stale.
- Card *content/config* (title, id) is kept in `cardRegistry.ts`, separate from `layout` (which only tracks position/size/visibility). Reordering or dragging never touches card content.

## How persistence works

All reads/writes to `localStorage` go through one file: `state/storage.ts`. No other file in the app calls `localStorage` directly.

- State is saved wrapped in a versioned envelope: `{ version: 1, state: {...} }`.
- On load, `loadState()` parses the saved value; if it's missing, malformed JSON, or an unrecognized version number, it silently falls back to `defaultState` rather than crashing.
- All `localStorage` calls are wrapped in try/catch, since Safari private-browsing mode throws just from accessing it.
- Saving happens automatically via a `useEffect` in `StateContext` that fires on every state change — no feature needs to remember to persist manually.
- `exportStateAsJSON` / `importStateFromJSON` (used by the Debug Panel) let you download the full state as a `.json` file and re-import an edited version, replacing state entirely via the `IMPORT_STATE` action.

**Known inconsistency:** the `index.html` bootstrap script currently reads a separate `theme-preference` key (needed since it must run before React and the storage module exist), while the rest of the app persists theme inside the main `metrics-dashboard-state` envelope. These aren't currently synced. Flagged as a follow-up, not yet resolved.

## How the drag system works

Widgets are positioned with `position: absolute`, using pixel coordinates computed from grid units (`gridToPixels()` in `gridMath.ts`, based on a fixed `GRID_CELL_SIZE`).

- Drag is implemented with pointer events (`onPointerDown` / `onPointerUp`), not the native HTML5 drag API — this gives uniform behavior across mouse, touch, and pen with less boilerplate.
- Position is only computed and dispatched on `pointerUp` (drop) — not on every `pointermove` frame. This avoids a state update (and therefore a `localStorage` write) on every pixel of movement during a drag.
- `computeSnappedPosition()` in `gridMath.ts` is a pure function: given a start position and a raw pixel delta, it returns a new grid position, rounded to the nearest cell and clamped within `GRID_COLUMNS` / `GRID_ROWS` so widgets can't be dragged outside the visible grid.
- Keyboard users can move a focused widget with arrow keys, one grid cell at a time, using the same clamping bounds as drag.
- No collision detection — widgets can currently be moved on top of one another. Out of scope for this pass.

## Accessibility notes

- Sidebar toggle: real `<button>`, `aria-expanded`/`aria-controls` reflect actual state.
- Active route: `NavLink`'s `isActive` sets `aria-current="page"` automatically.
- Widgets: `tabIndex={0}`, `role="group"`, `aria-label` describing the arrow-key interaction, visible focus ring.
- `prefers-reduced-motion` respected globally via a CSS media query that collapses all transition/animation durations.

## Known gaps / not yet built

- Mobile drawer overlay (focus trap, close-on-Escape) — sidebar collapse logic exists, but the actual overlay UI for mobile wasn't built.
- Resize handles on widgets (spec listed this as optional/bonus).
- Theme toggle UI — the state and DOM-sync logic exist (`SET_THEME` action, `data-theme` sync effect), but no button/UI triggers it yet.
- Visual polish pass — functionality was prioritized throughout; styling was kept intentionally minimal.
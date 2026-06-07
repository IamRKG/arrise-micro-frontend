# Arrise Micro-Frontend Architecture

A micro-frontend platform built with **Module Federation**, **Rspack**, and **pnpm monorepo** — demonstrating cross-framework integration (React + Vue).

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Monorepo (pnpm)                        │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │                  Host:3000                         │  │
│  │  Router: /product  /checkout  /cart                │  │
│  └──────┬──────────────┬──────────────┬───────────────┘  │
│         │ MF           │ MF          │ MF               │
│         ▼              ▼              ▼                  │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐            │
│  │ Product   │  │ Checkout  │  │ Cart      │            │
│  │ :3001     │  │ :3002     │  │ :3003     │            │
│  │ (React)   │  │ (React)   │  │ (Vue)     │            │
│  └───────────┘  └───────────┘  └───────────┘            │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │                   Packages                         │  │
│  │  shared-ui    │   event-bus    │   shared-auth     │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Monorepo | pnpm workspaces |
| Bundler | Rspack |
| Module Federation | `@rspack/core` ModuleFederationPlugin |
| Host | React 19 + React Router 7 |
| Product MFE | React |
| Checkout MFE | React |
| Cart MFE | Vue 3 |
| Cross-framework | VueWrapper bridge component |
| Shared State | Window-based globals (`window.__ARRISE_AUTH__`, `window.__ARRISE_EVENT_BUS__`) |
| CI/CD | GitHub Actions + Vercel |

## Project Structure

```
arrise-micro-frontend/
├── apps/
│   ├── host/          → App Shell (React) - port 3000
│   ├── product/       → Product MFE (React) - port 3001
│   ├── checkout/      → Checkout MFE (React) - port 3002
│   └── cart/          → Cart MFE (Vue) - port 3003
├── packages/
│   ├── shared-ui/     → Design tokens, Button, Card components
│   ├── event-bus/     → Pub/Sub + persistent store
│   └── shared-auth/   → Authentication state management
└── .github/
    └── workflows/
        └── deploy.yml → Path-based CI/CD pipeline
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Run all apps in parallel
pnpm dev

# Run individual app
pnpm --filter @arrise/host dev
pnpm --filter @arrise/product dev
```

## Key Architectural Decisions

### Module Federation
- Host loads MFEs at **runtime** via `remoteEntry.js`
- Shared dependencies (`react`, `react-dom`, `react-router-dom`) configured as **singletons** to avoid duplicate instances
- Each MFE exposes only `App.jsx` — internal components stay private

### Dual Entry Point Pattern
- `index.js` → standalone mode (own BrowserRouter, full routes)
- `App.jsx` → MFE mode (no Router, relative routes, loaded by Host)

### Cross-Framework Integration
- `VueWrapper.jsx` bridges React and Vue using `useRef` + `createApp`
- React renders a `<div>`, Vue mounts into it
- Proper cleanup on unmount

### State Management
- **Auth**: `window.__ARRISE_AUTH__` — shared across all bundles
- **Events**: `window.__ARRISE_EVENT_BUS__` — pub/sub + persistent key-value store
- **No cross-MFE state libraries** — browser platform APIs only

### Package Connections
| Package | Used By |
|---------|---------|
| shared-ui | Product |
| event-bus | Product, Cart |
| shared-auth | Host, Product |

## CI/CD Pipeline

```
Push to main → detect-changes (dorny/paths-filter)
                    │
                    ├── apps/product changed → deploy Product
                    ├── apps/checkout changed → deploy Checkout
                    ├── apps/cart changed → deploy Cart
                    ├── apps/host changed → deploy Host (last)
                    └── packages/** changed → deploy ALL apps
```

- **Path-based triggers**: Only deploy what changed
- **Deploy order**: Remotes first, Host last
- **CORS headers**: On `remoteEntry.js` for cross-origin loading
- **Environment URLs**: Remote URLs configurable per environment

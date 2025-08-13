# Deskly Client Project

## 1. Project Overview

Deskly is a Vue 3 SPA built with Vite. It consists of a set of reusable **modules** (auth, spaces, booking, etc.). Each module contains its own router, API utilities, Vue components, and store logic.

```
src/
 ├─ modules/         # Feature‑specific directories
 ├─ stores/         # Pinia stores
 ├─ composables/   # Re‑usable hooks
 ├─ api/          # Shared fetch helper
 ├─ router/      # Root router
 └─ components/ # Global components
```

### 2. Development Workflow

| Task                  | Command           |
| --------------------- | ----------------- |
| **Run dev server**    | `npm run dev`     |
| **Build production**  | `npm run build`   |
| **Preview built app** | `npm run preview` |

### 3. Code Style

- **Imports** – Absolute alias `@/` for src root. Example:
    ```js
    import apiFetch from "@/api/apiFetch.js";
    ```
- **File naming** – CamelCase for components (`AddSpaceView.vue`), snake_case for utilities and APIs.
- **Constants** – `UPPER_SNAKE_CASE`.
- **Error handling** – Use `try/catch`, return `{ ok: false, error }`.
- **No console.log** – Remove before committing.

### 4. Adding a New Module

1. **Create folder**: `src/modules/<name>/`.
2. Add sub‑folders:
    - `router/` – Vue Router config.
    - `api/` – API helpers.
    - `components/` – Vue components.
    - `pages/` (optional) – Page wrappers.
3. Register router:
    ```js
    // src/modules/<name>/router/index.js
    import { createRouter, createWebHistory } from "vue-router";
    const routes = [{ path: "/<name>", component: () => import("../<Name>View.vue") }];
    export default createRouter({ history: createWebHistory(), routes });
    ```
4. Import and mount in `src/router/index.js`:
    ```js
    import <Name>Router from '@/modules/<name>/router'
    router.addRoute(<Name>Router)
    ```
5. Add Pinia store if needed in `src/stores/`.
6. Run tests or lint before committing.

### 5. Testing

Currently no tests; add Vitest if required.

### 6. Useful Scripts

```bash
npm run lint      # (Add ESLint)
npm run format   # Prettier
npm run test     # Vitest
```

Happy hacking!

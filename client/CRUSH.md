# CRUSH.md

## Build

- **npm run dev** – Starts Vite dev server.
- **npm run build** – Builds production assets.
- **npm run preview** – Serves built output.

## Lint / Format

- No linter configured; recommend adding ESLint + Prettier.
- Add scripts:
    ```bash
    npm i -D eslint prettier
    npm set-script lint "eslint . --ext .js,.vue"
    npm set-script format "prettier --write ."
    ```

## Tests

- No test framework configured.
- Add Vitest:
    ```bash
    npm i -D vitest
    npm set-script test "vitest"
    ```
- Run a single test: **npm run test -- testFileName.test.js**.

## Code Style

- Imports: absolute via @/ prefix.
- Files end with .js/.vue; use camelCase for component names.
- Constants in UPPER_SNAKE_CASE.
- Use async/await with try/catch; rethrow or return structured error.
- Avoid console.log in production.
- Keep files under 200 lines; extract helpers.
- Use `export default` for Vue components.

## Cursor / Copilot

- No Cursor or Copilot rules.

---

**Note:** Ensure `.crush` directory is ignored.

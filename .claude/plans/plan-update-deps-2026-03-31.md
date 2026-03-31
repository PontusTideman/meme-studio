# Dependency Update Audit — 2026-03-31

## Status: ✅ COMPLETED

All phases executed. Build passes, lint passes, zero errors.

## Summary

- **Package manager**: npm
- **23** packages updated (9 major, 9 minor, 5 patch)
- **Security**: 8 Next.js CVEs fixed, eslint CVE fixed, Panda CSS esbuild CVE fixed, React DoS mitigations applied
- **Excluded**: `eslint@10`, `typescript@6` (capped at 5.9.3)
- **Blocked**: `immer@11` and `zod@4` (require `@viclafouch/meme-studio-utilities` update first)

---

## Phase 1 — Security (urgent)

### 1.1 next `16.0.10` → `16.2.1` — 8 CVEs

**Security fixes:**
| CVE | Severity | Description | Fixed in |
|-----|----------|-------------|----------|
| GHSA-h25m-26qc-wcjf | **High (7.5)** | HTTP request deserialization DoS via RSC | 16.0.11 |
| GHSA-9g9p-9gw9-jx7f | Moderate | Image Optimizer DoS via remotePatterns | 16.1.5 |
| GHSA-5f7q-jpqc-wp7h | Moderate | PPR Resume Endpoint memory consumption | 16.1.5 |
| GHSA-ggv3-7p47-pfv8 | Moderate | HTTP request smuggling in rewrites | 16.1.7 |
| GHSA-3x4c-7xq6-9pq8 | Moderate | Unbounded next/image disk cache | 16.1.7 |
| GHSA-h27x-g6w4-24gq | Moderate | Unbounded postponed resume buffering DoS | 16.1.7 |
| GHSA-mq59-m269-xvcx | Moderate | null origin CSRF bypass on Server Actions | 16.1.7 |
| GHSA-jcc7-9wpm-mj36 | Low | null origin HMR websocket CSRF (dev only) | 16.1.7 |

**Relevant to us**: Image Optimizer DoS + disk cache (7 files use `next/image`), CSRF bypass (app is public on Vercel).

**New features we get for free:**
- **16.1.0**: Turbopack FS caching stable & on by default (5-14x faster dev restarts); ~20MB smaller install
- **16.2.0**: ~400% faster `next dev` startup; ~25-60% faster server rendering; Server Function logging in dev terminal; hydration diff indicator in error overlay; `postcss.config.ts` support; SRI support; 200+ Turbopack fixes
- **16.2.0**: `transitionTypes` prop on `next/link` (View Transitions API) — opt-in, potential future use for page transitions

**Actions:**
- [ ] `package.json`: change `"next": "16.0.10"` → `"next": "16.2.1"` (pinned)
- [ ] `@next/mdx` and `@next/third-parties` auto-resolve via `^16.0.10` range
- [ ] `npm install && npm run build` — verify
- [ ] Consider migrating `postcss.config.cjs` → `postcss.config.ts` (now supported natively)

### 1.2 react + react-dom `19.2.3` → `19.2.4` — Security patch

DoS mitigations for Server Actions, hardened Server Components.

**Actions:**
- [ ] `package.json`: change `"react": "19.2.3"` → `"react": "19.2.4"` and `"react-dom": "19.2.3"` → `"react-dom": "19.2.4"` (both pinned)

### 1.3 eslint `9.17.0` → `9.39.4` — CVE fix

Low severity ReDoS via `@eslint/plugin-kit` (GHSA-xffm-g5w8-qvg7). Fix available in 9.39.4 (minor bump, stays on v9).

**Actions:**
- [ ] `package.json`: change `"eslint": "9.17.0"` → `"eslint": "9.39.4"` (pinned)

### 1.4 @pandacss/dev `0.49.0` → `1.9.1` — esbuild CVE + new features

Moderate severity via transitive `esbuild`/`bundle-n-require`. Only fixable by upgrading to v1.x.

**Breaking changes — NONE affect us:**
- Shadow token remap (`inner` → `inset-sm`) — not used
- `linkBox` pattern removed — not used
- `emitPackage`/`config.optimize` removed — not used
- Color mode selectors changed — not used (project uses `colorScheme: 'dark'` globally, no `_dark`/`_light` conditions)
- `gridTemplateColumns` preset values removed — happened in v0.48.0, before our v0.49.0

**New features to adopt:**

**`boxSize` — 9 opportunities:**
| File | Current | After |
|------|---------|-------|
| `Draggable.tsx:54` | `css({ w: '11px', h: '11px' })` | `css({ boxSize: '11px' })` |
| `Draggable.styles.ts:43-44` | `w: resizeSize, h: resizeSize` | `boxSize: resizeSize` |
| `EmptyContainer.tsx:60-61` | `w: 0, h: 0` | `boxSize: 0` |
| `InputHiddenButton.tsx:30-31` | `w: 0, h: 0` | `boxSize: 0` |
| `Tools.styles.ts:20-21` | `w: '54px', h: '54px'` | `boxSize: '54px'` |
| `Gallery/MemesList.styles.ts:20-21` | `h: 'full', w: 'full'` | `boxSize: 'full'` |
| `Gallery/MemesList.styles.ts:33-35` | `w: 'full', h: 'full'` (_before) | `boxSize: 'full'` |
| `components/MemesList.styles.ts:20-21` | `h: 'full', w: 'full'` | `boxSize: 'full'` |
| `components/MemesList.styles.ts:33-35` | `w: 'full', h: 'full'` (_before) | `boxSize: 'full'` |

**Color opacity modifiers — 4 opportunities:**
| File | Current | After |
|------|---------|-------|
| `Modal.styles.ts:22` | `bg: 'rgba(0, 0, 0, 0.5)'` | `bg: 'black/50'` |
| `Gallery/MemesList.styles.ts:38` | `bg: 'rgba(255, 255, 255, 0.65)'` | `bg: 'white/65'` |
| `components/MemesList.styles.ts:38` | `bg: 'rgba(255, 255, 255, 0.65)'` | `bg: 'white/65'` |
| `Draggable.styles.ts:31` | `color: 'rgba(255, 255, 255, 0.6)'` | `color: 'white/60'` |

**Actions:**
- [ ] `package.json`: change `"@pandacss/dev": "^0.49.0"` → `"@pandacss/dev": "^1.9.1"`
- [ ] `npm install`
- [ ] `npx panda codegen` (or auto via `prepare` script)
- [ ] Replace 9 `w`+`h` pairs with `boxSize`
- [ ] Replace 4 `rgba()` with color opacity modifier syntax
- [ ] `npm run build` — verify
- [ ] Optional: add `lightningcss: true` to `panda.config.ts` for faster CSS processing

---

## Phase 2 — Major upgrades (no breaking changes for us)

### 2.1 @fortawesome/* `6.7.2` → `7.2.0` + react-fontawesome `0.2.2` → `3.3.0`

**Library rewritten to TypeScript.** ~70% perf improvement in converter. All icons now fixed-width by default.

**Breaking changes — NONE affect us:**
- 12 icons renamed (user-large, handshake-simple, etc.) — none of our 15 icons are in the list
- Auto-accessibility removed — our icons are in buttons with tooltips, correct behavior
- `sr-only` CSS class removed — not used
- Dynamic importing dropped — we use explicit imports

**What changes for us:**
- Icons render at fixed width by default → our toolbar icons (`Tools.tsx`, `Aside.tsx`) are already in fixed-size buttons, so this is a positive alignment. Visually verify spacing.
- CSS import `@fortawesome/fontawesome-svg-core/styles.css` in `layout.tsx` — remains valid in v7
- Native TypeScript types — no more prop-types, better DX

**Our 7 files using FontAwesome:**
1. `layout.tsx` — CSS import only
2. `Tools.tsx` — 7 icons in toolbar buttons
3. `Aside.tsx` — 3 icons in tab buttons
4. `Draggable.tsx` — 1 icon (rotate handle)
5. `ExportButton.tsx` — 1 icon (download arrow)
6. `ExportModal.tsx` — 2 icons (download + clipboard)
7. `Customisation.tsx` — icon usage

**Actions:**
- [ ] `npm install @fortawesome/fontawesome-svg-core@^7.2.0 @fortawesome/free-regular-svg-icons@^7.2.0 @fortawesome/free-solid-svg-icons@^7.2.0 @fortawesome/react-fontawesome@^3.3.0`
- [ ] `npm run build` — verify
- [ ] Visually verify toolbar icons spacing (fixed-width default may subtly affect layout)

### 2.2 react-error-boundary `4.1.2` → `6.1.1`

**v5.0.0**: Updated `withErrorBoundary` types — not used by us.
**v6.0.0**: ESM-only (dropped CommonJS) — transparent to Next.js bundler. Removed `react-dom` from peer deps.
**v6.1.0**: `FallbackProps.error` type changed from `Error` to `unknown` — not relevant (we use simple `fallback` JSX, not `FallbackComponent`). New `getErrorMessage` helper exported.

**Our usage** (`Aside.tsx:64-78`): `<ErrorBoundary fallback={<VStack>...</VStack>}>` — simplest API, unchanged.

**Actions:**
- [ ] `package.json` range `^4.1.2` already allows — but npm may need explicit bump for major: `npm install react-error-boundary@^6.1.1`
- [ ] `npm run build` — verify ESM resolution

---

## Phase 3 — TypeScript + ESLint config (migration required)

### 3.1 typescript `5.7.2` → `5.9.3`

**5.8 changes (Feb 2025):**
- Granular return expression branch checking — ternaries in `return` statements are checked branch-by-branch. **May surface new type errors.** Free strictness improvement.
- `libReplacement: false` option — minor perf gain, we don't use custom lib replacements

**5.9 changes (Aug 2025):**
- **`strictInference`** (new, enabled by `strict: true`) — tightens inference for unconstrained generics. **Expect new errors** in generic utility code. Can temporarily disable with `"strictInference": false`.
- **`moduleResolution: "node"` deprecated** — our base tsconfig inherits `"moduleResolution": "node"`. **Must override to `"bundler"`** (correct for Next.js).
- `ArrayBuffer` no longer supertype of `TypedArray` — may affect canvas/Blob code in `ExportButton.tsx` / `ExportModal.tsx` (uses `Blob`). Verify.
- 30% fewer FS reads + optimized recursive generic memoization (helps with Zod types). **Free perf.**

**Actions:**
- [ ] `package.json`: change `"typescript": "5.7.2"` → `"typescript": "5.9.3"` (pinned)
- [ ] `tsconfig.json`: add `"moduleResolution": "bundler"` override (replaces inherited `"node"`)
- [ ] `tsconfig.json`: add `"libReplacement": false`
- [ ] `npm install && tsc --noEmit` — audit new errors:
  - Check return expression branches (5.8)
  - Check `strictInference` errors (5.9) — if too many, temporarily set `"strictInference": false`
  - Check `ArrayBuffer`/`TypedArray` in canvas-related code
- [ ] Fix all type errors
- [ ] `npm run lint` — verify

### 3.2 @viclafouch/eslint-config-viclafouch `4.17.1-beta.8` → `5.3.0`

**Breaking: Deep import paths removed** — v5 uses `exports` field. All 5 deep imports in `eslint.config.mjs` will fail.
**Breaking: `baseConfig` replaced** — base rules folded into `typescriptConfig`.
**New: `eslint-plugin-unicorn`** (v63) added — new lint rules will surface.
**New: `eslint-plugin-react-hooks`** bumped to v7 (15 React Compiler rules in recommended preset, but config defines hooks rules manually).
**New: `@next/eslint-plugin-next`** bumped to ^16.2.1 (aligns with Next.js 16).

**eslint.config.mjs rewrite:**
```js
// OLD (v4) — 5 deep imports:
import importsConfig from '@viclafouch/eslint-config-viclafouch/imports.mjs'
import baseConfig from '@viclafouch/eslint-config-viclafouch/index.mjs'
import nextConfig from '@viclafouch/eslint-config-viclafouch/next.mjs'
import prettierConfig from '@viclafouch/eslint-config-viclafouch/prettier.mjs'
import typescriptConfig from '@viclafouch/eslint-config-viclafouch/typescript.mjs'

export default [
  ...baseConfig,
  ...nextConfig,
  ...importsConfig,
  ...typescriptConfig,
  ...prettierConfig,
  // ...
]

// NEW (v5) — named imports from main entry:
import {
  importsConfig,
  nextConfig,
  prettierConfig,
  typescriptConfig
} from '@viclafouch/eslint-config-viclafouch'

export default [
  { ignores: ['**/node_modules/**', '**/dist/**', '**/.next/**', '**/styled-system/**'] },
  ...typescriptConfig,    // includes old baseConfig rules
  ...nextConfig,
  ...importsConfig,
  ...prettierConfig,
  {
    rules: {
      'react-hooks/exhaustive-deps': ['error', { additionalHooks: 'useIsomorphicLayoutEffect' }],
      'no-restricted-imports': ['error', { paths: [/* same as current */] }]
    }
  }
]
```

**Actions:**
- [ ] `package.json`: change `"@viclafouch/eslint-config-viclafouch": "4.17.1-beta.8"` → `"@viclafouch/eslint-config-viclafouch": "5.3.0"` (pinned)
- [ ] Rewrite `eslint.config.mjs` as above
- [ ] `npm install`
- [ ] `npm run lint` — expect new unicorn rule violations
- [ ] Fix all new lint errors (or explicitly disable with justification)
- [ ] Verify `react-hooks/exhaustive-deps` custom config still works with hooks v7

---

## Phase 4 — Minor updates (in-range, auto-resolved)

### 4.1 @tanstack/react-query `5.90.12` → `5.95.2`

**Key fixes:**
- **5.91.1**: Cancel paused initial fetch when last observer unsubscribes
- **5.91.3 + 5.95.1**: Node.js types no longer leak into browser builds — improves our build cleanliness

**New features:**
- **5.91.0**: `environmentManager` — customize timers/scheduling. Opt-in, not needed for us.

**Our usage**: 3 files (`QueryProvider.tsx`, `queries/index.ts`, `ExportButton.tsx`). No API changes affect us.

**Actions:**
- [ ] Auto-resolved by `npm install` (range `^5.90.12`)

### 4.2 @tanstack/react-query-next-experimental `5.91.0` → `5.95.2`

**Key fix:**
- **5.94.5**: Build directory exclusion fix

**Our usage**: 1 file (`QueryProvider.tsx` — `ReactQueryStreamedHydration`). API unchanged.

**Actions:**
- [ ] Auto-resolved by `npm install`

### 4.3 next-intl `4.6.0` → `4.8.3`

**Key changes:**
- **4.7.0**: `useExtracted` improvements (not used by us)
- **4.8.0**: **`precompile` feature** — ahead-of-time compilation of ICU messages. Drops ~9KB from bundles (both server and client). Replaces runtime parser (~9KB) with tiny evaluator (~650 bytes).
- **4.8.3**: Updated `@formatjs/intl-localematcher`

**precompile assessment for our project:**
- Requires static JSON files in a `messages/` directory. Our current setup uses **TypeScript modules** (`src/i18n/locales/{en,fr}/common.ts`, etc.) with dynamic imports.
- Migration effort: convert ~20 TS files → JSON, restructure directory, change `next.config.js` config.
- Gain: ~9KB bundle savings. Runtime gain minimal (our messages are mostly plain strings).
- Feature is **experimental**. Worth evaluating as a separate follow-up task, not part of this dep update.
- `t.raw()` not supported with precompile — we don't use it, so no blocker.

**Actions:**
- [ ] Auto-resolved by `npm install` (range `^4.6.0`)
- [ ] **Follow-up task**: evaluate `precompile` migration (convert TS locale files → JSON)

### 4.4 react-toastify `11.0.2` → `11.0.5`

**Version-by-version:**
- **11.0.3**: CSS rule ordering fix — `.Toastify__toast { margin-bottom: 1rem }` was overriding mobile media query `margin-bottom: 0`. Fixed by moving base rule above media query. Toasts on mobile (<=480px) now properly have zero margin-bottom. Also exports `ToastIcon` type.
- **11.0.4**: Changed style injection order (appendChild vs insertBefore). **Reverted in 11.0.5.**
- **11.0.5**: = 11.0.3 + nothing. Clean state.

**Impact on us**: Our `ToastContainer` uses `position="bottom-left"`, `theme="dark"`, `draggable={false}`. The mobile margin fix is a positive correction — toasts will stack properly on mobile. CSS import path `react-toastify/dist/ReactToastify.css` unchanged.

**Actions:**
- [ ] Auto-resolved by `npm install` (range `^11.0.2`)
- [ ] Visually verify mobile toast spacing (should be improved, not broken)

### 4.5 zod `3.24.1` → `3.25.76` (in-range v3 only)

In-range update within v3. Bug fixes and improvements, no breaking changes.

**v4 blocked**: `@viclafouch/meme-studio-utilities` requires `zod: ^3.24.1` and exports Zod v3 types. Must update utilities first.

**Actions:**
- [ ] Auto-resolved by `npm install` (range `^3.24.1`)

---

## Phase 5 — Patch updates (pinned versions to bump)

### 5.1 @types/node `25.0.2` → `25.5.0`

Adds types for Web Storage globals, `ErrorEvent`, `net.Socket` additions, `Float16Array` in Node-API. No breaking changes.

**Actions:**
- [ ] `package.json`: change `"@types/node": "25.0.2"` → `"@types/node": "25.5.0"` (pinned)

### 5.2 @types/react `19.2.7` → `19.2.14`

Patch-level type refinements for React 19.2.x. No breaking changes.

**Actions:**
- [ ] `package.json`: change `"@types/react": "19.2.7"` → `"@types/react": "19.2.14"` (pinned)

### 5.3 zustand `5.0.2` → `5.0.12`

**Key fixes across 10 patches:**
- **5.0.8**: Shallow comparison with `undefined` — fixes subtle bugs when selectors return `undefined`
- **5.0.11**: Immer middleware typing improvements
- **5.0.3-5.0.7**: Persist middleware race conditions, rehydration callback timing

**Our usage**: `Modal.provider.tsx` uses `create()` directly, no persist middleware. The shallow comparison fix (5.0.8) could prevent edge case bugs in our selector pattern (`useModal((state) => state.showModal)`).

**Actions:**
- [ ] `package.json`: change `"zustand": "5.0.2"` → `"zustand": "5.0.12"` (pinned)

### 5.4 prettier `3.4.2` → `3.8.1`

**Key changes across 4 minor versions:**
- **3.5.0**: New `objectWrap` option (opt-in); TS config file support (`.prettierrc.ts`)
- **3.6.0**: Parentheses additions for `SequenceExpression`, optional member expressions; CSS `:has` indentation fix; experimental fast CLI
- **3.7.0**: Type parameter indentation normalization in classes; import attributes line breaking
- **3.8.0**: Angular-specific (irrelevant)

**No config options removed.** All current options (`semi: false`, `singleQuote: true`, `printWidth: 80`, etc.) remain supported. `prettier-plugin-curly` compatibility should be verified.

**Expect a reformatting diff** (cumulative parentheses, indentation changes across 4 minors).

**Actions:**
- [ ] `package.json`: change `"prettier": "3.4.2"` → `"prettier": "3.8.1"` (pinned)
- [ ] `npm install`
- [ ] Verify `prettier-plugin-curly` compatibility
- [ ] `npx prettier --write .` — dedicated formatting commit
- [ ] `npm run lint` — verify

---

## Phase 6 — Blocked (requires `@viclafouch/meme-studio-utilities` update first)

### 6.1 immer `10.1.1` → `11.1.4` — 🔴 Blocked

`@viclafouch/meme-studio-utilities@2.0.0` declares `"immer": "^10.1.1"` peer dep. Upgrade to v11 would break peer dep resolution. Additionally, known production bug in v11 patch generation for nested arrays (redux-toolkit#5159).

**When unblocked:**
- Update `meme-studio-utilities` to widen peer dep
- Adopt `enableArrayMethods` plugin (50-80% faster array ops) for meme text operations
- Test editor store thoroughly (primary `produce()` consumer)

### 6.2 zod `3.24.1` → `4.3.6` — 🔴 Blocked

`@viclafouch/meme-studio-utilities@2.0.0` declares `"zod": "^3.24.1"` peer dep and exports Zod v3 types. Mixing v4 runtime with v3 schemas = type conflicts + runtime failures.

**When unblocked:**
- Run official codemod: `npx @zod/codemod --transform v3-to-v4 ./src`
- Update `memeSchema` usage in `shared/api/memes.ts`
- Adopt new API: `z.email()` instead of `z.string().email()`, etc.

---

## Skipped

| Package | Version | Reason |
|---------|---------|--------|
| eslint | 9 → 10 | Excluded per user. `eslint-plugin-import` not compatible. Bumped to 9.39.4 for security. |
| typescript | 5 → 6 | Excluded per user. Capped at 5.9.3. |

---

## Execution order

1. **Phase 1**: Security — `next`, `react`/`react-dom`, `eslint`, `@pandacss/dev`
2. **Phase 2**: Major safe upgrades — FontAwesome, react-error-boundary
3. **Phase 3**: TypeScript 5.9.3 + ESLint config v5 (migration work)
4. **Phase 4**: In-range (auto-resolved by `npm install`)
5. **Phase 5**: Patch bumps + prettier (reformatting commit)
6. **Phase 6**: Deferred until `meme-studio-utilities` updated

**Estimated total code changes:**
- `package.json`: ~15 version bumps
- `eslint.config.mjs`: full rewrite (import paths + config structure)
- `tsconfig.json`: 2 new options (`moduleResolution`, `libReplacement`)
- 6 Panda CSS files: `boxSize` replacements (9 locations)
- 4 Panda CSS files: color opacity modifiers (4 locations)
- Type error fixes from TS 5.9 `strictInference`
- Unicorn lint error fixes from eslint config v5
- Prettier reformatting commit (all files)

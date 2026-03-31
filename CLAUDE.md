# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Meme Studio — a fast meme creation and customization tool. Users can pick from a default list of memes or import their own image, customize text, and download or share directly to Twitter. No server-side storage of user memes. Built with Next.js 16 (React 19, App Router).

The site is **bilingual FR/EN** (next-intl). Design is **mobile-first**, always responsive, and must work across all major browsers (Safari, Chrome, Firefox, etc.). Hosted on **Vercel**.

Website: [meme-studio.io](https://www.meme-studio.io)

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19)
- **Styling:** Panda CSS (build-time CSS-in-JS)
- **State:** Zustand + Immer
- **Async state:** TanStack Query
- **i18n:** next-intl
- **Icons:** FontAwesome
- **Validation:** Zod
- **Linting:** ESLint 9 (`@viclafouch/eslint-config-viclafouch`)
- **Formatting:** Prettier

## Commands

```bash
npm run build             # Production build (Next.js)
npm start                 # Start production server (port 8080)
npm run lint              # TypeScript check + ESLint
npm run lint:fix          # Auto-fix lint issues
```
**Never start the dev server (`npm run dev`)** — this is always done by the user.

See current plan: `.claude/plan.md`. It must be always up to date. **Update it immediately after each meaningful change** — not just at the end of a task. If you add a feature, fix a bug, change an approach, or add a dependency mid-task, update the plan right then. A desynchronized plan is a bug.

## Code Quality & Reusability

Code must always be clean and readable. Before writing any code, ask whether it can be reused and extracted into a helper, utility, or reusable component. **Zero tolerance for duplication** — both runtime code and types. Strict typing everywhere: no `any`, no loose types, leverage discriminated unions, `satisfies`, and inference where appropriate.

## Post-Task Checklist — MANDATORY, NO EXCEPTIONS

**After EVERY task that writes or modifies code, execute ALL steps IN ORDER before reporting completion to the user.**

1. Run `npm run lint:fix`
2. Update the plan (`.claude/plan.md`): check off `[x]` completed items
3. **Run `/simplify` only for significant features or multi-file changes.** Skip for small fixes (one-liner, single class change, minor tweaks). `/simplify` runs three parallel review agents (reuse, quality, efficiency) and fixes issues automatically. If the plan has changed after simplification, update the plan again.
4. After major features or changes, proactively suggest running relevant audit agents (security, performance, dead-code, React performance, etc.)

**A task is NOT complete until steps 1-2 are done.** Never say "done" or summarize changes before finishing the checklist.

## Design Rule

For any UI/design task, **always use `/frontend-design`** before writing code.

## Uncertainty Rule

Whenever there is any uncertainty (even a single one), use the **deep-dive** skill before writing code. Never proceed with unresolved unknowns.

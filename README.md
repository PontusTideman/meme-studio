<div align="center">
  <img src="public/images/logo-meme-studio-light.png" alt="Meme Studio" width="400" />
  <p><strong>Create, customize and share memes in seconds.</strong></p>
  <p>
    <a href="https://www.meme-studio.io">Website</a> &middot;
    <a href="https://github.com/viclafouch/meme-studio/issues">Report a bug</a> &middot;
    <a href="https://github.com/viclafouch/meme-studio/issues">Request a feature</a>
  </p>
</div>

---

Meme Studio is a fast, privacy-first meme creation tool. Pick from a curated gallery or import your own image, customize text with drag-and-drop, then download or copy your meme. No account required, no server-side storage — your creations stay on your device.

Available in **English** and **French**.

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | [Next.js](https://nextjs.org) (App Router, React 19) |
| Styling | [Panda CSS](https://panda-css.com) (build-time CSS-in-JS) |
| State | [Zustand](https://zustand.docs.pmnd.rs) + [Immer](https://immerjs.github.io/immer) |
| Async State | [TanStack Query](https://tanstack.com/query) |
| i18n | [next-intl](https://next-intl.dev) |
| Validation | [Zod](https://zod.dev) |
| Icons | [Font Awesome](https://fontawesome.com) |
| Linting | [ESLint](https://eslint.org) + [Prettier](https://prettier.io) |
| Hosting | [Vercel](https://vercel.com) |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) >= 20
- [npm](https://www.npmjs.com) >= 10

### Installation

```bash
git clone https://github.com/viclafouch/meme-studio.git
cd meme-studio
npm install
```

### Development

```bash
npm run dev
```

The app starts at [http://localhost:8080](http://localhost:8080).

### Production

```bash
npm run build
npm start
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 8080) |
| `npm run build` | Production build |
| `npm start` | Start production server (port 8080) |
| `npm run lint` | TypeScript check + ESLint |
| `npm run lint:fix` | Auto-fix lint issues |

## Project Structure

```
src/
  app/              # Next.js App Router pages
  components/       # Shared UI components
  modules/          # Feature modules (HomePage, Studio)
  i18n/             # Internationalization config & locale files
  stores/           # Zustand stores (Modal, Editor)
  queries/          # TanStack Query client & providers
  shared/           # Helpers, hooks, constants, API layer
styled-system/      # Generated Panda CSS system (do not edit)
```

## Contributing

Contributions are welcome. Feel free to open an issue or submit a pull request.

## License

This project is open source. See the repository for license details.

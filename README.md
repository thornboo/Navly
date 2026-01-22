# Navly

Navly is a modern personal directory for tools and resources, built with Next.js and Supabase.

## Tech Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS
- Supabase (PostgreSQL)

## Requirements

- Node.js >= 18
- pnpm >= 8 (recommended)

## Getting Started

Install dependencies:

```bash
pnpm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Run locally:

```bash
pnpm dev
```

## Scripts

```bash
pnpm lint
pnpm format
pnpm format:check
pnpm build
pnpm start
```

## Documentation (Chinese)

Project documentation lives in `docs/`.

- `docs/README.md`
- `docs/GETTING_STARTED.md`
- `docs/DEVELOPMENT.md`
- `docs/ARCHITECTURE.md`

## License

MIT

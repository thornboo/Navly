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

Load demo data (optional):

```bash
# Execute the demo data SQL files in your Supabase SQL Editor
# See example/README.md for detailed instructions
psql "your-database-url" < example/seed/demo-data.sql
psql "your-database-url" < example/seed/update-icons.sql
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

- `docs/README.md` - Documentation index
- `docs/GETTING_STARTED.md` - Quick start guide
- `docs/DEVELOPMENT.md` - Development guide
- `docs/ARCHITECTURE.md` - Architecture documentation

## Example Data

Demo data and examples are in `example/`.

- `example/README.md` - Example data documentation
- `example/seed/` - Database seed data for development

## License

MIT

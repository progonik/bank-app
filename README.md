# FSD App – Feature-Sliced Design

Refactored app with full **Feature-Sliced Design (FSD)** and senior-level clean code.

## Structure

```
fsd-app/
├── app/                    # Next.js routes (thin re-exports)
│   ├── (root)/             # Main layout routes
│   └── auth/               # Auth routes
├── pages/                  # Empty (Next.js Pages Router workaround)
└── src/
    ├── app/                # App layer – providers, client shell
    ├── pages/              # Pages layer – page compositions
    ├── widgets/            # Widgets – layout, sidebar, navbar
    ├── features/           # Features – auth, language-switch, user-menu
    ├── entities/           # Entities – user, sidebar, navigation
    └── shared/             # Shared – ui, lib, api, config
```

## Layer rules

- **Shared** – Reusable UI, utils, API client, config. No business logic.
- **Entities** – Core domain concepts (user, sidebar, navigation).
- **Features** – Feature logic (auth, language switch, user menu).
- **Widgets** – Composite UI (layout, sidebar, navbar).
- **Pages** – Page compositions.
- **App** – App setup (providers, client shell).

Dependencies flow downward only: app → pages → widgets → features → entities → shared.

## Path aliases

| Alias | Path |
|-------|------|
| `@app/*` | `./src/app/*` |
| `@pages/*` | `./src/pages/*` |
| `@widgets/*` | `./src/widgets/*` |
| `@features/*` | `./src/features/*` |
| `@entities/*` | `./src/entities/*` |
| `@shared/*` | `./src/shared/*` |

## Quick start

```bash
cd fsd-app
npm install
cp .env.example .env   # Mock auth by default
npm run dev
```

## Adding a new page

1. Add a slice in `src/pages/your-page/`.
2. Re-export it in `app/(root)/your-page/page.tsx`.
3. Add a route in `@entities/navigation` if it should appear in the sidebar.

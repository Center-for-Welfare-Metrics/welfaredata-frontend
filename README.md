# WelfareData Frontend

A modern Next.js application for managing processograms, production modules, and species data with a rich UI and comprehensive admin features.

## 🚀 Tech Stack

- **Framework:** Next.js 15.5+ with TypeScript
- **Styling:** Styled Components + Material-UI
- **State Management:** Jotai
- **Data Fetching:** TanStack React Query (v5)
- **Form Handling:** React Hook Form + Zod
- **Animation:** GSAP
- **Type-safe Routing:** nextjs-routes with typed routes

## 📋 Prerequisites

- Node.js 18+
- npm or yarn

## 🛠️ Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run checkTs` - Type check without emitting files
- `npm run cli` - Run custom CLI generators

## 📁 Project Structure

```
welfaredata-frontend/
├── components/          # Reusable UI components
│   ├── admin/          # Admin-specific components
│   ├── auth/           # Authentication components (login, register)
│   ├── Cards/          # Card components (Processogram, Species, etc.)
│   ├── processograms/  # Processogram-related components
│   ├── HOC/            # Higher-Order Components (auth guards)
│   └── ...
├── modals/             # Modal components and container
├── pages/              # Next.js pages (file-based routing)
│   ├── _app.tsx        # App wrapper with providers
│   ├── _document.tsx   # Custom document
│   ├── admin/          # Admin pages
│   ├── api/            # API routes
│   └── ...
├── pages-components/   # Page-specific component compositions
├── context/            # React contexts (theme, user, navbar)
├── queries/            # API queries and React Query setup
├── utils/              # Utility functions and hooks
├── theme/              # Theme configuration and global styles
├── types/              # TypeScript type definitions
├── cli/                # Code generators
│   └── generators/     # Modal and routine generators
└── public/             # Static assets
```

## 🎨 Architecture Patterns

### Component Organization

1. **Atomic Design Principles**
   - Small, reusable components in `components/`
   - Composed into page-specific components in `pages-components/`
   - Layout components in `components/layouts/`

2. **Styled Components Pattern**
   - Component files: `index.tsx`
   - Styled files: `styled.ts` or `*-styled.ts`
   - Design components in `components/desing-components/`

3. **HOC Pattern**
   - `with-auth.tsx` - Protect authenticated routes
   - `only-guest.tsx` - Restrict to unauthenticated users

### State Management

- **Global State:** Jotai atoms
- **Server State:** TanStack React Query
- **Context:** Custom contexts for theme, user, and navbar state

### Modal Management

- Centralized modal system in `modals/index.tsx`
- Each modal has its own directory with wrapper component
- Modal container handles rendering logic

### Routing

- **Type-safe routes** enabled via `nextjs-routes`
- Experimental typed routes feature enabled in Next.js config
- Route types auto-generated in `@types/nextjs-routes.d.ts`

### Path Aliases

Configure in `tsconfig.json`:

- `@/components/*` → `components/*`
- `@/context/*` → `context/*`
- `@/api/*` → `queries/*`
- `@/utils/*` → `utils/*`

## 🔧 Development Tools

### CLI Generators

Generate boilerplate code using the CLI:

```bash
# Generate a new modal
npm run cli createModal <ModalName>

# Generate a new routine
npm run cli createRoutine <RoutineName>
```

### Code Quality

- **ESLint:** Configured with TypeScript and React rules
- **TypeScript:** Strict mode enabled
- **Prettier:** Code formatting (via ESLint integration)

### Form Validation

Forms use React Hook Form with Zod resolvers for type-safe validation:

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  // ... more fields
});
```

## 🎨 Theming

- Custom theme system with light/dark modes
- Theme context in `context/theme.ts`
- Global styles in `theme/globalStyle.ts`
- Theme schema: `theme/schema.json`
- Fast CSS reset: `theme/fast.css`

### Theme Colors

Supports comprehensive color palettes for both light and dark modes with Material-UI integration.

## 🚢 Deployment

### Build

```bash
npm run build
```

### Deploy on Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js).

See [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 📝 Coding Conventions

1. **File Naming**
   - Components: PascalCase directories with `index.tsx`
   - Styled files: `styled.ts` or `component-styled.ts`
   - utils/hooks: camelCase

2. **Component Structure**

   ```tsx
   // index.tsx
   import { StyledComponent } from "./styled";

   export const Component = () => {
     return <StyledComponent>...</StyledComponent>;
   };
   ```

3. **Import Order**
   - External packages
   - Internal aliases (@/...)
   - Relative imports
   - Styled components

4. **Type Definitions**
   - Shared types in `types/`
   - Component-specific types inline or in separate `.types.ts`

## 🤝 Contributing

1. Ensure TypeScript checks pass (`npm run checkTs`)
2. Use provided CLI for generating new components
3. Maintain existing folder structure and patterns

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Styled Components](https://styled-components.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Jotai](https://jotai.org/)

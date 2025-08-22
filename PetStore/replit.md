# replit.md

## Overview

The Garden Vault is a React-based e-commerce web application for selling virtual items for the Roblox game "Grow a Garden." The application features a modern, responsive storefront with a brick-themed UI design language, complete shopping cart functionality, and Discord integration for customer support and order processing.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: Custom stores (cart-store) with localStorage persistence
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Styling**: Tailwind CSS with custom CSS variables for brand theming
- **Build Tool**: Vite with custom configuration for development and production builds

### Backend Architecture
- **Server**: Express.js with TypeScript
- **API Structure**: RESTful API with `/api` prefix routing
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage)
- **Development Setup**: Vite middleware integration for hot module replacement
- **Static Serving**: Production-ready static file serving

### Data Storage Solutions
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Management**: Centralized schema definitions in `/shared/schema.ts`
- **Migration System**: Drizzle Kit for database migrations
- **Local Development**: In-memory storage implementation for development
- **Session Storage**: Connect-pg-simple for PostgreSQL session storage

### Authentication and Authorization
- **User Schema**: Basic user model with username/password fields
- **Validation**: Zod schemas for input validation
- **Session Management**: Express sessions with PostgreSQL store
- **Security**: Prepared for future authentication implementation

### UI/UX Design System
- **Theme**: Block/Brick UI with Lego-inspired design language
- **Color Palette**: Garden-themed colors (leaf green, sky blue, soil brown, brick red, gold)
- **Typography**: System fonts with fallbacks for cross-platform compatibility
- **Animations**: CSS transitions with respect for `prefers-reduced-motion`
- **Accessibility**: ARIA attributes, keyboard navigation, and semantic HTML

### Component Architecture
- **Page Components**: Modular page structure (`/pages`)
- **UI Components**: Reusable component library (`/components/ui`)
- **Business Logic**: Custom hooks and utility functions
- **Toast System**: Custom toast notification manager
- **Shopping Cart**: Persistent cart with localStorage integration

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Router (Wouter)
- **Build Tools**: Vite, TypeScript, PostCSS, Autoprefixer
- **State Management**: TanStack React Query for server state

### UI and Styling
- **Component Library**: Radix UI primitives (dialogs, dropdowns, forms, etc.)
- **Styling**: Tailwind CSS with class variance authority for component variants
- **CSS Utilities**: clsx for conditional classes, tailwind-merge for class merging
- **Icons**: Lucide React icon library

### Backend and Database
- **Database**: Neon Database (PostgreSQL serverless)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Server**: Express.js with TypeScript support
- **Session Storage**: connect-pg-simple for PostgreSQL sessions

### Development Tools
- **Replit Integration**: Vite plugins for Replit environment
- **Error Handling**: Runtime error overlay for development
- **Code Quality**: ESLint and TypeScript for code quality

### Third-Party Services
- **Discord Integration**: Custom Discord URL environment variable for community support
- **Payment Processing**: Prepared for future payment gateway integration
- **Analytics**: Ready for analytics service integration

### Utility Libraries
- **Form Handling**: React Hook Form with Hookform resolvers
- **Date Manipulation**: date-fns for date formatting
- **Validation**: Zod for schema validation
- **Carousel**: Embla Carousel React for image carousels
- **Command Interface**: cmdk for command palette functionality
# Activity Logger - GitHub Copilot Instructions

Activity Logger is a modern web application built with Lit web components, TypeScript, and Vite. It's designed as a flexible activity tracking system that started as a food journal but evolved into a multi-purpose logging tool with configurable properties and tagging capabilities.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Essential Setup Commands

Run these commands in order to bootstrap the development environment:

```bash
# Install dependencies (takes ~24 seconds)
npm install

# Build the application (takes ~3-4 seconds)
npm run build

# Run linting (takes ~4 seconds, may show warnings)
npm run lint
```

### Development Server

Start the development server:

```bash
# Development server on http://localhost:5173
npm run dev

# Preview built application on http://localhost:4173
npm run preview
```

**NEVER CANCEL** any build or development commands. All commands complete quickly (under 30 seconds).

### Build and Testing Commands

- `npm run build` - TypeScript compilation + Vite build (3-4 seconds)
- `npm run lint` - ESLint validation (4 seconds)
- `npm run lint:fix` - Auto-fix linting issues
- **NO TEST SUITE**: This project does not have automated tests

## Critical Development Requirements

### Timeout Settings

- **Build commands**: Use 60+ second timeouts (though builds complete in ~3-4 seconds)
- **Dev server**: Starts in ~1 second, no special timeout needed
- **Linting**: Completes in ~4 seconds, use 30+ second timeout

### Git Hooks (Husky)

- **Pre-commit**: Runs ESLint on staged TypeScript files
- **Pre-push**: Runs full build check with automatic stashing/unstashing
- **ALWAYS** run `npm run lint` before committing or the hooks will prevent the commit

### Validation Requirements

**ALWAYS validate changes by:**

1. **Build validation**: Run `npm run build` after any code changes
2. **Linting validation**: Run `npm run lint` to check for code style issues
3. **Manual testing**: Start dev server with `npm run dev` and test the application
4. **Login functionality**: Application shows login screen - requires backend API for full functionality

### Application Architecture

#### Key Technologies

- **Lit**: Web components with reactive properties
- **TypeScript**: Type-safe development with strict compilation
- **Vite**: Fast build tool and dev server
- **MobX**: State management with `@adobe/lit-mobx`

#### Component Structure

The application has 23 main components organized in directories:

- `account-form` - User account management
- `action-form` - Activity entry form
- `action-list` - List view of activities
- `admin-dashboard` - Administrative interface
- `app-container` - Main application container
- `entity-form` - Generic entity creation/editing
- `login-form` - Authentication interface
- `page-nav` - Navigation between views

#### State Management

- Global state in `src/state.ts` using MobX
- Authentication state managed centrally
- Local storage integration for persistence

#### Configuration

- API endpoints configured in `src/config.json`
- Environment variables prefixed with `APP_` (see `vite.config.ts`)
- Mock data available in `src/mock/` for development

## File Organization Conventions

### Import Order (as documented in README)

1. Third-party libraries
2. First-party models/classes/interfaces
3. First-party events
4. First-party components
5. First-party styles

### Component File Structure

- Components in kebab-case directories matching tag names
- `.models.ts` files for interfaces and data structures
- `.events.ts` files for custom events
- `.stories.ts` files for Storybook (rare)

### Generated Files

- `src/generated/locale-codes.ts` - Auto-generated locale configuration
- `src/generated/locales/` - Auto-generated translation files
- **NEVER** manually edit files marked with "Do not modify this file by hand!"

## Common Development Tasks

### Adding New Components

1. Create kebab-case directory in `src/components/`
2. Follow existing patterns for `.ts`, `.models.ts`, `.events.ts` files
3. Register with `@customElement('component-name')`
4. Import in parent components where needed

### Property Configuration System

The application uses a sophisticated property system for customizable activity tracking:

- Property configs in `src/mock/entity-config.ts`
- Supports text, number, boolean data types
- Configurable control types (text, number, boolean, select)
- Various render types (plain text, rich text, image, video, hidden)

### State Management

- Import `appState` from `@/state`
- Use MobX reactive patterns with `@adobe/lit-mobx`
- Access via `this.state = appState` in components

## Backend Integration

### API Configuration

- Production API: `https://sikosoft.azurewebsites.net/api/action`
- Development: Configure `APP_BASE_API_URL` environment variable
- Authentication: JWT token-based system

### Authentication Flow

1. User enters credentials in login form
2. Application calls `/login` endpoint
3. JWT token stored in localStorage
4. Token included in subsequent API requests

### Mock Data

Development mock data available:

- `src/mock/entities.json` - Sample entity data
- `src/mock/entity-config.ts` - Property configurations
- Use for offline development and testing

## Deployment & CI/CD

### GitHub Actions Workflow

- Triggers on push to `master` branch
- Uses Node.js 20.x
- Builds with `npm run build`
- Deploys to Azure Blob Storage
- Purges CDN cache

### Environment Variables

- `APP_BASE_API_URL` - API endpoint URL
- `BASE_URL` - Application base path (default: `/`)

## Validation Scenarios

### Manual Testing Checklist

After making changes, always test:

1. **Application loads**: `npm run dev` and visit http://localhost:5173
2. **Login screen appears**: Verify UI renders correctly
3. **Navigation works**: Test page navigation if auth were available
4. **Build succeeds**: `npm run build` completes without errors
5. **Linting passes**: `npm run lint` shows no errors

### UI Testing

- Application shows clean login interface
- Form fields are properly styled with Poppins font
- Responsive design works on different viewport sizes
- No console errors in browser developer tools

## Common Issues & Solutions

### Authentication Required

- Application requires backend API for full functionality
- Login screen appears without valid API connection
- Use mock data for offline development scenarios

### Import Resolution

- Use `@/` path alias for `src/` directory imports
- TypeScript and ESLint configured for path resolution
- Follow established import order conventions

## External Dependencies

### UI Library

- Uses `@ss/ui` component library (github:SikoSoft/ui#2.1.0)
- Provides buttons, inputs, selects, and other UI components
- Documentation available in separate repository

### API Specification

- Uses `api-spec` package (github:SikoSoft/api-spec#1.25.1)
- Provides TypeScript interfaces for API contracts
- Keep in sync when making API-related changes

This instruction file provides the foundation for effective development in the Activity Logger codebase. Always validate your changes with the build, lint, and manual testing steps outlined above.

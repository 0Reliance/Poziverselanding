# POZIVERSE WORK ORCHESTRATOR DASHBOARD
## Formal Architecture & System Specifications

**Version:** 1.0.0  
**Last Updated:** January 4, 2026  
**Status:** Development Phase 1 (Layout & Structure Complete)  
**Next Phase:** Feature Development & Integration

---

## 1. PROJECT OVERVIEW

### 1.1 Executive Summary

The Poziverse Work Orchestrator Dashboard is a sophisticated workspace management interface designed for homelab and development project orchestration. Built with a glassmorphism design philosophy, it provides an intuitive multi-panel environment that scales seamlessly from mobile devices to desktop workstations.

### 1.2 Core Purpose

- **Primary Goal:** Centralized orchestration of development projects, file management, and tool access
- **Target Users:** Software engineers, DevOps professionals, homelab enthusiasts, project managers
- **Key Differentiator:** Glassmorphism design with responsive adaptive layouts across all device sizes

### 1.3 Project Scope

**Phase 1 (Current):** Layout, responsive architecture, UI framework  
**Phase 2 (Planned):** Feature development for each navigation category  
**Phase 3 (Planned):** Backend integration, real-time data synchronization  
**Phase 4 (Planned):** Advanced analytics and automation  

---

## 2. TECHNICAL STACK

### 2.1 Core Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.x | UI framework and component library |
| TypeScript | Latest | Type safety and development tooling |
| Vite | Latest | Build tool and dev server |
| Tailwind CSS | Latest | Utility-first CSS framework |
| Motion/Framer Motion | 12.23.24 | Animation library |
| Radix UI | 1.x | Accessible component primitives |
| Lucide React | 0.487.0 | Icon library |

### 2.2 Development Environment

```
Node.js:       v22.21.0 (Required)
Python:        3.11.2 (For scripting/automation)
Docker:        29.1.3 (Container support)
Git:           2.39.5 (Version control)
```

### 2.3 Build & Development Configuration

- **Build Tool:** Vite with React plugin
- **CSS Processing:** Tailwind CSS with PostCSS
- **Module Resolution:** Path alias `@` → `./src`
- **Code Splitting:** Automatic via Vite
- **Development Server:** Hot Module Replacement (HMR) enabled

---

## 3. ARCHITECTURE OVERVIEW

### 3.1 Spatial Architecture

The dashboard employs a 4-column desktop architecture that gracefully degrades to a single-column mobile layout:

```
DESKTOP LAYOUT (≥1024px / md breakpoint)
┌─────────────────────────────────────────────────────────────────┐
│ TopNavBar (80px height)                                         │
│ - Global search, branding, user controls, settings              │
├──┬────────┬─────────────────────────────────┬──────────────────┤
│  │        │                                 │                  │
│  │ Icon   │ Contextual Menu                 │                  │
│  │ Nav    │ (280px - 320px width)           │   Metadata      │
│  │ Bar    ├─────────────────────────────────┤   Sidebar       │
│  │ (80px) │                                 │   (320px - 380px)│
│  │        │      Main Workspace             │   (Toggleable)  │
│  │        │      (Dynamic content area)     │                  │
│  │        │                                 │                  │
│  │        │                                 │                  │
├──┴────────┴─────────────────────────────────┴──────────────────┤
│ BottomPanels (Collapsible - Terminal/Output/Problems)          │
├─────────────────────────────────────────────────────────────────┤
│ BottomStatusBar (44px height)                                   │
│ - Panel toggles, git status, system info                        │
└─────────────────────────────────────────────────────────────────┘

MOBILE LAYOUT (<1024px / below md breakpoint)
┌─────────────────────────────────┐
│ MobileTopBar (56px)             │
│ - Logo, hamburger menu          │
├─────────────────────────────────┤
│                                 │
│      Main Workspace             │
│      (Simplified card view)     │
│                                 │
├─────────────────────────────────┤
│ MobileTabBar (60px)             │
│ - Bottom navigation tabs        │
└─────────────────────────────────┘
```

### 3.2 Component Hierarchy

```
App (Root)
├── TopNavBar (Desktop only)
├── MobileTopBar (Mobile only)
├── Main Content Container
│   ├── Desktop Layout (md+)
│   │   ├── IconNavBar
│   │   ├── ContextualMenu
│   │   ├── Main View Area
│   │   │   ├── HomeView (Dashboard)
│   │   │   ├── Workspace (Projects/Files)
│   │   │   ├── ResourcesView (Resources)
│   │   │   ├── Launchpad (Apps)
│   │   │   └── UserControl (Admin/Users)
│   │   │       ├── UserDirectory
│   │   │       ├── UserAdmin
│   │   │       └── DirectMessages
│   │   └── MetadataSidebar (Toggleable)
│   └── Mobile Layout (<md)
│       └── Workspace (Simplified)
├── BottomPanels (Desktop only)
│   ├── Terminal Panel
│   ├── Output Panel
│   └── Problems Panel
├── BottomStatusBar (Desktop only)
└── MobileTabBar (Mobile only)
```

### 3.3 Data Flow & State Management

**Current Implementation:** React Hooks (useState) at App level  
**Future Enhancement:** Context API / Redux for scalability

```
App Component State:
├── Navigation State
│   ├── selectedNavItem: 'home' | 'projects' | 'files' | 'resources' | 'launchpad' | 'usercontrol'
│   ├── expandedMenu: boolean
│   ├── selectedLaunchpadCategory: string
│   ├── selectedUserControlView: string
│   └── selectedResourceCategory: string
├── Selection State (Master-Detail)
│   ├── selectedProject: Project | null
│   ├── selectedLaunchpadItem: LaunchpadItem | null
│   ├── selectedUser: User | null
│   └── selectedResource: ResourceItem | null
├── Panel State (Desktop only)
│   ├── isTerminalOpen: boolean
│   ├── isOutputOpen: boolean
│   ├── isProblemsOpen: boolean
│   └── isSidebarOpen: boolean
└── Modal/Dialog State
    ├── isCreateProjectOpen: boolean
    └── isCreateResourceOpen: boolean
```

### 3.4 Data Architecture

The application follows a centralized data model with strict TypeScript interfaces. Data is decoupled from components to ensure consistency and ease of maintenance.

#### 3.4.1 Data Sources
- **Projects:** `src/app/data/projects.ts` - Centralized project definitions.
- **Launchpad:** `src/app/data/launchpad.ts` - Application and tool definitions.
- **Users:** `src/app/data/users.ts` - User directory and profile data.
- **Resources:** `src/app/components/resources/data.ts` - Resource definitions.

#### 3.4.2 Interaction Patterns
The application employs a consistent **Master-Detail** pattern across all major sections:

1.  **Projects Section:**
    - **Master:** Grid of project cards.
    - **Detail:** Clicking a card opens the `MetadataSidebar` with project details.

2.  **Launchpad Section:**
    - **Master:** Grid of application cards.
    - **Detail:** Clicking a card opens the `MetadataSidebar` with app info.
    - **Action:** A distinct "Launch" button on the card opens the URL directly.

3.  **User Control Section:**
    - **Master:** Grid of user cards (User Directory).
    - **Detail:** Clicking a card opens the `MetadataSidebar` with the user profile.
    - **Action:** Direct "Message" and "Email" buttons on the card.

4.  **Resources Section:**
    - **Master:** List of resource items.
    - **Detail:** Clicking an item opens the detail view within the main area.

---

## 4. COMPONENT SPECIFICATIONS

### 4.1 Component Inventory

| Component | Purpose | Responsibilities | Responsive |
|-----------|---------|------------------|------------|
| **TopNavBar** | Global navigation & search | Search, branding, user menu | Desktop only |
| **MobileTopBar** | Mobile header | Logo, menu toggle | Mobile only |
| **IconNavBar** | Primary navigation | Category selection via icons | Desktop only |
| **ContextualMenu** | Dynamic menu | Context-aware item lists | Desktop only |
| **HomeView** | Dashboard | Overview, recent activity, stats | Both |
| **Workspace** | Main content area | Display project cards & items | Both |
| **Launchpad** | App launcher | Quick access to tools & services | Both |
| **UserControl** | User management | Directory, admin, messages | Both |
| **ResourcesView** | Resource manager | Snippets, keys, secrets | Both |
| **MetadataSidebar** | Info panel | Details about selected items | Desktop only |
| **BottomPanels** | Development tools | Terminal, output, problems | Desktop only |
| **BottomStatusBar** | Status indicators | Panel toggles, system info | Desktop only |
| **MobileTabBar** | Mobile navigation | Bottom tab navigation | Mobile only |

### 4.2 Component Specifications

#### TopNavBar Component
- **File:** `src/app/components/TopNavBar.tsx`
- **Height:** 80px (fixed)
- **Features:**
  - Global search input with debouncing
  - Brand/logo display
  - User account menu
  - Settings/preferences access
  - Theme toggle
- **Styling:** Glassmorphism with blur effect and gradient borders
- **Accessibility:** WCAG 2.1 AA compliance with keyboard navigation

#### IconNavBar Component
- **File:** `src/app/components/IconNavBar.tsx`
- **Width:** 80px (fixed)
- **Features:**
  - 6 navigation icons with color gradients
  - Icon labels on hover (Desktop)
  - Active state indication with glow effect
  - Smooth animations on selection
- **Navigation Items:**
  1. Home (cyan) - Dashboard overview
  2. Projects (blue) - Project management
  3. Files (purple) - File explorer
  4. Resources (emerald) - Developer tools
  5. Launchpad (yellow) - App launcher
  6. User Control (pink) - User & team management

#### ContextualMenu Component
- **File:** `src/app/components/ContextualMenu.tsx`
- **Width:** 280-320px (expandable/collapsible)
- **Features:**
  - Context-aware menu items based on selectedNavItem
  - Item counts and metadata
  - Starred items with visual indicators
  - Trend indicators (+X%)
  - Smooth expand/collapse animation
- **Menu Content Structure:** Each nav item has dedicated menu content

#### HomeView Component
- **File:** `src/app/components/HomeView.tsx`
- **Features:**
  - Welcome message with date/time
  - Quick stats overview
  - Recent activity feed
  - Quick actions
  - Performance optimized background blur
- **Styling:** Modern dashboard layout with glassmorphism cards

#### Workspace Component
- **File:** `src/app/components/Workspace.tsx`
- **Features:**
  - Grid layout of project/item cards
  - Card displays: title, subtitle, progress, collaborators, tags
  - Hover effects and interactive elements
  - Color-coded by type (document, image, video, audio)
  - Responsive grid (2 columns desktop, 1 column mobile)
- **Data Structure:** Array of content items with metadata
- **Future Integration:** Connect to backend API for real data

#### Launchpad Component
- **File:** `src/app/components/Launchpad.tsx`
- **Features:**
  - 8 application categories
  - 48+ pre-configured applications
  - Search/filter functionality
  - Category selection with visual feedback
  - External link handling
- **Categories:**
  - Development (6 apps)
  - AI & Productivity (6 apps)
  - Communication (6 apps)
  - Infrastructure (6 apps)
  - Knowledge & Learning (6 apps)
  - Design & Creative (6 apps)
  - Utilities & Tools (6 apps)
  - Data & Analytics (6 apps)

#### UserControl Component
- **File:** `src/app/components/UserControl.tsx`
- **Views:**
  - User Directory (`src/app/components/usercontrol/UserDirectory.tsx`)
  - User Admin (`src/app/components/usercontrol/UserAdmin.tsx`)
  - Direct Messages (`src/app/components/usercontrol/DirectMessages.tsx`)
- **Features:**
  - User list with status
  - Administrative controls
  - Messaging interface (placeholder)
- **Future Integration:** Authentication system, real user data

#### ResourcesView Component
- **File:** `src/app/components/resources/ResourcesView.tsx`
- **Features:**
  - Split-view layout (List + Detail)
  - Resource management (Snippets, Keys, Secrets, Bookmarks)
  - Search and filtering by category
  - Type-specific detail views with specialized actions
  - Secure handling of sensitive data (masking/unmasking)
  - Create resource dialog
- **Data Structure:** `ResourceItem` with polymorphic metadata

#### MetadataSidebar Component
- **File:** `src/app/components/MetadataSidebar.tsx`
- **Width:** 320-380px (toggleable)
- **Features:**
  - Displays metadata about selected items
  - Tabs for different info sections
  - Collapsible sections
  - Action buttons
- **Future Content:** Item details, history, related items

#### BottomPanels Component
- **File:** `src/app/components/BottomPanels.tsx`
- **Features:**
  - 3 swappable panels (only one visible at a time)
  - Terminal emulation area
  - Output log viewer
  - Problems/errors panel
  - Resizable height (drag handle)
- **Constraints:** Max height 50% of viewport
- **Accessibility:** Keyboard shortcuts for panel toggle

#### BottomStatusBar Component
- **File:** `src/app/components/BottomStatusBar.tsx`
- **Height:** 44px (fixed)
- **Features:**
  - Git status indicator
  - Panel toggle buttons with active states
  - System/environment info
  - Time/date display
  - Sidebar toggle
  - Hover tooltips on all buttons

#### MobileTopBar Component
- **File:** `src/app/components/MobileTopBar.tsx`
- **Height:** 56px (fixed)
- **Features:**
  - Logo/branding
  - Hamburger menu toggle
  - Notification badge
  - Simplified user menu

#### MobileTabBar Component
- **File:** `src/app/components/MobileTabBar.tsx`
- **Height:** 60px (fixed)
- **Position:** Sticky bottom of screen
- **Features:**
  - 6 navigation tabs (icons + labels)
  - Active tab highlighting
  - No overflow, icons scale if needed
  - Touch-optimized (44px min tap target)

---

## 5. DESIGN SYSTEM

### 5.1 Glassmorphism Design Philosophy

**Key Principles:**
- Semi-transparent backgrounds with blur effects
- Layered depth through backdrop-filter and opacity
- Subtle gradient overlays for visual hierarchy
- Smooth micro-animations for interactions
- Consistent use of frosted glass aesthetic

**Implementation Details:**
```css
/* Base glassmorphism effect */
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}

/* Variations */
.glass-light: /* Lighter variant */
.glass-dark: /* Darker variant */
.glass-gradient: /* With subtle gradients */
```

### 5.2 Color Palette

**Primary Colors:**
- Cyan: `#06B6D4` - Primary actions, icons
- Blue: `#0EA5E9` - Secondary actions, accents
- Purple: `#A855F7` - Tertiary actions, highlights
- Pink: `#EC4899` - User/team related
- Green: `#10B981` - Success
- Yellow: `#EAB308` - Warnings, launchpad
- Orange: `#F97316` - Infrastructure

**Neutral Colors:**
- Black: `#000000` - Backgrounds
- White: Used with opacity (5-30%) for glassmorphism
- Gray: `#6B7280` - Disabled/secondary text

### 5.3 Responsive Breakpoints

```typescript
// Tailwind CSS breakpoints used
sm:  640px   - Small tablets
md:  1024px  - Primary breakpoint (desktop vs mobile)
lg:  1280px  - Large desktop
xl:  1536px  - Extra large displays
```

**Layout Decision Points:**
- `md` (1024px): Main desktop/mobile split
- Desktop layout: Full 4-column interface
- Mobile layout: Single column, simplified navigation

### 5.4 Typography

- **Fonts:** System stack (SF Pro Display, Inter, Segoe UI)
- **Heading Sizes:** 12px (labels) → 32px (page titles)
- **Letter Spacing:** Subtle increase for headings
- **Font Weights:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### 5.5 Spacing System

- **Base Unit:** 4px
- **Common Spacings:** 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
- **Component Padding:** 12-16px internal
- **Component Gaps:** 8-16px between elements

---

## 6. RESPONSIVE DESIGN STRATEGY

### 6.1 Desktop Experience (≥1024px)

**Full-featured interface:**
- 4-column layout with all components visible
- Expandable contextual menu
- Toggleable metadata sidebar
- Bottom development panels
- Keyboard shortcuts support
- Hover effects on interactive elements

**Optimization Focus:**
- Maximize information density
- Multi-tasking support
- Advanced interactions
- Power user features

### 6.2 Mobile Experience (<1024px)

**Simplified interface:**
- Single workspace column
- Bottom tab navigation (hidden when scrolling)
- Floating action button approach
- Touch-optimized interactions
- Minimized panels
- Gesture support (future)

**Optimization Focus:**
- Minimal cognitive load
- Touch targets ≥44px
- Reduced visual density
- Quick access to essential features

### 6.3 Responsive Implementation Details

```typescript
// Desktop-only components
<div className="hidden md:block">
  <TopNavBar />
  <IconNavBar />
  <ContextualMenu />
</div>

// Mobile-only components
<div className="md:hidden">
  <MobileTopBar />
  <MobileTabBar />
</div>

// Responsive workspace
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards responsive to breakpoints */}
</div>
```

---

## 7. PERFORMANCE & OPTIMIZATION

### 7.1 Code Splitting Strategy

- **Route-based splitting:** Each navigation section as lazy-loaded component
- **Component-based splitting:** Heavy components (charts, editors) on demand
- **Bundle analysis:** Regular checks via Vite built-in analysis

### 7.2 Rendering Optimization

- **Memoization:** Use React.memo for expensive components
- **State lifting:** Minimize component re-renders through careful state placement
- **Virtual scrolling:** For large lists (future enhancement)
- **Image optimization:** Lazy loading, responsive images, modern formats

### 7.3 Animation Performance

- **GPU acceleration:** Use `transform` and `opacity` for animations
- **Conditional animations:** Respect `prefers-reduced-motion`
- **Hardware layers:** Apply `will-change` judiciously

---

## 8. ACCESSIBILITY (WCAG 2.1 AA)

### 8.1 Keyboard Navigation

- All interactive elements focusable with Tab key
- Logical tab order following visual hierarchy
- Escape key to close modals/panels
- Keyboard shortcuts for power users (future)

### 8.2 Screen Reader Support

- Semantic HTML5 elements
- ARIA labels for icon-only buttons
- Role definitions for custom components
- Live regions for dynamic content

### 8.3 Visual Accessibility

- Color contrast ratio ≥4.5:1 for text
- Icon + text labels for navigation
- Focus indicators clearly visible
- No information conveyed by color alone

---

## 9. DEVELOPMENT WORKFLOW

### 9.1 Local Development Setup

```bash
# Clone repository
git clone <repo-url>
cd Poziverselanding

# Install dependencies (requires Node.js v22.21.0)
npm install

# Start development server (with HMR)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 9.2 Project Structure

```
src/
├── app/
│   ├── App.tsx              # Root component with state management
│   ├── components/          # All UI components
│   │   ├── TopNavBar.tsx
│   │   ├── IconNavBar.tsx
│   │   ├── ContextualMenu.tsx
│   │   ├── Workspace.tsx
│   │   ├── Launchpad.tsx
│   │   ├── UserControl.tsx
│   │   ├── MetadataSidebar.tsx
│   │   ├── BottomPanels.tsx
│   │   ├── BottomStatusBar.tsx
│   │   ├── MobileTopBar.tsx
│   │   ├── MobileTabBar.tsx
│   │   ├── figma/           # Figma-related components
│   │   ├── ui/              # Radix UI component library
│   │   └── usercontrol/     # UserControl sub-components
│   └── styles/              # Global styles
├── main.tsx                 # Vite entry point
└── index.html               # HTML template

Root config files:
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS config
├── postcss.config.mjs       # PostCSS config
├── tsconfig.json            # TypeScript config
├── package.json             # Dependencies & scripts
└── .gitignore               # Git exclusions
```

### 9.3 Naming Conventions

**Components:** PascalCase (e.g., `TopNavBar.tsx`)  
**Utilities/Hooks:** camelCase (e.g., `useMediaQuery.ts`)  
**Types/Interfaces:** PascalCase (e.g., `TopNavBarProps`)  
**CSS Classes:** kebab-case (via Tailwind utilities)  
**Files:** Match export name exactly  

---

## 10. FUTURE ROADMAP

### Phase 2: Feature Development
- [ ] Backend API integration
- [ ] Real data source connectivity
- [ ] Project CRUD operations
- [ ] File upload/management
- [ ] Search functionality enhancement
- [ ] User authentication system

### Phase 3: Advanced Features
- [ ] Real-time collaboration
- [ ] WebSocket integration for live updates
- [ ] Advanced filtering & sorting
- [ ] Custom views/dashboards
- [ ] Notification system
- [ ] Activity timeline

### Phase 4: Infrastructure & Scale
- [ ] Database design & migration
- [ ] Caching strategy
- [ ] Analytics tracking
- [ ] Performance monitoring
- [ ] CDN integration
- [ ] Horizontal scaling support

---

## 11. QUALITY ASSURANCE

### 11.1 Code Quality Standards

- **Linting:** ESLint with strict configuration
- **Type Checking:** Full TypeScript coverage (no `any` types)
- **Code Style:** Prettier formatting (configured in package.json)
- **Imports:** Organized and deduplicated

### 11.2 Testing Strategy

- **Unit Tests:** Jest for component logic (planned)
- **Integration Tests:** Testing component interactions (planned)
- **E2E Tests:** Playwright for user workflows (planned)
- **Visual Regression:** Automated screenshot comparison (planned)
- **Accessibility Testing:** Axe testing in CI/CD (planned)

### 11.3 Documentation Requirements

- Code comments for complex logic
- JSDoc for exported functions
- README in each major feature folder
- Storybook stories for component showcase (future)
- Architecture decision records (ADRs)

---

## 12. DEPLOYMENT & OPERATIONS

### 12.1 Build Process

```bash
npm run build
# Output: dist/ folder with optimized assets
# Size targets: Main bundle <250KB, Total <500KB
```

### 12.2 Deployment Targets

- Static hosting (Vercel, Netlify, GitHub Pages)
- Docker container for self-hosted
- Node.js server for dynamic content
- CDN for asset delivery

### 12.3 Environment Configuration

```
Development: npm run dev
Staging: Matches production build
Production: Optimized build with minification
```

---

## 13. GLOSSARY

| Term | Definition |
|------|-----------|
| **Glassmorphism** | UI design trend using frosted glass effect |
| **Backdrop-filter** | CSS property applying visual effects to elements behind it |
| **HMR** | Hot Module Replacement - live reload without full page refresh |
| **Tailwind CSS** | Utility-first CSS framework |
| **Radix UI** | Unstyled, accessible component library |
| **Vite** | Next-generation frontend build tool |
| **TypeScript** | JavaScript with static type checking |

---

## 14. APPROVAL & SIGN-OFF

| Role | Name | Date | Notes |
|------|------|------|-------|
| Technical Lead | [Name] | [Date] | Architecture approved |
| Product Owner | [Name] | [Date] | Scope approved |
| DevOps Lead | [Name] | [Date] | Infrastructure approved |

---

## 15. DOCUMENT CONTROL

**Version History:**
- v1.0.0 - Initial architecture documentation (Jan 4, 2026)

**Next Review Date:** June 4, 2026  
**Document Owner:** Development Team  
**Last Modified:** January 4, 2026

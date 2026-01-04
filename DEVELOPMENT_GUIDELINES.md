# COMPONENT DEVELOPMENT GUIDELINES
## Standards, Patterns, and Best Practices

**Version:** 1.0.0  
**Last Updated:** January 4, 2026  
**Audience:** Development Team

---

## 1. CODING STANDARDS

### 1.1 TypeScript Guidelines

#### Type Safety
- **No `any` types:** Always provide proper types, use `unknown` if uncertain
- **Strict mode:** TypeScript strict mode enabled
- **Type definitions:** Create interfaces for all props and state
- **Explicit returns:** Always specify return types for functions

```typescript
// ✅ CORRECT
interface ComponentProps {
  title: string;
  count: number;
  onAction: (id: string) => void;
  children?: React.ReactNode;
}

function MyComponent({ title, count, onAction }: ComponentProps): JSX.Element {
  return <div>{title}</div>;
}

// ❌ AVOID
function MyComponent(props: any) {
  return <div>{props.title}</div>;
}
```

#### Generic Types
- Use generics for reusable components
- Constrain generics with extends keyword
- Document type parameters with JSDoc

```typescript
// ✅ CORRECT
interface ListProps<T> {
  items: T[];
  keyExtractor: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, keyExtractor, renderItem }: ListProps<T>) {
  return <>{items.map(item => <div key={keyExtractor(item)}>{renderItem(item)}</div>)}</>;
}

// ❌ AVOID
function List(props: any) {
  return <>{props.items.map((item: any) => ...)}</>;
}
```

### 1.2 React Component Patterns

#### Functional Components
- Always use functional components (no class components)
- Use hooks for all state and side effects
- Memoize expensive components with `React.memo` when appropriate

```typescript
// ✅ CORRECT
interface CardProps {
  title: string;
  isLoading: boolean;
}

export function Card({ title, isLoading }: CardProps): JSX.Element {
  return (
    <div className="card">
      {isLoading ? <Spinner /> : <h2>{title}</h2>}
    </div>
  );
}

// Memoize if component receives expensive props
export const MemoizedCard = React.memo(Card);
```

#### Props Destructuring
- Always destructure props in function signature
- Use default values for optional props
- Group related props together

```typescript
// ✅ CORRECT
interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

function Button({ 
  onClick, 
  disabled = false, 
  variant = 'primary',
  children 
}: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{children}</button>;
}

// ❌ AVOID
function Button(props) {
  return <button {...props}>{props.children}</button>;
}
```

#### Hook Usage

**Use at Top Level:**
```typescript
// ✅ CORRECT
function Component() {
  const [state, setState] = useState(0);
  const value = useMemo(() => computeValue(), []);
  
  return <div>{state}</div>;
}

// ❌ AVOID
function Component() {
  if (condition) {
    const [state, setState] = useState(0); // Conditionally calling hooks
  }
}
```

**Custom Hooks:**
- Create custom hooks for reusable logic
- Prefix with `use`
- Document dependencies

```typescript
// ✅ CORRECT
/**
 * Hook for managing form state
 * @param initialValues - Initial form values
 * @returns Form state and handlers
 */
function useForm<T>(initialValues: T) {
  const [values, setValues] = useState(initialValues);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };
  
  return { values, handleChange };
}
```

### 1.3 Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `UserProfile.tsx`, `TopNavBar.tsx` |
| Hooks | camelCase with `use` prefix | `useMediaQuery.ts`, `useAuth.ts` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRIES`, `API_BASE_URL` |
| Functions | camelCase | `handleClick`, `formatDate` |
| Variables | camelCase | `isLoading`, `userName` |
| Types/Interfaces | PascalCase | `UserProps`, `AuthState` |
| CSS Classes | kebab-case (via Tailwind) | `flex-center`, `bg-gradient-to-r` |
| Private methods | Leading underscore | `_formatPrivate()` |
| Files | Match export name | Component `TopNavBar` → `TopNavBar.tsx` |

### 1.4 Code Organization

**File Structure for Components:**
```
ComponentName/
├── ComponentName.tsx          # Main component
├── ComponentName.test.tsx     # Unit tests
├── ComponentName.stories.tsx  # Storybook (future)
├── types.ts                   # TypeScript types
├── styles.ts                  # Styled component code (if needed)
└── utils.ts                   # Helper functions
```

**Function Order in Components:**
```typescript
// 1. Imports
import React, { useState } from 'react';

// 2. Types/Interfaces
interface ComponentProps {
  title: string;
}

// 3. Constants
const DEFAULT_DELAY = 300;

// 4. Component definition
export function Component({ title }: ComponentProps) {
  // 4a. Hooks
  const [state, setState] = useState(null);
  
  // 4b. Event handlers
  const handleClick = () => { };
  
  // 4c. Effects
  useEffect(() => { }, []);
  
  // 4d. Render
  return <div>{title}</div>;
}
```

---

## 2. STATE MANAGEMENT

### 2.1 State Placement

**Local Component State:**
- Use `useState` for component-specific state
- Keep state as close to usage as possible
- Lift state when multiple components need it

```typescript
// ✅ CORRECT - Local state
function CardList() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  return (
    <div>
      {cards.map(card => (
        <Card
          key={card.id}
          isExpanded={expandedId === card.id}
          onToggle={() => setExpandedId(card.id)}
        />
      ))}
    </div>
  );
}
```

**Global State (Future):**
- Use Context API for small/medium apps
- Use Redux/Zustand for complex state
- Keep reducers pure and testable

### 2.2 State Update Patterns

**Immutable Updates:**
```typescript
// ✅ CORRECT - Immutable
const [items, setItems] = useState<Item[]>([]);

// Update array
setItems(prev => [...prev, newItem]);
setItems(prev => prev.map(item => 
  item.id === id ? { ...item, status } : item
));

// Update object
setUser(prev => ({ ...prev, name: 'John' }));
```

**Batch Updates:**
```typescript
// ✅ CORRECT - Use useCallback to batch
const handleMultipleUpdates = useCallback(() => {
  setState1(newValue1);
  setState2(newValue2);
  setState3(newValue3);
}, []);
```

---

## 3. PERFORMANCE OPTIMIZATION

### 3.1 Rendering Optimization

**Memoization:**
```typescript
// ✅ Use React.memo for expensive components
export const ExpensiveComponent = React.memo(function Component({ data }) {
  return <div>{data}</div>;
});

// ✅ Use useMemo for expensive computations
const memoizedValue = useMemo(() => {
  return expensiveComputation(a, b);
}, [a, b]);

// ✅ Use useCallback for stable function references
const memoizedCallback = useCallback((e) => {
  doSomething(e.target.value);
}, [doSomething]);
```

**Key Prop Usage:**
```typescript
// ✅ Use stable keys
{items.map(item => <Item key={item.id} data={item} />)}

// ❌ Don't use index as key for dynamic lists
{items.map((item, index) => <Item key={index} data={item} />)}

// ❌ Don't use random keys
{items.map(item => <Item key={Math.random()} data={item} />)}
```

### 3.2 Bundle Size

- Import only needed functions from libraries
- Use tree-shaking: `import { specific } from 'lib'`
- Lazy load heavy components

```typescript
// ✅ CORRECT - Specific imports
import { useState, useCallback } from 'react';

// ❌ AVOID - Using *
import * as React from 'react';
```

### 3.3 Network Performance

**Data Fetching:**
```typescript
// ✅ CORRECT - Debounced search
const debouncedSearch = useCallback(
  debounce((query: string) => {
    fetchResults(query);
  }, 300),
  []
);

// ✅ Use loading/error states
const [loading, setLoading] = useState(false);
const [error, setError] = useState<Error | null>(null);

// ✅ Cancel requests on unmount
useEffect(() => {
  const controller = new AbortController();
  
  fetch(url, { signal: controller.signal });
  
  return () => controller.abort();
}, []);
```

---

## 4. STYLING GUIDELINES

### 4.1 Tailwind CSS Usage

**Utility Classes:**
```typescript
// ✅ CORRECT - Use Tailwind utilities
<div className="flex items-center justify-between p-4 bg-white rounded-lg">
  <h2 className="text-lg font-semibold text-gray-900">Title</h2>
  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Action
  </button>
</div>

// ❌ AVOID - Custom CSS in components
<div style={{ display: 'flex', justifyContent: 'space-between' }}>
```

**Responsive Classes:**
```typescript
// ✅ Mobile-first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid */}
</div>

<div className="hidden md:block">
  {/* Desktop only */}
</div>
```

**Color Naming:**
```typescript
// ✅ CORRECT - Use semantic colors
className="bg-blue-500 text-white" // Primary action
className="bg-gray-500 text-white" // Disabled/secondary
className="bg-green-500" // Success
className="bg-red-500" // Error

// ❌ AVOID - Arbitrary colors
className="bg-blue-#0EA5E9"
```

### 4.2 Motion/Animation

**Framer Motion:**
```typescript
// ✅ Use motion for animations
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.3 }}
>
  {children}
</motion.div>

// ✅ Use AnimatePresence for conditional rendering
<AnimatePresence>
  {isOpen && <Modal key="modal" />}
</AnimatePresence>
```

**Animation Best Practices:**
- Use GPU-accelerated properties (transform, opacity)
- Keep animations under 400ms for UI feedback
- Respect `prefers-reduced-motion`

```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

<motion.div
  animate={prefersReducedMotion ? {} : { x: 100 }}
>
```

---

## 5. ACCESSIBILITY (a11y)

### 5.1 Semantic HTML

```typescript
// ✅ CORRECT - Semantic HTML
<button onClick={handleAction}>Delete</button>
<nav><a href="/page">Link</a></nav>
<main>{content}</main>
<header>Page Title</header>
<section>Content</section>

// ❌ AVOID - Non-semantic divs for interactions
<div onClick={handleAction} role="button">Delete</div>
```

### 5.2 ARIA Labels

```typescript
// ✅ CORRECT - Aria labels for icon buttons
<button aria-label="Close dialog" onClick={close}>
  <CloseIcon />
</button>

<button aria-label="Toggle sidebar" aria-pressed={isOpen}>
  <MenuIcon />
</button>

// ✅ Form accessibility
<label htmlFor="email">Email address</label>
<input id="email" type="email" />

// ✅ List accessibility
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

### 5.3 Keyboard Navigation

```typescript
// ✅ CORRECT - Handle keyboard events
<button
  onClick={handleAction}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleAction();
    }
  }}
>
  Action
</button>

// ✅ Use tabIndex wisely
<div tabIndex={0} role="button">Focusable div</div>
```

### 5.4 Color Contrast

- Text: Minimum 4.5:1 ratio (AA)
- Large text (18px+): 3:1 ratio (AA)
- Use tools to verify contrast

```typescript
// ✅ CORRECT - High contrast
<p className="text-gray-900">Dark text on light</p>

// ❌ AVOID - Low contrast
<p className="text-gray-400">Light gray text on white</p>
```

---

## 6. TESTING GUIDELINES

### 6.1 Unit Tests (Jest)

```typescript
// Component
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
}

// Test
import { render, screen, fireEvent } from '@testing-library/react';

describe('Counter', () => {
  it('increments count on button click', () => {
    render(<Counter />);
    const button = screen.getByRole('button');
    const display = screen.getByText('0');
    
    fireEvent.click(button);
    
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
```

### 6.2 Test Structure

```typescript
// Arrange - Setup
// Act - Execute
// Assert - Verify

describe('UserProfile', () => {
  it('displays user information', () => {
    // Arrange
    const user = { id: '1', name: 'John', email: 'john@example.com' };
    
    // Act
    render(<UserProfile user={user} />);
    
    // Assert
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
});
```

### 6.3 Snapshot Tests

Use sparingly, avoid brittle snapshots:

```typescript
it('renders correctly', () => {
  const { container } = render(<Component />);
  expect(container.firstChild).toMatchSnapshot();
});
```

---

## 7. ERROR HANDLING

### 7.1 Error Boundaries

```typescript
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Error caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### 7.2 API Error Handling

```typescript
// ✅ CORRECT - Handle errors gracefully
async function fetchData(url: string) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error; // Re-throw for component to handle
  }
}

// In component
const [error, setError] = useState<Error | null>(null);

useEffect(() => {
  fetchData(url)
    .then(setData)
    .catch(setError);
}, [url]);

if (error) {
  return <ErrorMessage message={error.message} />;
}
```

---

## 8. DOCUMENTATION

### 8.1 JSDoc Comments

```typescript
/**
 * Formats a date string to readable format
 * @param date - ISO date string or Date object
 * @param locale - Locale code (default: 'en-US')
 * @returns Formatted date string (e.g., "Jan 1, 2024")
 * @throws Error if date is invalid
 * @example
 * formatDate('2024-01-01') // "Jan 1, 2024"
 */
function formatDate(date: string | Date, locale = 'en-US'): string {
  return new Intl.DateTimeFormat(locale).format(new Date(date));
}
```

### 8.2 Component Documentation

```typescript
/**
 * Card component for displaying content
 * 
 * @component
 * @example
 * <Card
 *   title="Hello"
 *   description="World"
 *   onClick={() => console.log('clicked')}
 * />
 */
interface CardProps {
  /** Card title */
  title: string;
  /** Card description */
  description?: string;
  /** Click handler */
  onClick?: () => void;
  /** Card children */
  children?: React.ReactNode;
}

export function Card({ title, description, onClick, children }: CardProps) {
  // Implementation
}
```

---

## 9. COMMIT CONVENTIONS

Use conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting (no logic change)
- `refactor`: Code refactor
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Dependencies, config, build

**Examples:**
```
feat(auth): add password reset functionality
fix(home): resolve missing data in dashboard
docs(specs): update navigation requirements
refactor(utils): simplify date formatting
```

---

## 10. DEVELOPMENT WORKFLOW

### 10.1 Creating a New Component

1. Create component file: `ComponentName.tsx`
2. Define props interface
3. Implement component with JSDoc
4. Create types file if needed: `types.ts`
5. Create test file: `ComponentName.test.tsx`
6. Export from parent barrel file

```bash
# Example
src/app/components/NewFeature/
├── NewFeature.tsx
├── NewFeature.test.tsx
├── types.ts
└── utils.ts
```

### 10.2 Code Review Checklist

- [ ] TypeScript types are complete (no `any`)
- [ ] Props interface properly defined
- [ ] Component is memoized if expensive
- [ ] Tests cover main functionality
- [ ] Accessibility requirements met
- [ ] Responsive design working
- [ ] Performance optimized
- [ ] JSDoc comments present
- [ ] No console.log statements (except intentional)
- [ ] CSS classes use Tailwind only
- [ ] Error states handled
- [ ] Loading states implemented

---

## 11. COMMON PATTERNS

### 11.1 Loading State Pattern

```typescript
interface DataState {
  status: 'idle' | 'pending' | 'success' | 'error';
  data?: Data;
  error?: Error;
}

function useData(url: string): DataState {
  const [state, setState] = useState<DataState>({ status: 'idle' });

  useEffect(() => {
    setState({ status: 'pending' });
    
    fetch(url)
      .then(res => res.json())
      .then(data => setState({ status: 'success', data }))
      .catch(error => setState({ status: 'error', error }));
  }, [url]);

  return state;
}

// In component
const { status, data, error } = useData('/api/data');

if (status === 'pending') return <Loading />;
if (status === 'error') return <Error error={error} />;
if (status === 'success') return <DataDisplay data={data} />;
```

### 11.2 Filter & Search Pattern

```typescript
function useFilteredList<T>(items: T[], searchFn: (item: T, query: string) => boolean) {
  const [query, setQuery] = useState('');
  
  const filtered = useMemo(() => {
    if (!query) return items;
    return items.filter(item => searchFn(item, query));
  }, [items, query]);
  
  return { query, setQuery, filtered };
}

// Usage
const { query, setQuery, filtered } = useFilteredList(users, (user, q) =>
  user.name.toLowerCase().includes(q.toLowerCase())
);
```

---

## APPENDIX: Code Snippets Library

### Modal Component Template
```typescript
interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  confirmLabel?: string;
  onConfirm?: () => void;
}

export function Modal({
  isOpen,
  title,
  onClose,
  children,
  confirmLabel,
  onConfirm,
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50">
          <motion.div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <motion.div className="absolute inset-0 flex items-center justify-center p-4">
            <motion.div className="bg-white rounded-lg max-w-md w-full">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-lg font-semibold">{title}</h2>
                <button onClick={onClose}>&times;</button>
              </div>
              <div className="p-6">{children}</div>
              {onConfirm && (
                <div className="flex justify-end gap-4 p-6 border-t">
                  <button onClick={onClose}>Cancel</button>
                  <button onClick={onConfirm} className="bg-blue-500 text-white px-4 py-2 rounded">
                    {confirmLabel || 'Confirm'}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

**Document Version:** 1.0.0  
**Last Updated:** January 4, 2026  
**Next Review:** Quarterly or after major version update

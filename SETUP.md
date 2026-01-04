# ENVIRONMENT SETUP & QUICK START GUIDE
## Complete Development Environment Configuration

**Version:** 1.1.0
**Last Updated:** January 26, 2025
**Platform:** Ubuntu 24.04.3 LTS (dev container)

---

## 1. PREREQUISITES & ENVIRONMENT SPECIFICATIONS

### 1.1 Required Software Versions

| Software | Version | Purpose | Status |
|----------|---------|---------|--------|
| Node.js | 22.21.0 | JavaScript runtime | ✅ Required |
| npm | 10.5.0+ | Package manager | ✅ Required |
| Python | 3.11.2 | Scripting/automation | ✅ Recommended |
| Docker | 29.1.3 | Containerization | ✅ Recommended |
| Git | 2.39.5 | Version control | ✅ Required |

### 1.2 Recommended VS Code Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-vscode.makefile-tools",
    "ms-vscode-remote.remote-containers",
    "ms-vscode.remote-explorer",
    "eamodio.gitlens",
    "GitHub.copilot"
  ]
}
```

---

## 2. QUICK START (5 MINUTES)

### 2.1 Clone & Install

```bash
# Clone the repository
git clone <repository-url>
cd Poziverselanding

# Install dependencies (requires Node.js 22.21.0)
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:5173`

### 2.2 Verify Installation

```bash
# Check Node.js version
node --version
# Expected: v22.21.0

# Check npm version
npm --version
# Expected: 10.5.0+

# List installed dependencies
npm list

# Verify build works
npm run build
```

---

## 3. DETAILED SETUP INSTRUCTIONS

### 3.1 Node.js Installation

#### Option A: Using nvm (Recommended)

```bash
# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload shell configuration
source ~/.bashrc

# Install Node.js 22.21.0
nvm install 22.21.0

# Use this version
nvm use 22.21.0

# Set as default
nvm alias default 22.21.0

# Verify
node --version  # v22.21.0
npm --version   # Should be 10.5.0+
```

#### Option B: Direct Installation (Ubuntu/Debian)

```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -

# Install Node.js
sudo apt-get install -y nodejs

# Verify version
node --version  # Must be 22.21.0
npm --version
```

#### Option C: Using Docker

```bash
# Create a container with correct Node.js version
docker run -it --rm \
  -v $(pwd):/workspace \
  -w /workspace \
  node:22.21.0 \
  bash
```

### 3.2 Python Installation (Optional but Recommended)

```bash
# Check if Python 3.11 is installed
python3 --version

# If not, install Python 3.11
sudo apt-get install -y python3.11 python3.11-venv python3-pip

# Create virtual environment for projects
python3.11 -m venv ~/.venv

# Activate virtual environment
source ~/.venv/bin/activate

# Verify
python3 --version  # 3.11.x
```

### 3.3 Git Configuration

```bash
# Configure Git user
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default branch name
git config --global init.defaultBranch main

# Enable useful aliases
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit

# Verify configuration
git config --list | grep user
```

### 3.4 Docker Setup

```bash
# Verify Docker installation
docker --version
# Expected: Docker version 29.1.3 or higher

# Test Docker daemon
docker run hello-world

# Create docker group (if using non-root user)
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker

# Verify you can run Docker without sudo
docker ps
```

---

## 4. PROJECT SETUP

### 4.1 Install Dependencies

```bash
# Clean install (remove node_modules if exists)
rm -rf node_modules package-lock.json
npm cache clean --force

# Install all dependencies
npm install

# This installs:
# - React 18.x
# - TypeScript
# - Tailwind CSS
# - Radix UI components
# - Motion/Framer Motion
# - Vite build tools
# - All other dependencies in package.json
```

### 4.2 Environment Variables

Create `.env.local` file in project root:

```bash
# .env.local
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENVIRONMENT=development
VITE_LOG_LEVEL=debug
```

Available environment variables:
- `VITE_API_BASE_URL`: Backend API endpoint
- `VITE_ENVIRONMENT`: 'development' | 'staging' | 'production'
- `VITE_LOG_LEVEL`: 'debug' | 'info' | 'warn' | 'error'

### 4.3 Development Server

```bash
# Start Vite dev server with HMR
npm run dev

# Server output:
# VITE v X.X.X  ready in XXX ms
# ➜  Local:   http://localhost:5173/
# ➜  press h to show help
```

Access the application at `http://localhost:5173`

**Hot Module Replacement (HMR):** Changes to components automatically reload without full page refresh

### 4.4 Build Process

```bash
# Development build (full source maps)
npm run build

# This creates:
# dist/
# ├── index.html
# ├── assets/
# │   ├── main-xxxxx.js      # Main bundle
# │   ├── main-xxxxx.css     # Global styles
# │   └── vendor-xxxxx.js    # Dependencies
# └── ... other assets

# Preview production build locally
npm run preview

# Access at http://localhost:4173
```

---

## 5. IDE & EDITOR SETUP

### 5.1 VS Code Configuration

Create `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "files.exclude": {
    "**/node_modules": true,
    "**/.next": true,
    "**/dist": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true
  }
}
```

### 5.2 Required Extensions

Install these extensions from VS Code Marketplace:

1. **ESLint** (dbaeumer.vscode-eslint)
   ```
   Provides real-time linting feedback
   ```

2. **Prettier** (esbenp.prettier-vscode)
   ```
   Code formatter with opinionated defaults
   ```

3. **Docker** (ms-vscode.docker)
   ```
   Docker support and container management
   ```

4. **GitLens** (eamodio.gitlens)
   ```
   Git integration and history visualization
   ```

5. **Remote - Containers** (ms-vscode-remote.remote-containers)
   ```
   Develop inside Docker containers
   ```

### 5.3 Recommended Extensions

- **Thunder Client** (rangav.vscode-thunder-client) - REST API testing
- **Material Icon Theme** (PKief.material-icon-theme) - File icons
- **Better Comments** (aaron-bond.better-comments) - Comment highlighting

---

## 6. COMMON COMMANDS

### 6.1 Development Commands

```bash
# Start development server with auto-reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking (TypeScript)
npm run type-check

# Format code with Prettier
npm run format

# Format and fix with Prettier and ESLint
npm run lint:fix

# Run tests (when implemented)
npm test

# Watch tests (when implemented)
npm test:watch
```

### 6.2 Git Commands

```bash
# Check current branch
git status

# Create new feature branch
git checkout -b feature/feature-name

# Commit changes
git commit -m "feat(scope): description"

# Push to remote
git push origin feature/feature-name

# Create pull request (on GitHub web interface)

# Merge and cleanup
git checkout main
git pull origin main
git merge feature/feature-name
git push origin main
```

### 6.3 Package Management

```bash
# Add new dependency
npm install package-name

# Add dev dependency
npm install --save-dev package-name

# Remove dependency
npm uninstall package-name

# Update dependencies
npm update

# Check outdated packages
npm outdated

# Clean cache
npm cache clean --force
```

---

## 7. TROUBLESHOOTING

### Issue: Node version mismatch

**Error:** `npm ERR! The operation couldn't be completed. Node vX.X.X is not compatible`

**Solution:**
```bash
# Using nvm
nvm install 22.21.0
nvm use 22.21.0

# Or verify current version
node --version
```

### Issue: npm install fails

**Error:** `npm ERR! code ERESOLVE` or dependency conflicts

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# If still fails, try legacy dependency resolution
npm install --legacy-peer-deps
```

### Issue: Port 5173 already in use

**Error:** `Error: Port 5173 is already in use`

**Solution:**
```bash
# Find process using port 5173
lsof -i :5173

# Kill the process
kill -9 <PID>

# Or use different port
npm run dev -- --port 5174
```

### Issue: TypeScript errors not showing

**Error:** No TypeScript errors in editor

**Solution:**
```json
// .vscode/settings.json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

### Issue: Prettier conflicts with ESLint

**Error:** Formatting conflicts between tools

**Solution:**
```bash
# Run in this order
npm run lint:fix  # ESLint + Prettier
```

---

## 8. PERFORMANCE OPTIMIZATION

### 8.1 npm Install Speed

```bash
# Use npm ci for CI/CD (faster, deterministic)
npm ci

# Use npm ci in production Docker builds
```

### 8.2 Development Server Speed

```bash
# Monitor what's slow
npm run dev -- --debug

# Check bundle size
npm run build -- --report
```

### 8.3 Build Optimization

Already configured in `vite.config.ts`:
- Code splitting by route
- CSS minification
- JavaScript minification
- Asset optimization

---

## 9. CONTAINERIZED DEVELOPMENT (DOCKER)

### 9.1 Local Docker Setup

Create `Dockerfile.dev`:

```dockerfile
FROM node:22.21.0-alpine

WORKDIR /workspace

# Install Python for scripting support
RUN apk add --no-cache python3 py3-pip

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./

# Install dependencies
RUN npm install

# Expose development server port
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev"]
```

### 9.2 Docker Compose for Development

Create `docker-compose.dev.yml`:

```yaml
version: '3.8'

services:
  dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "5173:5173"
    volumes:
      - .:/workspace
      - /workspace/node_modules
    environment:
      - VITE_API_BASE_URL=http://localhost:3000/api
      - VITE_ENVIRONMENT=development
    command: npm run dev

  # Future: Add backend API service
  # api:
  #   image: your-api-image
  #   ports:
  #     - "3000:3000"
```

### 9.3 Running in Container

```bash
# Build image
docker build -t poziverse-dev -f Dockerfile.dev .

# Run container
docker run -it --rm \
  -p 5173:5173 \
  -v $(pwd):/workspace \
  -v /workspace/node_modules \
  poziverse-dev

# Or using Docker Compose
docker-compose -f docker-compose.dev.yml up
```

---

## 10. CI/CD PREPARATION

### 10.1 GitHub Actions Workflow

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [22.21.0]
    
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run type-check
      
      - name: Lint
        run: npm run lint
      
      - name: Build
        run: npm run build
      
      - name: Test
        run: npm test
```

---

## 11. DEPLOYMENT PREPARATION

### 11.1 Production Build

```bash
# Create optimized production build
npm run build

# Output in dist/ folder
# Ready to deploy to:
# - Vercel
# - Netlify
# - GitHub Pages
# - Any static host
# - Docker container
```

### 11.2 Environment for Production

Create `.env.production`:

```bash
VITE_API_BASE_URL=https://api.example.com
VITE_ENVIRONMENT=production
VITE_LOG_LEVEL=error
```

---

## 12. DOCUMENTATION & RESOURCES

### 12.1 Project Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
- [SPECIFICATIONS.md](./SPECIFICATIONS.md) - Feature specifications
- [DEVELOPMENT_GUIDELINES.md](./DEVELOPMENT_GUIDELINES.md) - Code standards
- [README.md](./README.md) - Project overview

### 12.2 Technology Documentation

| Technology | Documentation | Purpose |
|-----------|---------------|---------|
| React | https://react.dev | UI framework |
| TypeScript | https://www.typescriptlang.org | Type safety |
| Vite | https://vitejs.dev | Build tool |
| Tailwind CSS | https://tailwindcss.com | Styling |
| Radix UI | https://www.radix-ui.com | Components |
| Motion | https://www.motion.dev | Animations |
| Lucide React | https://lucide.dev | Icons |

### 12.3 Learning Resources

- **React Docs:** Official React documentation
- **TypeScript Handbook:** Type system reference
- **Tailwind CSS Docs:** Utility class reference
- **MDN Web Docs:** Web platform reference

---

## 13. TEAM ONBOARDING CHECKLIST

New team members should complete in this order:

- [ ] Install Node.js 22.21.0
- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Verify `npm run dev` works
- [ ] Read ARCHITECTURE.md
- [ ] Read SPECIFICATIONS.md
- [ ] Read DEVELOPMENT_GUIDELINES.md
- [ ] Install VS Code extensions
- [ ] Configure VS Code settings
- [ ] Create feature branch
- [ ] Make first commit
- [ ] Create pull request
- [ ] Get code review feedback
- [ ] Merge first PR

**Estimated time:** 2-3 hours

---

## 14. SUPPORT & HELP

### Getting Help

1. **Check documentation** - Start with project docs
2. **Search issues** - Check GitHub issues for solutions
3. **Ask team** - Slack/Discord team channel
4. **Check logs** - Run with `--debug` flag for details

### Reporting Issues

When reporting issues, include:
- Node.js version: `node --version`
- npm version: `npm --version`
- Error message (full stack trace)
- Steps to reproduce
- Environment (OS, browser)

---

## 15. MAINTAINING YOUR ENVIRONMENT

### Regular Maintenance

```bash
# Weekly
npm update  # Update dependencies within semver

# Monthly
npm outdated  # Check for major updates
npm audit     # Check for security issues
npm audit fix # Auto-fix security issues

# Quarterly
# Review and plan major version upgrades
```

### Clean Up

```bash
# Remove unused dependencies
npm prune

# Clear build artifacts
rm -rf dist build .next

# Reset node_modules
rm -rf node_modules package-lock.json
npm install
```

---

## APPENDIX: QUICK REFERENCE

### Essential npm Commands

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview prod build |
| `npm test` | Run tests |
| `npm run lint` | Check code style |
| `npm run format` | Format code |

### File Locations

| Item | Location |
|------|----------|
| Source code | `src/` |
| Components | `src/app/components/` |
| Styles | `src/styles/` |
| Build output | `dist/` |
| Dependencies | `node_modules/` |
| Config | `vite.config.ts`, `tsconfig.json`, `tailwind.config.js` |

### Ports

| Service | Port | Command |
|---------|------|---------|
| Dev server | 5173 | `npm run dev` |
| Preview server | 4173 | `npm run preview` |
| Backend API | 3000 | (future) |

---

**Last Updated:** January 4, 2026  
**Next Review:** Monthly or after major version updates  
**Document Owner:** DevOps/Infrastructure Team

Contact for issues: [team-email]

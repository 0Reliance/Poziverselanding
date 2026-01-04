# Poziverse Work Orchestrator Dashboard

A sophisticated workspace management interface designed for homelab and development project orchestration. Built with a glassmorphism design philosophy, it provides an intuitive multi-panel environment that scales seamlessly from mobile devices to desktop workstations.

![Poziverse Dashboard](https://via.placeholder.com/1200x600?text=Poziverse+Dashboard+Preview)

## 🚀 Features

- **Glassmorphism Design**: A modern, translucent UI with blur effects and refined animations.
- **Responsive Architecture**: 
  - **Desktop**: 4-column layout with contextual sidebars and bottom panels.
  - **Mobile**: Optimized single-column card view.
- **Project Management**: Track active projects, progress, and tech stacks.
- **Resource Hub**: Manage code snippets, API keys, and documentation bookmarks.
- **Launchpad**: Quick access to deployed applications and tools.
- **File Storage**: Monitor storage sources (S3, GDrive, Local) and capacity.
- **User Control**: Integrated directory, activity feed, and notification center.
- **Developer Tools**: Built-in terminal, output, and problem panels.

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + PostCSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Components**: Radix UI Primitives

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/genpozi/Poziverselanding.git
   cd Poziverselanding
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📂 Project Structure

```
src/
├── app/
│   ├── components/         # UI Components
│   │   ├── files/          # File management views
│   │   ├── resources/      # Resource management views
│   │   ├── usercontrol/    # User & Activity views
│   │   └── ui/             # Shared UI primitives
│   ├── data/               # Mock data & types
│   └── App.tsx             # Main application entry
├── styles/                 # Global styles & themes
└── main.tsx                # React entry point
```

## 🎨 Design System

The application uses a custom design system defined in `src/styles/theme.css` and `tailwind.config.js`. Key features include:

- **Colors**: OKLCH color space for vibrant, accessible colors.
- **Typography**: Inter font family.
- **Effects**: Backdrop blur, glass gradients, and smooth transitions.
- **Scrollbars**: Custom VS Code-style scrollbars for a premium feel.

## 📄 Documentation

For detailed documentation, please refer to:

- [**ARCHITECTURE.md**](./ARCHITECTURE.md): System architecture and component hierarchy.
- [**SPECIFICATIONS.md**](./SPECIFICATIONS.md): Detailed feature requirements and data models.
- [**DEVELOPMENT_GUIDELINES.md**](./DEVELOPMENT_GUIDELINES.md): Code standards and best practices.

## 🤝 Contributing

Contributions are welcome! Please read our [Development Guidelines](./DEVELOPMENT_GUIDELINES.md) before submitting a pull request.

## 📄 License

This project is licensed under the MIT License.
# NAVIGATION CATEGORY SPECIFICATIONS
## Detailed Requirements for Each Dashboard Section

**Version:** 1.0.0  
**Last Updated:** January 4, 2026  
**Status:** Specification Phase  
**Development Priority:** Ordered as listed below

---

## 1. HOME SECTION

### 1.1 Overview
The Home section serves as the central information hub and landing page for the Poziverse Workspace. Unlike other functional sections, it focuses on orientation, navigation guidance, and high-level status rather than direct content management.

### 1.2 Primary Features

#### 1.2.1 Landing Experience
- **Default State:** The application loads the Home section by default.
- **Layout:** A clean, information-centric layout free from the standard document grid panels.
- **Navigation:** The contextual side menu remains closed by default to maximize screen real estate for the welcome experience.

#### 1.2.2 Information Hub
- **Welcome Area:** Personalized greeting and system status summary.
- **Quick Links:** Direct access to common tasks (Create Project, Upload File, etc.).
- **Documentation & Instructions:**
  - "Getting Started" guide for new users.
  - Links to internal documentation (Architecture, Guidelines).
  - Recent system updates or release notes.

#### 1.2.3 Status & Metrics
- **System Health:** Visual indicators for service status (API, Database, Storage).
- **Workspace Overview:** High-level counts of active projects and resources.

### 1.3 User Interaction
- **Navigation Behavior:** Clicking "Home" in the primary navigation bar closes any open contextual menus and returns to this landing view.
- **Actionable Cards:** Information cards may contain buttons to jump to specific functional areas (e.g., "Go to Launchpad").

### 1.4 Data Requirements
- **Static Content:** Instructional text and links.
- **Dynamic Content:** User name, system status flags, simple counters.

---
  uptime: string;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  isHealthy: boolean;
}

interface QuickStat {
  label: string;
  value: number | string;
  icon: IconType;
  color: ColorName;
  trend?: {
    direction: 'up' | 'down' | 'stable';
    percentage: number;
  };
}

interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: Date;
  icon: IconType;
  type: 'project' | 'file' | 'user' | 'system';
}

interface PinnedItem {
  id: string;
  title: string;
  type: 'project' | 'file' | 'folder';
  icon: IconType;
  order: number;
}

interface Event {
  id: string;
  title: string;
  date: Date;
  priority: 'urgent' | 'high' | 'normal' | 'low';
  type: 'milestone' | 'meeting' | 'deployment' | 'maintenance';
}

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'alert';
  dismissable: boolean;
  createdAt: Date;
}
```

### 1.4 Component Structure

```
Home Page
├── Welcome Header
│   ├── Greeting
│   ├── Current Time
│   └── System Status Indicator
├── Quick Stats Section
│   └── StatCard (x4-6)
├── Pinned Shortcuts Section
│   └── ShortcutItem (x8 max)
├── Recent Activity Section
│   ├── Activity Filters
│   └── ActivityList
│       └── ActivityItem (x20 visible)
├── Upcoming Events Section
│   └── EventTimeline
├── Announcements Section
│   └── AnnouncementBanner (x1-3)
└── Action Prompts
    └── CTA Buttons (Call-to-action)
```

### 1.5 User Interactions

| Action | Trigger | Response |
|--------|---------|----------|
| View dashboard | Navigate to home | Load data, display sections |
| Click metric card | Click on stat card | Navigate to detailed section |
| Click recent item | Click activity item | Navigate to item details |
| Pin item | Context menu or drag | Add to shortcuts, save |
| Unpin item | Hover + X button | Remove from shortcuts |
| Dismiss announcement | Click X on banner | Hide, mark as read |
| Load more activities | Scroll to bottom | Fetch additional items |
| Filter activities | Click filter button | Filter list by type |

### 1.6 Performance Considerations

- **Initial Load:** Load only above-the-fold content first
- **Data Fetching:** Parallel API calls where possible
- **Caching:** Recent activity cached for 2 minutes
- **Pagination:** Virtual scrolling for activity lists >100 items
- **Charts:** SVG-based for fast rendering

### 1.7 Mobile Adaptations

- Simplified stat cards (2 columns)
- Collapsed activity feed (3 items visible)
- Single column layout
- Touch-optimized filters
- Swipe actions for dismissal

### 1.8 Acceptance Criteria

- [ ] All sections render without errors
- [ ] Responsive on desktop (1024px+) and mobile (<1024px)
- [ ] Quick stat cards clickable and navigate correctly
- [ ] Recent activity feed scrolls smoothly with 50+ items
- [ ] Pinned items persist across sessions
- [ ] Announcements dismissable and state preserved
- [ ] System status updates every 30 seconds
- [ ] Page load time <2 seconds (empty cache)
- [ ] Accessibility score >90 on Lighthouse

---

## 2. PROJECTS SECTION

### 2.1 Overview
The Projects section is dedicated to managing, organizing, and tracking development and work projects. It provides comprehensive project lifecycle management from creation through completion.

### 2.2 Primary Features

#### 2.2.1 Project List View
- **Display:** Grid or list view with toggle
- **Columns/Fields:**
  - Project name and icon
  - Status (active, paused, completed, archived)
  - Progress percentage
  - Team members (avatar stack)
  - Last updated timestamp
  - Priority indicator
  - Assigned tags
- **Sorting Options:** Name, status, progress, date modified, priority
- **Filtering Options:** Status, team member, date range, tags, priority
- **Search:** Full-text search across name and description

#### 2.2.2 Project Details Panel
- **Display:** Sidebar showing full project information (MetadataSidebar)
- **Content:**
  - Project overview and description
  - Tech Stack
  - Team composition (Collaborators)
  - Activity history
  - Project Stats (Views, Stars, Forks)
- **Actions:**
  - Launch Project (Live URL)
  - View Code (Repo URL)
  - View Full History

#### 2.2.3 Project Creation Dialog
- **Type:** Modal Dialog
- **Fields:**
  - Project Name (Required)
  - Subtitle/Short Description
  - Full Description
  - Status (Active, Completed, Archived, In Progress)
  - Color Theme
  - Tech Stack (Tags)
  - Live URL & Repo URL
  - Progress Percentage
- **Features:**
  - Real-time validation
  - Icon selection (Lucide icons)
  - Edit mode support (reused for updating projects)

#### 2.2.4 Project Templates
- **Available Templates:**
  - Web Development
  - Infrastructure
  - Documentation
  - Research
  - Personal Project
  - Team Collaboration
  - Custom (user-created)
- **Content:**
  - Pre-configured metadata fields
  - Suggested team structure
  - Default milestones
  - Example boards/views

#### 2.2.5 Team Collaboration Features
- **Team Members:**
  - List with roles (owner, admin, member, viewer)
  - Status indicators (online/offline)
  - Permission matrix display
- **Permissions:**
  - View
  - Edit
  - Invite
  - Delete
  - Manage members
- **Notifications:**
  - Project updates
  - Member additions
  - Status changes
  - Deadline approaching

#### 2.2.6 Milestones & Timeline
- **Display:** Gantt chart or timeline view
- **Features:**
  - Milestone creation and editing
  - Dependency tracking
  - Critical path visualization
  - Deadline alerts
  - Progress percentage per milestone
  - Rollover/overdue indicators

#### 2.2.7 Project Integrations
- **Available Integrations:**
  - Git repositories (GitHub, GitLab)
  - CI/CD pipelines (GitHub Actions, GitLab CI)
  - Issue tracking (Jira, Plane)
  - Documentation (Notion, Confluence)
  - Communication (Slack, Discord)
- **Features:**
  - Sync pull requests/commits
  - Pipeline status display
  - Issue linking
  - Notifications on integration events

### 2.3 Data Requirements

```typescript
interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: 'active' | 'completed' | 'archived' | 'in-progress';
  liveUrl: string;
  repoUrl: string;
  techStack: string[];
  lastUpdated: string;
  icon: any; // Lucide icon component
  color: 'cyan' | 'blue' | 'purple' | 'pink' | 'green' | 'yellow' | 'orange';
  progress: number;
  collaborators: Collaborator[];
  activity: Activity[];
  stats: ProjectStats;
}

interface Collaborator {
  initials: string;
  name: string;
  status: 'online' | 'offline' | 'away';
}

interface Activity {
  action: string;
  time: string;
  user: string;
  icon: any;
}

interface ProjectStats {
  views: number;
  stars: number;
  forks: number;
}

interface ProjectMember {
  user: User;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  joinedAt: Date;
  permissions: Permission[];
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  targetDate: Date;
  completed: boolean;
  progress: number;
  tasks: Task[];
}

interface Permission {
  resource: 'project' | 'files' | 'team' | 'settings';
  action: 'view' | 'edit' | 'delete' | 'manage';
}

interface Integration {
  id: string;
  type: string; // 'github', 'slack', 'jira', etc.
  status: 'connected' | 'disconnected' | 'error';
  lastSync: Date;
  configuration: Record<string, any>;
}
```

### 2.4 Component Structure

```
Projects Page
├── Page Header
│   ├── Title & Icon
│   ├── Create Project Button
│   ├── View Toggle (Grid/List)
│   └── Search Bar
├── Filter & Sort Section
│   ├── Status Filter
│   ├── Priority Filter
│   ├── Date Range Filter
│   ├── Team Member Filter
│   ├── Tag Filter
│   └── Sort Dropdown
├── Project Grid/List
│   ├── ProjectCard (Grid view)
│   │   ├── Project icon & name
│   │   ├── Status badge
│   │   ├── Progress bar
│   │   ├── Team avatars
│   │   ├── Last updated
│   │   └── Action menu
│   └── ProjectListItem (List view)
├── Project Details Modal
│   ├── Overview Section
│   ├── Team Section
│   ├── Timeline Section
│   ├── Files Section
│   ├── Activity Section
│   └── Action Buttons
├── Create Project Modal
│   └── Project Form (Create/Edit)
└── Empty State
    └── CTA to create first project
```

### 2.5 User Interactions

| Action | Trigger | Response |
|--------|---------|----------|
| Create project | Click create button | Open create dialog |
| Search projects | Type in search bar | Filter results in real-time |
| Filter projects | Click filter button | Display matching projects |
| View details | Click project card | Open details modal |
| Edit project | Click edit button | Open edit form |
| Invite team member | Click add member | Show user search/invite form |
| Update status | Change status dropdown | Save and notify team |
| Complete milestone | Click milestone | Mark complete, update progress |
| Delete project | Click delete button | Confirmation dialog, remove project |
| Share project | Click share button | Show shareable link options |

### 2.6 Performance Considerations

- **List Virtualization:** Use virtual scrolling for 100+ projects
- **Lazy Loading:** Load project details on demand
- **Caching:** Cache project list for 5 minutes
- **Images:** Use webp format with fallbacks
- **Pagination:** Show 20 projects per page with lazy load more

### 2.7 Mobile Adaptations

- Single column card view
- Simplified details modal
- Floating action button for create
- Swipe actions for common operations
- Collapsible filters

### 2.8 Acceptance Criteria

- [ ] Create, read, update, delete projects fully functional
- [ ] Team member invitations with email notifications
- [ ] Progress tracking with percentage accuracy
- [ ] Milestone completion updates project progress
- [ ] Search works across name and description
- [ ] Filters combine logically (AND operations)
- [ ] Integrations sync data successfully
- [ ] Archive/delete operations with confirmation
- [ ] Mobile view adapts properly
- [ ] Page load time <3 seconds (20 projects)
- [ ] Accessibility score >90

---

## 3. FILES SECTION

### 3.1 Overview
The Files section provides a comprehensive file management system with support for multiple file types, organization structures, and collaborative workflows.

### 3.2 Primary Features

#### 3.2.1 File Browser
- **Display:** Hierarchical folder structure with file listings
- **Features:**
  - Breadcrumb navigation
  - Back/forward navigation
  - Favorite/starred files
  - Recent files view
  - Sorting (name, type, date, size)
  - Multiple view modes (grid, list, timeline)
- **File Information Displayed:**
  - Icon by file type
  - Filename with extension
  - File size
  - Modified date
  - Owner/author
  - Status (synced, pending, error)

#### 3.2.2 File Operations
- **Upload:**
  - Drag-and-drop support
  - Multi-file selection
  - Progress indicator
  - Conflict resolution
  - Automatic folder creation
- **Download:**
  - Single or batch download
  - Zip compression for multiple files
  - Download history
- **Copy/Move:**
  - Drag-to-folder support
  - Cut/paste operations
  - Batch operations
  - Undo/redo (5 step history)
- **Delete:**
  - Soft delete to trash
  - Permanent delete confirmation
  - Restore from trash (30-day retention)
- **Rename:**
  - Inline editing
  - Validation (no special chars)
  - Confirmation before save

#### 3.2.3 File Preview
- **Supported Formats:**
  - Documents (PDF, DOCX, TXT, MD)
  - Images (PNG, JPG, GIF, SVG, WEBP)
  - Code (JS, TS, Python, YAML, JSON)
  - Video (MP4, WebM) - thumbnails
  - Audio (MP3, WAV) - player
  - Archives (ZIP) - content listing
- **Preview Features:**
  - Syntax highlighting for code
  - Zoom for images
  - Search in document
  - Download from preview
  - Full-screen mode

#### 3.2.4 File Organization
- **Tags/Labels:**
  - Create custom tags
  - Assign multiple tags to files
  - Filter by tags
  - Tag suggestions based on file content
- **Metadata:**
  - Custom metadata fields
  - Automatic metadata extraction
  - Search by metadata
  - Metadata editor
- **Smart Collections:**
  - By type (documents, images, code, etc.)
  - By date modified
  - By owner
  - Custom saved searches

#### 3.2.5 Sharing & Collaboration
- **Share Options:**
  - Link sharing (with expiry)
  - Permission levels (view/edit/comment)
  - Password protection
  - Disable downloading
  - Track access logs
- **Collaboration Features:**
  - Comments on files
  - Version history (last 10 versions)
  - Real-time simultaneous editing (future)
  - Annotations on documents/images
  - Activity timeline

#### 3.2.6 Storage Management
- **Quota Display:**
  - Used vs. available space
  - Visual progress bar
  - Size by file type breakdown
  - Oldest files identification
- **Cleanup Suggestions:**
  - Duplicate detection
  - Large files list
  - Unused files (no access for 90 days)
  - Archived items

### 3.3 Data Requirements

```typescript
interface FileSystem {
  folders: Folder[];
  files: File[];
  trash: TrashItem[];
  favorites: Favorite[];
  recentAccess: RecentItem[];
  storageQuota: StorageQuota;
}

interface Folder {
  id: string;
  name: string;
  parentId?: string;
  owner: User;
  created: Date;
  modified: Date;
  description?: string;
  color?: string;
  children?: Folder[];
  files?: File[];
  tags?: string[];
  metadata?: Record<string, any>;
  sharedWith?: SharedAccess[];
}

interface File {
  id: string;
  name: string;
  extension: string;
  mimeType: string;
  size: number;
  folderId: string;
  owner: User;
  created: Date;
  modified: Date;
  versions: FileVersion[];
  preview?: string;
  thumbnail?: string;
  tags?: string[];
  metadata?: Record<string, any>;
  sharedWith?: SharedAccess[];
  comments?: Comment[];
  starred: boolean;
  syncStatus: 'synced' | 'pending' | 'error';
  errorMessage?: string;
}

interface FileVersion {
  id: string;
  versionNumber: number;
  size: number;
  createdAt: Date;
  createdBy: User;
  changeLog?: string;
  isRestore?: boolean;
}

interface SharedAccess {
  id: string;
  sharedWith: User | 'public';
  permission: 'view' | 'edit' | 'comment';
  link: string;
  expiresAt?: Date;
  password?: string;
  allowDownload: boolean;
  accessLog: AccessLogEntry[];
}

interface StorageQuota {
  totalBytes: number;
  usedBytes: number;
  byType: Record<string, number>;
}

interface TrashItem {
  id: string;
  item: File | Folder;
  deletedBy: User;
  deletedAt: Date;
  restorePath?: string;
}
```

### 3.4 Component Structure

```
Files Page
├── Page Header
│   ├── Current Folder Breadcrumb
│   ├── View Mode Toggle
│   ├── Search Bar
│   └── Create Folder Button
├── Sidebar (Left)
│   ├── Favorites Section
│   ├── Recent Files
│   ├── Folder Tree
│   ├── Smart Collections
│   └── Storage Usage Widget
├── Main Content Area
│   ├── Sort & Filter Bar
│   ├── Toolbar
│   │   ├── Upload Button
│   │   ├── Download Button
│   │   ├── Delete Button
│   │   └── More Actions Menu
│   ├── File Grid/List
│   │   └── FileItem (Grid or List)
│   │       ├── Icon/Preview
│   │       ├── Name
│   │       ├── Metadata
│   │       └── Action Menu
│   └── Empty State
├── File Preview Modal
│   ├── Preview Content Area
│   ├── Metadata Sidebar
│   ├── Comments Section
│   ├── Version History
│   └── Action Buttons
├── Sharing Dialog
│   ├── Link Settings
│   ├── Permission Selection
│   └── Shared User List
└── Context Menu
    ├── Open
    ├── Preview
    ├── Edit
    ├── Download
    ├── Copy/Move
    ├── Share
    ├── Rename
    └── Delete
```

### 3.5 User Interactions

| Action | Trigger | Response |
|--------|---------|----------|
| Upload files | Drag-drop or click upload | Progress indicator, add to list |
| Browse folders | Click folder | Navigate into, update breadcrumb |
| Preview file | Double-click or preview icon | Open preview modal |
| Share file | Right-click -> Share | Show sharing dialog |
| Create folder | Click create button | Inline edit for name, create |
| Delete file | Right-click -> Delete | Move to trash, show notification |
| Restore file | Trash -> Restore | Move back to original location |
| Search files | Type search query | Filter results real-time |
| Tag file | Right-click -> Add tag | Show tag selector, apply |
| Download file | Click download | Start download, track in history |

### 3.6 Performance Considerations

- **Pagination:** Show 50 files per page with load more
- **Images:** Generate thumbnails on upload
- **Preview:** Lazy load preview content
- **Search:** Debounce search input (300ms)
- **Caching:** Cache file list for 2 minutes
- **Compression:** Serve files with gzip

### 3.7 Mobile Adaptations

- Single column file list
- Bottom sheet for upload options
- Floating action button for create
- Simplified preview modal
- Touch-optimized context menu

### 3.8 Acceptance Criteria

- [ ] Upload/download files successfully
- [ ] File preview for all supported formats
- [ ] Folder hierarchy navigation working
- [ ] Sharing links generated and functional
- [ ] Search results accurate and fast
- [ ] Version history accessible and restorable
- [ ] Trash items restore to original location
- [ ] Storage quota calculation accurate
- [ ] Comments on files functional
- [ ] Tags searchable and organized
- [ ] Mobile view optimized
- [ ] Page load <2 seconds
- [ ] Accessibility score >90

---

## 4. LAUNCHPAD SECTION

### 4.1 Overview
Launchpad is a centralized application launcher providing quick access to the entire ecosystem of development, productivity, and infrastructure tools commonly used in homelab and development environments.

### 4.2 Primary Features

#### 4.2.1 Application Categories
**8 Pre-configured Categories:**

1. **Development** (6 applications)
   - GitHub, VS Code, Docker, Codeserver, Portainer, Proxmox

2. **AI & Productivity** (6 applications)
   - Gemini, Ollama, NotebookLM, Cal.com, Keep, Memos

3. **Communication** (6 applications)
   - Slack, Discord, Mattermost, Jira, Plane, Answers

4. **Infrastructure** (6 applications)
   - Nextcloud, Plex, Home Assistant, Pi-hole, Nginx, Cloudflare

5. **Knowledge & Learning** (6 applications)
   - Calibre-Web, Bookstack, Open-Notebook, Notediscovery, Surfsense, Hoarder

6. **Design & Creative** (6 applications)
   - Figma, Affine, Excalidraw, Penpot, Immich, Maeple

7. **Utilities & Tools** (6 applications)
   - Vaultwarden, Uptime, Kasm, Terminal, Grocy, Mealie

8. **Data & Analytics** (6 applications)
   - Google, Drive, Mixpost, Blinko, Khoj, Rustdesk

#### 4.2.2 Application Display
- **Card View:**
  - Application icon (Lucide React Icon)
  - Application name
  - Brief description
  - Category tag
  - Color-coded gradient background
  - Hover animation with scale and glow
- **Interaction Model (Master-Detail):**
  - **Card Click:** Opens the "App Info" panel in the Metadata Sidebar, displaying detailed information, status, and statistics.
  - **Launch Button:** A distinct button overlay (visible on hover) that directly opens the application URL in a new tab.
- **Information Visible:**
  - Icon
  - Name
  - Short description
  - External link indicator (if URL is valid)

#### 4.2.3 Search & Filtering
- **Search Features:**
  - Full-text search across name and description
  - Real-time filtering as you type
  - Debounced for performance
  - Search history
  - Suggested searches
- **Filtering Options:**
  - By category (single select)
  - Multiple categories (future)
  - Recently launched
  - Most used (based on analytics)
  - Favorites

#### 4.2.4 Category Navigation
- **Category Selection:**
  - "All" option to show all 48 applications
  - Category buttons with icon or text
  - Active state highlighting
  - Category count badges
- **Smart Categories:**
  - "Favorites" collection
  - "Recent" based on usage
  - "Personal" custom collection

#### 4.2.5 Application Management
- **Add Custom Applications:**
  - Form to add new applications
  - Name, description, icon, URL, category
  - Icon upload or emoji picker
  - Validation before save
- **Edit/Remove:**
  - Edit existing applications
  - Remove from Launchpad
  - Reorder applications within category
- **Sorting:**
  - Default: alphabetical by name
  - By usage frequency
  - By last launched
  - Custom order (drag-to-reorder)

#### 4.2.6 Launch Tracking
- **Analytics:**
  - Track application launches
  - Record timestamp and user
  - Track frequency (most used apps)
  - Average time to first launch
- **Usage Insights:**
  - "Recently launched" list
  - "Most used" applications
  - Trending applications
  - Unused applications (no launch in 30 days)

#### 4.2.7 Keyboard Shortcuts (Future)
- Quick launch with Cmd/Ctrl + K
- Navigation with arrow keys
- Launch with Enter
- Open in new tab with Shift+Enter

### 4.3 Data Requirements

```typescript
interface LaunchpadItem {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any; // Lucide icon component
  color: string; // Tailwind gradient classes
  url: string;
  repoUrl?: string;
  tags: string[];
  status: 'online' | 'offline' | 'maintenance';
  stats?: {
    uptime?: string;
    users?: number;
    version?: string;
  };
}

interface LaunchpadCategory {
  id: string;
  name: string;
  icon: IconType;
  description: string;
  applications: LaunchpadApplication[];
  color: string;
  order: number;
}

interface LaunchStatistics {
  totalLaunches: number;
  lastLaunched?: Date;
  averageTimeToLaunch?: number;
  launchHistory: LaunchRecord[];
  usageRank?: number;
}

interface LaunchRecord {
  id: string;
  applicationId: string;
  userId: string;
  timestamp: Date;
  referrer?: string;
  openedInNewTab: boolean;
}

interface LaunchpadPreferences {
  userId: string;
  favorites: string[]; // Application IDs
  recentOrder: string[];
  customApplications: LaunchpadApplication[];
  lastViewed?: LaunchpadCategory;
}
```

### 4.4 Component Structure

```
Launchpad Page
├── Page Header
│   ├── Title
│   ├── Search Bar (prominent)
│   └── Settings Button
├── Category Navigation
│   ├── "All" Button
│   ├── Category Buttons (8 categories)
│   └── Search Results Indicator
├── Main Content Area
│   ├── Application Grid
│   │   └── ApplicationCard (8 columns desktop, 3 mobile)
│   │       ├── Icon/Emoji
│   │       ├── Name
│   │       ├── Description
│   │       ├── Category Badge
│   │       ├── Launch Button
│   │       ├── Favorite Star
│   │       └── Action Menu
│   └── Empty State
│       ├── No results message
│       ├── Suggested applications
│       └── Option to add custom app
├── Sidebar (Collapsible on mobile)
│   ├── Recently Launched
│   ├── Most Used
│   ├── Favorites
│   └── Manage Applications
└── Add Application Modal
    ├── Name Input
    ├── URL Input
    ├── Description
    ├── Category Selector
    ├── Icon Selector
    └── Save Button
```

### 4.5 User Interactions

| Action | Trigger | Response |
|--------|---------|----------|
| Launch app | Click launch button | Open URL in new tab, log event |
| View category | Click category button | Filter applications, update view |
| Search apps | Type in search bar | Filter in real-time, highlight matches |
| Add to favorites | Click star icon | Add to favorites list, visual feedback |
| Add custom app | Click add button | Open modal, validate, save |
| Edit custom app | Click edit in menu | Open edit form, save changes |
| Delete custom app | Click delete in menu | Confirmation modal, remove |
| View stats | Click info button | Show launch count and dates |
| Reorder apps | Drag card | Update order, save to preferences |
| Toggle sidebar | Click toggle | Show/hide recent/most used |

### 4.6 Performance Considerations

- **Initial Load:** Lazy load application icons
- **Search:** Debounce 300ms before filtering
- **Grid Rendering:** Use grid layout for efficiency
- **Caching:** Cache application list for 24 hours
- **Analytics:** Batch analytics events for performance
- **Icons:** Use emoji by default, load SVG on demand

### 4.7 Mobile Adaptations

- 3-column grid (instead of 8)
- Horizontal scrolling categories
- Bottom sheet for add application
- Floating action button for search
- Simplified card layout

### 4.8 Acceptance Criteria

- [ ] All 48 applications display correctly
- [ ] Search filters results in real-time
- [ ] Category filtering functional
- [ ] Application links open successfully
- [ ] Custom applications can be added/edited/deleted
- [ ] Favorites persist across sessions
- [ ] Launch statistics tracked accurately
- [ ] Mobile layout optimized
- [ ] Page load time <1 second
- [ ] Search performance with 100+ apps
- [ ] Accessibility score >90

---

## 5. USER CONTROL SECTION

### 5.1 Overview
The User Control section provides comprehensive user and team management, including directory management, administrative controls, and communication features for team coordination.

### 5.2 Primary Features

#### 5.2.1 User Directory
- **User List View:**
  - Avatar, name, email, status
  - Department/team indicator
  - Role badge
  - Last active time
  - Presence indicator (online/offline/idle)
  - Sorting options (name, status, role, dept)
  - Search and filtering
- **Interaction Model (Master-Detail):**
  - **Card Click:** Clicking anywhere on the user card opens the "User Profile" panel in the Metadata Sidebar, displaying detailed information, bio, skills, and contact details.
  - **Quick Actions:** Direct buttons on the card for "Message" (opens chat) and "Email" (opens mail client).
- **User Profile Card (Sidebar):**
  - Full contact information
  - Department and role
  - Reporting structure
  - Skills/expertise tags
  - Timezone
  - Contact methods
  - Quick messaging button
- **Filters:**
  - By department
  - By role
  - By status (active, inactive)
  - By availability
  - Favorites
- **Directory Export:**
  - CSV export
  - vCard for financial contacts
  - Email list

#### 5.2.2 User Administration
- **User Management:**
  - **Add User:** Prominent floating action button (FAB) or header button to add new users.
  - Edit user information
  - Deactivate/reactivate users
  - Delete users (admin only)
  - Reset password
  - Manage user roles
  - Bulk operations (invite, deactivate, role assignment)
- **Role Management:**
  - Predefined roles (admin, manager, member, viewer)
  - Custom role creation
  - Permission matrix editor
  - Role assignment to users
  - Role-based access control dashboard
- **Teams & Groups:**
  - Create teams
  - Add members to teams
  - Set team leads
  - Team permissions
  - Team activity tracking

#### 5.2.3 Direct Messages (Future Enhancement)
- **Messaging Features:**
  - One-on-one conversations
  - Group chats (future)
  - Message search
  - Message history
  - Pinned messages
  - Read receipts
  - Typing indicators
  - Emoji reactions
  - File sharing in chat (future)
- **Notifications:**
  - New message alerts
  - @mention notifications
  - Do not disturb mode
  - Notification preferences per conversation
- **User Status:**
  - Online/Offline/Idle
  - Custom status message
  - Away with time
  - Focused time blocks

#### 5.2.4 User Invitations & Onboarding
- **Invitation Process:**
  - Generate invitation links
  - Email invitations
  - Set expiry on invitations
  - Resend invitations
  - Track pending invitations
  - Bulk invite
- **Onboarding:**
  - Welcome email
  - Setup wizard for new users
  - Role assignment
  - Team assignment
  - Permissions configuration

#### 5.2.5 User Activity & Audit Log
- **Activity Tracking:**
  - Login/logout history
  - Actions performed
  - File access
  - Sharing events
  - Permission changes
  - Admin actions
- **Audit Log:**
  - Searchable activity log
  - Filtered by user, action, date
  - Export audit reports
  - Compliance reporting
  - Retention policy

#### 5.2.6 Permissions & Access Control
- **Permission Levels:**
  - View-only
  - Edit
  - Delete
  - Share
  - Manage access
  - Admin access
- **Permission Assignment:**
  - By role
  - By individual
  - By team/group
  - Time-limited permissions
  - Conditional access
- **Access Matrix:**
  - Visual representation
  - Role vs. resource
  - Drill down to details
  - Export matrix

### 5.3 Data Requirements

```typescript
interface User {
  id: string;
  name: string;
  role: 'admin' | 'member' | 'guest';
  status: 'online' | 'away' | 'offline';
  avatar: string;
  email: string;
  department: string;
  projects: number;
  lastActive: string;
  location?: string;
  joinDate?: string;
  bio?: string;
  skills?: string[];
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  createdAt: Date;
  isCustom: boolean;
}

interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  lead: User;
  created: Date;
  updated: Date;
}

interface TeamMember {
  user: User;
  role: 'lead' | 'member';
  joinedAt: Date;
}

interface Permission {
  id: string;
  resource: string; // 'projects', 'files', 'users', etc.
  action: string; // 'read', 'write', 'delete', etc.
  constraints?: {
    userIds?: string[];
    groupIds?: string[];
    expiresAt?: Date;
  };
}

interface UserInvitation {
  id: string;
  email: string;
  token: string;
  role: Role;
  expiresAt: Date;
  createdAt: Date;
  createdBy: User;
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
}

interface DirectMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  readAt?: Date;
  reactions?: Reaction[];
  attachments?: Attachment[];
  edited: boolean;
  editedAt?: Date;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  emailNotifications: boolean;
  pushNotifications: boolean;
  doNotDisturb?: { start: string; end: string };
  timezone: string;
  language: string;
}

interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  timestamp: Date;
  oldValue?: any;
  newValue?: any;
  ipAddress?: string;
  userAgent?: string;
}
```

### 5.4 Component Structure

```
User Control Page
├── Tab Navigation
│   ├── User Directory Tab
│   ├── User Admin Tab
│   └── Messages Tab
├── User Directory View
│   ├── Page Header
│   │   ├── Title
│   │   ├── Search Bar
│   │   └── Export Button
│   ├── Sidebar
│   │   ├── Department Filter
│   │   ├── Role Filter
│   │   ├── Status Filter
│   │   └── Favorites
│   ├── User List
│   │   └── UserListItem
│   │       ├── Avatar
│   │       ├── Name & Email
│   │       ├── Status
│   │       ├── Role
│   │       └── Action Menu
│   ├── User Profile Card
│   │   ├── Avatar & Name
│   │   ├── Contact Info
│   │   ├── Department & Role
│   │   ├── Status & Availability
│   │   └── Action Buttons
│   └── Empty State
├── User Admin View
│   ├── Page Header
│   │   ├── Title
│   │   ├── Add User Button
│   │   └── Bulk Actions
│   ├── Tabs
│   │   ├── Users Tab
│   │   ├── Teams Tab
│   │   ├── Roles Tab
│   │   └── Audit Log Tab
│   ├── User Management Section
│   │   ├── User List
│   │   └── User Edit Modal
│   ├── Team Management Section
│   │   ├── Team List
│   │   └── Team Edit Modal
│   ├── Role Management Section
│   │   ├── Role List
│   │   ├── Permission Matrix
│   │   └── Role Edit Modal
│   └── Audit Log Section
│       ├── Log Viewer
│       ├── Filters
│       └── Export Button
├── Messages View (Future)
│   ├── Conversation List
│   ├── Message Thread
│   ├── Message Input
│   └── User Status Sidebar
└── Modals
    ├── Add User Modal
    ├── Invite User Modal
    ├── Edit User Modal
    ├── Edit Team Modal
    └── Edit Role Modal
```

### 5.5 User Interactions

| Action | Trigger | Response |
|--------|---------|----------|
| Search users | Type in search | Filter results real-time |
| View profile | Click user | Open profile card |
| Add user | Click add button | Open invite modal |
| Invite user | Submit invite form | Send email, track invitation |
| Edit user | Click edit | Open edit form, save changes |
| Deactivate user | Click deactivate | Confirm, disable access |
| Create team | Click create team | Open modal, create team |
| Add to team | Click add members | Show user list, add |
| Set team lead | Click lead selector | Update team lead |
| Create role | Click create role | Open role editor |
| Edit permissions | Click edit | Show permission matrix |
| View audit log | Click log button | Open log viewer with filters |
| Send message | Type message | Send, update conversation |

### 5.6 Performance Considerations

- **User List:** Paginate or virtualize for 1000+ users
- **Search:** Debounce 300ms, limit results to 50
- **Messages:** Lazy load older messages
- **Avatars:** Use cached/optimized images
- **Audit Log:** Paginate by date or use infinite scroll
- **Permissions:** Cache permission matrix for 30 minutes

### 5.7 Mobile Adaptations

- Stacked tabs instead of horizontal
- Single column user list
- Bottom sheet for add user
- Simplified profile cards
- Floating message button
- Responsive filter sidebar

### 5.8 Acceptance Criteria

- [ ] User directory searchable and filterable
- [ ] User profiles display complete information
- [ ] Invite users via email functional
- [ ] Roles and permissions manageable
- [ ] Teams can be created and managed
- [ ] Audit log tracks all user actions
- [ ] Messages feature functional (future phase)
- [ ] Bulk operations work correctly
- [ ] Mobile layout optimized
- [ ] Page load <2 seconds
- [ ] Accessibility score >90

---

## 6. RESOURCES SECTION

### 6.1 Overview
The Resources section acts as a centralized vault for developer tools, reference materials, and sensitive data. It manages code snippets, API keys, secrets, and bookmarks with specialized views for each type.

### 6.2 Primary Features

#### 6.2.1 Resource Categories
- **Code Snippets:** Reusable code blocks with syntax highlighting
- **API Keys:** Management of service keys with usage tracking
- **Secrets:** Secure storage for sensitive tokens with rotation schedules
- **Bookmarks:** Curated links to documentation and tools
- **Servers:** Server connection details and status (future)
- **Other:** Miscellaneous resources

#### 6.2.2 Resource List View
- **Display:** Split-view layout with list on left, details on right
- **Filtering:**
  - By category (Snippet, Key, Secret, Bookmark, etc.)
  - Full-text search across titles and tags
  - Favorites filter
- **List Item Content:**
  - Type-specific icon
  - Title and subtitle
  - Description preview
  - Tag indicators
  - Favorite status

#### 6.2.3 Resource Detail Views

**A. Code Snippets**
- Syntax-highlighted code block
- Language indicator
- Copy-to-clipboard functionality
- Usage statistics

**B. API Keys**
- Masked/Unmasked key display
- Usage metrics (Today, Week, Month)
- Metadata: Environment, Service, Rate Limit, Expiration
- Permission scopes display

**C. Secrets**
- Secure value toggle (Hide/Reveal)
- Rotation schedule tracking (Last rotated, Next rotation)
- Associated services list
- Recent access log

**D. Bookmarks**
- URL display with "Open" action
- Last visited timestamp
- Categorization
- Rich text notes/description

#### 6.2.4 Management Features
- **Organization:**
  - Tagging system
  - Favorites marking
- **Actions:**
  - Create new resource
  - Edit existing resource
  - Delete resource
  - Copy values/content

### 6.3 Data Requirements

```typescript
type ResourceType = 'snippet' | 'secret' | 'key' | 'bookmark' | 'server' | 'other';

interface ResourceItem {
  id: string;
  type: ResourceType;
  title: string;
  subtitle?: string;
  tags: string[];
  icon?: IconType;
  metadata: ResourceMetadata;
  content?: string; // For snippets
  isFavorite?: boolean;
  createdAt: string;
  updatedAt?: string;
}

interface ResourceMetadata {
  // Common
  description?: string;
  
  // Key specific
  value?: string;
  environment?: string;
  service?: string;
  rateLimit?: string;
  expires?: string;
  usage?: {
    today: string;
    thisWeek: string;
    thisMonth: string;
  };
  permissions?: string[];

  // Secret specific
  lastRotated?: string;
  nextRotation?: string;
  associatedServices?: string[];
  recentAccess?: { service: string; time: string }[];

  // Bookmark specific
  url?: string;
  lastVisited?: string;
  category?: string;
  
  // Snippet specific
  language?: string;
  usageCount?: number;
}
```

### 6.4 Component Structure

```
Resources Page
├── Split Layout
│   ├── List Sidebar (Left)
│   │   ├── Search & Filter Header
│   │   │   ├── Search Input
│   │   │   ├── Filter Menu
│   │   │   └── Add Button
│   │   └── Resource List
│   │       └── ResourceListItem
│   └── Detail View (Right)
│       ├── Detail Header
│       │   ├── Icon & Title
│       │   ├── Type Badge
│       │   └── Action Buttons (Favorite, Edit, Delete)
│       ├── Type-Specific Content
│       │   ├── SnippetDetail (Code block)
│       │   ├── KeyDetail (Value, Stats, Metadata)
│       │   ├── SecretDetail (Value, Rotation, Access)
│       │   └── BookmarkDetail (URL, Notes)
│       └── Tags Section
```

### 6.5 User Interactions

| Action | Trigger | Response |
|--------|---------|----------|
| Select category | Click nav item | Filter list by type |
| Search resources | Type in search | Filter list real-time |
| View details | Click list item | Show details in right panel |
| Copy value | Click copy button | Copy to clipboard, show toast |
| Reveal secret | Click eye icon | Toggle visibility of sensitive data |
| Open bookmark | Click open button | Open URL in new tab |
| Toggle favorite | Click star | Update favorite status |

### 6.6 Acceptance Criteria

- [ ] All resource types render correctly
- [ ] Sensitive data is masked by default
- [ ] Copy functionality works for all types
- [ ] Search filters by title, tag, and type
- [ ] Responsive design handles split view correctly

---

## 7. CROSS-CUTTING CONCERNS

### 7.1 Navigation Between Sections

All sections should support:
- Smooth transitions between views
- History/back button functionality
- Deep linking (shareable URLs)
- State preservation during navigation
- Breadcrumb navigation

### 7.2 Data Consistency

- Real-time updates across sections
- Conflict resolution for simultaneous edits
- Data validation at entry and exit points
- Automatic sync with backend
- Offline capability (future)

### 7.3 Error Handling

- User-friendly error messages
- Retry mechanisms
- Graceful degradation
- Error logging and reporting
- Recovery suggestions

### 7.4 Notifications

- Toast notifications for actions
- Persistent notifications for important events
- Sound alerts for urgent items (configurable)
- Do not disturb mode support
- Notification preferences per category

---

## 8. IMPLEMENTATION TIMELINE

**Phase 2 Development Order (Recommended):**

1. **Week 1-2:** Home Section
2. **Week 3-4:** Projects Section  
3. **Week 5-6:** Files Section (Backend integration)
4. **Week 7:** Launchpad Enhancements
5. **Week 8-9:** User Control Section
6. **Week 10-11:** Integration & Testing

**Phase 3-4:** Advanced features and optimizations

---

## APPENDIX: UI COMPONENT GUIDELINES

### Status Badge Colors
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)
- Info: Blue (#3B82F6)
- Neutral: Gray (#6B7280)

### Icon Sizing
- Small (16px): Inline text icons
- Medium (24px): Component icons
- Large (32px): Card headers
- XL (48px): Page headers

### Spacing Standards
- Micro: 4px (internal component padding)
- Compact: 8px (between adjacent elements)
- Normal: 12-16px (default spacing)
- Spacious: 24-32px (section breaks)

---

**Document prepared for:** Development Team  
**Approval Status:** Pending technical review  
**Next Review:** Monthly during development phase

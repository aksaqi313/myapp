# Project Report — Azhar Khan Portfolio App

> **Audit Date**: 2026-07-18
> **Reviewed By**: Senior Full-Stack Architect
> **Stack**: React 18 · Vite 4 · Context API · localStorage · Vanilla CSS

---

## 1. Project Overview

This is a **personal portfolio website** for Azhar Khan, a Full-Stack Developer and IoT Engineer.
The application is a **React Single-Page Application (SPA)** built with Vite, featuring:

- A public-facing portfolio site (Home, About, Projects, Blogs, Services, Contact)
- An admin panel for CMS-style content management (no backend — data stored in browser `localStorage`)
- Dark/Light theme toggling with CSS custom properties
- An advanced `ImagePicker` component supporting file upload, URL paste, and Google Drive links with crop functionality

The project is **frontend-only** — there is no backend server, database, or API. All data
persistence is achieved through `localStorage` via React Context.

---

## 2. Folder Structure

```
myapp/
├── index.html                    # HTML entry point (missing SEO meta tags)
├── vite.config.js                # Vite config (has hardcoded machine path - BUG)
├── package.json                  # Dependencies (missing metadata fields)
├── missing.md                    # This audit - gap analysis
├── project_report.md             # This file
│
└── src/
    ├── App.jsx                   # Router - MISSING several routes
    ├── main.jsx                  # React entry point (clean)
    ├── index.css                 # Design system tokens + utilities (solid)
    │
    ├── context/
    │   ├── AppContext.jsx         # Global state: about/projects/blogs/services/messages CRUD
    │   └── ThemeContext.jsx       # Dark/Light mode toggle
    │
    ├── utils/
    │   └── cropImage.js          # Canvas-based image crop utility (solid)
    │
    ├── user/                     # Public-facing pages (all active and routed)
    │   ├── Home.jsx              # Landing page (minimal - could be expanded)
    │   ├── About.jsx             # Dynamic About (reads from AppContext)
    │   ├── Projects.jsx          # Projects grid with hover cards
    │   ├── Blogs.jsx             # Blog list + inline markdown preview
    │   ├── BlogArticle.jsx       # Full article with markdown renderer
    │   ├── Services.jsx          # Services grid (minimal)
    │   └── Contact.jsx           # Contact form (saves to AppContext messages)
    │
    ├── admin/                    # Admin panel (all active and routed)
    │   ├── AdminLayout.jsx       # Sidebar + main layout wrapper
    │   ├── AdminDashboard.jsx    # Stats overview + recent messages
    │   ├── AdminAbout.jsx        # Edit about page content + photo
    │   ├── AdminProjects.jsx     # Projects CRUD with image picker
    │   ├── AdminBlogs.jsx        # Blog CRUD with status/scheduling
    │   ├── AdminServices.jsx     # Services CRUD with emoji icons
    │   └── AdminMessages.jsx     # View/delete contact form messages
    │
    └── components/               # Shared components + MANY UNUSED FILES
        ├── Header.jsx            # Navigation (no mobile menu - BUG)
        ├── Footer.jsx            # Footer (correctly hides on admin routes)
        ├── ImagePicker.jsx       # Multi-source image picker with crop
        ├── AdminLogin.jsx        # Admin auth (HARDCODED CREDENTIALS - CRITICAL)
        ├── UserLogin.jsx         # User auth with login/signup/forgot modes
        ├── UserDashboard.jsx     # User dashboard (ORPHANED - not in router)
        ├── ForgotPassword.jsx    # Password reset UI (ORPHANED - not in router)
        ├── Login.jsx             # DUPLICATE/ORPHANED - not in router
        ├── Signup.jsx            # ORPHANED - not in router
        ├── Auth.jsx              # DUPLICATE of UserLogin - DEAD CODE
        ├── About.jsx             # DUPLICATE of user/About - DEAD CODE
        ├── Blogs.jsx             # DUPLICATE of user/Blogs - DEAD CODE
        ├── Contact.jsx           # DUPLICATE of user/Contact - DEAD CODE
        ├── Hero.jsx              # ORPHANED - not used anywhere
        ├── Projects.jsx          # DUPLICATE of user/Projects - DEAD CODE
        ├── Services.jsx          # DUPLICATE of user/Services - DEAD CODE
        └── AdminDashboard.jsx    # DUPLICATE of admin/AdminDashboard - DEAD CODE
```

---

## 3. Completed Features

### Public Portfolio

| Feature | Status | Notes |
|---------|--------|-------|
| Home / Hero Section | DONE | Minimal but functional |
| About Page | DONE | Dynamic — reads from AppContext |
| Projects Page | DONE | Grid with hover effects, image support |
| Blog List | DONE | Markdown preview, category badges, date filtering |
| Blog Article | DONE | Full markdown renderer, cover image hero |
| Services Page | DONE | Dynamic grid with icon/image support |
| Contact Form | DONE | Saves messages to localStorage |
| Dark/Light Theme | DONE | CSS custom properties, persisted |
| Responsive Design | PARTIAL | CSS media queries for section, not header |

### Admin Panel

| Feature | Status | Notes |
|---------|--------|-------|
| Admin Login | DONE (INSECURE) | Hardcoded credentials |
| Dashboard Overview | DONE | Stats + recent messages |
| Admin Sidebar | DONE | Active nav highlighting |
| Edit About Page | DONE | Photo, bio, skills, identity |
| Manage Projects | DONE | Add/Edit/Delete/Hide with image picker |
| Manage Blog Posts | DONE | Add/Edit/Delete/Hide, draft/published status, scheduling |
| Manage Services | DONE | Add/Edit/Delete/Hide with emoji icons |
| View Messages | DONE | Read/Unread/Delete, Reply via mailto |

### Technical

| Feature | Status | Notes |
|---------|--------|-------|
| Context API State Management | DONE | Clean, covers all entities |
| localStorage Persistence | DONE | Auto-sync via useEffect |
| ImagePicker Component | DONE | PC upload, URL, Google Drive, crop |
| Markdown Renderer | DONE | Inline bold/code, blocks, lists |
| CSS Design System | DONE | CSS variables, glassmorphism, animations |
| Google Fonts (Inter) | DONE | Loaded via @import |
| Vite Build Tooling | DONE | Fast HMR |

---

## 4. Missing Features

See `missing.md` for the complete detailed breakdown.

### Quick Summary (28 total items)

| Priority | Count | Key Items |
|----------|-------|-----------|
| Critical | 3 | Hardcoded credentials, No auth guard, No .env |
| High | 7 | Missing routes (dashboard, 404, forgot-password, signup), dead code, no validation |
| Medium | 9 | No mobile nav, no SEO, DRY violations, no error boundary, no a11y |
| Low | 9 | No propTypes, no namespaced keys, no gitignore, no custom favicon |

---

## 5. Bugs Found

### Bug 1 — CRITICAL: Hardcoded Admin Password in Source Code
- **File**: `src/components/AdminLogin.jsx` line 13
- **Issue**: `email === 'aksaqi313@gmail.com' && password === '1122'` is visible in browser DevTools
- **Fix**: Use `import.meta.env.VITE_ADMIN_EMAIL` and `import.meta.env.VITE_ADMIN_PASS`

### Bug 2 — HIGH: User Dashboard Route Not Registered
- **File**: `src/App.jsx`
- **Issue**: `UserLogin.jsx` navigates to `/user/dashboard` but no route exists. Results in blank page.
- **Fix**: Add `<Route path="/user/dashboard" element={<UserDashboard />} />`

### Bug 3 — HIGH: ForgotPassword / Login / Signup Not Routed
- **File**: `src/App.jsx`
- **Issue**: `Login.jsx` links to `/forgot-password` and `/signup`, these routes don't exist.
- **Fix**: Register all three routes in `App.jsx`

### Bug 4 — MEDIUM: vite.config.js Has Machine-Specific Path
- **File**: `vite.config.js` line 11
- **Issue**: `fs.allow` contains `C:/Users/admin/.gemini/...` — breaks on other machines
- **Fix**: Remove that path entry

### Bug 5 — MEDIUM: No 404 Handler
- **File**: `src/App.jsx`
- **Issue**: Unknown routes render blank space between Header and Footer
- **Fix**: Add `<Route path="*" element={<NotFound />} />`

### Bug 6 — MEDIUM: UserLogin Exposes Credentials in Error
- **File**: `src/components/UserLogin.jsx` line 17
- **Issue**: Error message text includes `user@portfolio.com / user123`
- **Fix**: Generic error message: "Invalid email or password."

### Bug 7 — LOW: `renderContent`/`renderInline` Code Duplication
- **Files**: `src/user/Blogs.jsx` and `src/user/BlogArticle.jsx`
- **Issue**: ~130 lines of identical code duplicated between two files
- **Fix**: Extract to `src/utils/markdownRenderer.jsx`

---

## 6. Code Quality Score

| Category | Score | Notes |
|----------|-------|-------|
| Architecture | 7/10 | Clean separation of concerns, good use of Context |
| Component Design | 6/10 | Good reusable components, but many duplicate/orphaned files |
| Code Readability | 8/10 | Clean, well-commented code throughout |
| DRY Principle | 5/10 | `renderContent` duplicated; inline styles repeated in many components |
| State Management | 8/10 | Efficient Context + localStorage pattern |
| Error Handling | 4/10 | No Error Boundary, minimal form validation |
| TypeScript/PropTypes | 2/10 | No type safety whatsoever |
| **Overall** | **6/10** | Solid foundation with critical gaps |

---

## 7. Security Score

| Category | Score | Notes |
|----------|-------|-------|
| Authentication | 2/10 | Hardcoded credentials in source, no real auth |
| Authorization | 1/10 | No route guards — admin routes fully public |
| Input Validation | 4/10 | Only browser-native HTML5 validation |
| Data Storage | 5/10 | localStorage is appropriate for this use-case |
| Secrets Management | 1/10 | No .env, no environment variable usage |
| XSS Prevention | 7/10 | React JSX escapes by default; no dangerouslySetInnerHTML |
| **Overall** | **3/10** | Critically insecure for any real deployment |

---

## 8. Performance Score

| Category | Score | Notes |
|----------|-------|-------|
| Bundle Size | 7/10 | Minimal dependencies (react, react-dom, react-router, react-icons, react-easy-crop) |
| Scroll Handling | 5/10 | No throttle/debounce on scroll listener |
| Image Optimization | 6/10 | Images stored as base64 in localStorage (large payloads) |
| Re-renders | 7/10 | Context re-renders are appropriately scoped |
| Code Splitting | 4/10 | No lazy loading / React.lazy for route-level splitting |
| CSS Performance | 8/10 | CSS variables, minimal inline styles |
| **Overall** | **6/10** | Acceptable for portfolio-scale, needs lazy loading for growth |

---

## 9. Scalability Score

| Category | Score | Notes |
|----------|-------|-------|
| Data Layer | 3/10 | localStorage limit ~5-10MB — will hit limits with many images |
| State Architecture | 6/10 | Context works at this scale; would need Redux/Zustand for larger apps |
| Component Reusability | 6/10 | Good reusable components (ImagePicker, AdminLayout) |
| Backend Readiness | 3/10 | No API layer, no axios/fetch abstraction |
| Routing | 6/10 | React Router v6 is correctly set up |
| **Overall** | **5/10** | localStorage + Context is not scalable beyond personal use |

---

## 10. Recommendations

### Immediate (This Week)

1. **Fix the security critical bugs**: Move admin credentials to `.env`
2. **Add ProtectedRoute**: Prevent unauthenticated admin access
3. **Register missing routes**: `/user/dashboard`, `/login`, `/signup`, `/forgot-password`, `*` (404)
4. **Fix vite.config.js**: Remove hardcoded machine path

### Short-Term (This Month)

5. **Add mobile hamburger menu** to `Header.jsx`
6. **Add Error Boundary** to App.jsx
7. **Extract markdown renderer** to shared utility (DRY)
8. **Add per-page SEO titles** via `document.title` in useEffect
9. **Clean up dead code**: Delete orphaned components from `src/components/`
10. **Add unread badge** to admin sidebar Messages link
11. **Fix UserLogin error message** (remove credential hints)

### Medium-Term (Next Quarter)

12. **Add a real backend**: Express + MongoDB/PostgreSQL, replace localStorage
13. **Implement JWT authentication**: Proper login/logout/refresh flow
14. **Add lazy loading**: `React.lazy()` + `Suspense` for route-level code splitting
15. **Add TypeScript**: Start with context files and ImagePicker
16. **Add react-helmet-async**: Proper SEO meta tags per page
17. **Add form validation library**: Zod or Yup for schema-based validation
18. **Add image CDN**: Instead of base64 in localStorage, upload to Cloudinary or S3

---

## 11. Next Development Roadmap

### Phase 1 — Security & Stability (Week 1-2)
- [ ] Create `.env` / `.env.example` with VITE_ variables
- [ ] Create `AuthContext.jsx` with `isAdminAuth` state + login/logout
- [ ] Create `ProtectedRoute.jsx`
- [ ] Fix `AdminLogin.jsx` to use env vars
- [ ] Fix `vite.config.js`
- [ ] Add `/user/dashboard`, `/login`, `/signup`, `/forgot-password`, `*` routes
- [ ] Create `NotFound.jsx`
- [ ] Fix UserLogin error message

### Phase 2 — UX & Quality (Week 3-4)
- [ ] Add hamburger menu to `Header.jsx` (mobile responsive)
- [ ] Create `ErrorBoundary.jsx`
- [ ] Extract `markdownRenderer.jsx` utility
- [ ] Add unread badge to admin sidebar
- [ ] Add per-page `document.title` to all pages
- [ ] Add contact form validation (max lengths, phone regex)
- [ ] Add `aria-label` to all icon-only buttons and modals
- [ ] Delete dead/orphaned component files

### Phase 3 — Backend Integration (Month 2)
- [ ] Initialize Express.js backend in `/server` directory
- [ ] Create MongoDB models: User, Project, Blog, Service, Message
- [ ] Implement JWT authentication (login, refresh, logout)
- [ ] Create REST API endpoints for all entities
- [ ] Replace localStorage reads with `axios` / `fetch` API calls
- [ ] Add `react-query` or `SWR` for server state management
- [ ] Add image upload to Cloudinary (replace base64 storage)

### Phase 4 — Polish & Deploy (Month 3)
- [ ] Add React.lazy + Suspense for route splitting
- [ ] Install and configure react-helmet-async for SEO
- [ ] Add Zod schema validation to all forms (frontend + backend)
- [ ] Add custom favicon (AK monogram)
- [ ] Create proper `.gitignore`
- [ ] Set up CI/CD pipeline (GitHub Actions)
- [ ] Deploy frontend to Vercel/Netlify, backend to Railway/Render

---

## 12. Files Inventory

### Files That Are Active and Working
| File | Role | Quality |
|------|------|---------|
| `src/App.jsx` | Router | Good (missing routes) |
| `src/main.jsx` | Entry | Good |
| `src/index.css` | Design System | Excellent |
| `src/context/AppContext.jsx` | Global State | Excellent |
| `src/context/ThemeContext.jsx` | Theme | Good |
| `src/utils/cropImage.js` | Image Utility | Good |
| `src/components/Header.jsx` | Layout | Good (no mobile) |
| `src/components/Footer.jsx` | Layout | Excellent |
| `src/components/ImagePicker.jsx` | Reusable | Excellent |
| `src/components/AdminLogin.jsx` | Auth | Good (insecure) |
| `src/components/UserLogin.jsx` | Auth | Good (minor issues) |
| `src/admin/AdminLayout.jsx` | Layout | Good |
| `src/admin/AdminDashboard.jsx` | Admin | Good |
| `src/admin/AdminAbout.jsx` | Admin | Excellent |
| `src/admin/AdminBlogs.jsx` | Admin | Excellent |
| `src/admin/AdminProjects.jsx` | Admin | Excellent |
| `src/admin/AdminServices.jsx` | Admin | Good |
| `src/admin/AdminMessages.jsx` | Admin | Good |
| `src/user/Home.jsx` | Public | Minimal |
| `src/user/About.jsx` | Public | Good |
| `src/user/Projects.jsx` | Public | Excellent |
| `src/user/Blogs.jsx` | Public | Excellent |
| `src/user/BlogArticle.jsx` | Public | Excellent |
| `src/user/Services.jsx` | Public | Minimal |
| `src/user/Contact.jsx` | Public | Good |

### Dead / Orphaned Files (Should Be Cleaned Up)
| File | Issue |
|------|-------|
| `src/components/About.jsx` | Superseded by `src/user/About.jsx` |
| `src/components/Blogs.jsx` | Superseded by `src/user/Blogs.jsx` |
| `src/components/Contact.jsx` | Superseded by `src/user/Contact.jsx` |
| `src/components/Hero.jsx` | Not used anywhere |
| `src/components/Projects.jsx` | Superseded by `src/user/Projects.jsx` |
| `src/components/Services.jsx` | Superseded by `src/user/Services.jsx` |
| `src/components/Auth.jsx` | Superseded by `UserLogin.jsx` |
| `src/components/AdminDashboard.jsx` | Superseded by `src/admin/AdminDashboard.jsx` |

### Files That Need Routing (Exist But Not Registered in Router)
| File | Missing Route |
|------|---------------|
| `src/components/UserDashboard.jsx` | `/user/dashboard` |
| `src/components/Login.jsx` | `/login` |
| `src/components/Signup.jsx` | `/signup` |
| `src/components/ForgotPassword.jsx` | `/forgot-password` |

### Files That Need to Be Created
| File | Purpose | Priority |
|------|---------|----------|
| `.env` | Environment variables | Critical |
| `.env.example` | Documented env template | Critical |
| `src/components/ProtectedRoute.jsx` | Admin route guard | Critical |
| `src/user/NotFound.jsx` | 404 page | High |
| `src/context/AuthContext.jsx` | Auth state management | High |
| `src/utils/markdownRenderer.jsx` | Shared markdown utility | Medium |
| `src/components/ErrorBoundary.jsx` | App crash safety net | Medium |
| `src/components/Spinner.jsx` | Loading indicator | Medium |
| `.gitignore` | Git ignore rules | Low |

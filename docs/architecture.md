# FOKUS.BASE System Architecture

## Overview
FOKUS.BASE is a private, self-hosted web-based knowledge base designed for internal company use. The system combines structured articles, version history, full-text search, cross-linking, categories, templates, and discussion threads with an Apple-inspired premium user experience.

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + @headlessui/react
- **Animations**: Framer Motion + use-sound
- **3D Visualization**: Three.js + @react-three/fiber (optional)
- **State Management**: React Context API
- **Forms**: React Hook Form
- **Data Fetching**: SWR or React Query

### Backend
- **Framework**: NestJS (Node.js)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Passport.js with OAuth2 + SSO support
- **API**: RESTful API with OpenAPI/Swagger documentation
- **Real-time**: Socket.IO (for collaborative features)

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Reverse Proxy**: Nginx
- **Database**: PostgreSQL
- **Search Engine**: Elasticsearch (optional, for advanced search)
- **File Storage**: Local storage with optional S3-compatible support
- **Caching**: Redis

## System Components

### 1. Authentication & Authorization
- OAuth2 integration (Google Workspace, Azure AD)
- Local authentication fallback
- Role-Based Access Control (RBAC)
- Session management with JWT

### 2. Content Management
- Article creation/editing (WYSIWYG + Markdown)
- Version history with diff visualization
- Categories and tagging system
- Templates for standardized content
- Discussion threads per article

### 3. Search & Discovery
- Full-text search with Elasticsearch integration
- Tag-based filtering
- Cross-linking between articles
- AI-powered suggestions and auto-tagging

### 4. User Interface
- Apple-inspired design (macOS Sonoma / VisionOS aesthetic)
- Frosted glass panels and subtle depth effects
- Smooth animations and micro-interactions
- Responsive design for all device sizes
- Dark/light mode with OS sync

### 5. Admin Features
- User and group management
- Audit logging
- Bulk import/export (Markdown, Notion, Confluence)
- System monitoring and status

### 6. Optional Features
- 3D Knowledge Graph visualization
- AI-assisted writing features
- Smart dashboard with personalized feeds

## Data Model

### Core Entities
1. **User**
   - id (UUID)
   - email (string)
   - name (string)
   - role (enum: admin, editor, viewer)
   - provider (enum: local, google, azure)
   - createdAt (timestamp)
   - updatedAt (timestamp)

2. **Article**
   - id (UUID)
   - title (string)
   - content (text)
   - slug (string)
   - status (enum: draft, published, archived)
   - authorId (UUID) → User
   - categoryId (UUID) → Category
   - createdAt (timestamp)
   - updatedAt (timestamp)

3. **Version**
   - id (UUID)
   - articleId (UUID) → Article
   - content (text)
   - authorId (UUID) → User
   - createdAt (timestamp)

4. **Category**
   - id (UUID)
   - name (string)
   - description (text)
   - parentId (UUID) → Category (for nested categories)
   - createdAt (timestamp)

5. **Tag**
   - id (UUID)
   - name (string)
   - color (string)

6. **ArticleTag** (Many-to-Many relationship)
   - articleId (UUID) → Article
   - tagId (UUID) → Tag

7. **Comment**
   - id (UUID)
   - articleId (UUID) → Article
   - authorId (UUID) → User
   - content (text)
   - parentId (UUID) → Comment (for nested replies)
   - createdAt (timestamp)

## API Endpoints

### Authentication
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/refresh

### Users
- GET /api/users
- GET /api/users/:id
- PUT /api/users/:id
- DELETE /api/users/:id

### Articles
- GET /api/articles
- GET /api/articles/:id
- POST /api/articles
- PUT /api/articles/:id
- DELETE /api/articles/:id
- GET /api/articles/:id/versions
- GET /api/articles/:id/comments

### Categories
- GET /api/categories
- POST /api/categories
- PUT /api/categories/:id
- DELETE /api/categories/:id

### Tags
- GET /api/tags
- POST /api/tags
- PUT /api/tags/:id
- DELETE /api/tags/:id

### Search
- GET /api/search?q=:query

## Deployment

### Docker Setup
The application is containerized using Docker with the following services:
1. Next.js frontend
2. NestJS backend
3. PostgreSQL database
4. Redis cache
5. Nginx reverse proxy

### Environment Variables
- DATABASE_URL: PostgreSQL connection string
- JWT_SECRET: Secret for JWT token signing
- OAUTH_GOOGLE_ID: Google OAuth client ID
- OAUTH_GOOGLE_SECRET: Google OAuth client secret
- OAUTH_AZURE_ID: Azure AD client ID
- OAUTH_AZURE_SECRET: Azure AD client secret

## Security Considerations
- HTTPS enforcement
- CSRF protection
- Rate limiting
- Input validation and sanitization
- Secure headers (Helmet.js)
- Password hashing with bcrypt
- JWT token expiration and refresh

## Performance Optimization
- Database indexing
- Caching with Redis
- CDN for static assets
- Code splitting and lazy loading
- Image optimization
- Database connection pooling

## Future Enhancements
- Real-time collaboration features
- Advanced AI integration (NLP for content analysis)
- Mobile application
- Offline support with service workers
- Advanced analytics dashboard
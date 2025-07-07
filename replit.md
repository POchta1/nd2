# English School Website - replit.md

## Overview

This is a full-stack web application for an English language school built with React, Express, TypeScript, and PostgreSQL. The application features a modern marketing website with contact form functionality, built using a monorepo structure with separate client and server directories.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animation**: Framer Motion for smooth animations
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: In-memory storage (MemStorage class)
- **Development**: Hot reload with Vite middleware integration

### UI Component System
- **Design System**: shadcn/ui components built on Radix UI primitives
- **Typography**: Montserrat and Inter fonts from Google Fonts
- **Icons**: Font Awesome 6.5.0
- **Theme**: Custom CSS variables with light/dark mode support
- **Responsive**: Mobile-first responsive design

## Key Components

### Client-Side Components
1. **Header**: Navigation with smooth scrolling and mobile menu
2. **Hero**: Landing section with animated elements and call-to-action
3. **About**: School information and teacher profiles
4. **Programs**: Course offerings with pricing calculator
5. **Testimonials**: Student reviews and success stories
6. **Blog**: Educational content and articles
7. **FAQ**: Collapsible frequently asked questions
8. **Contact**: Form submission with validation
9. **Footer**: Site links and contact information

### Server-Side Modules
1. **Routes**: API endpoints for contact form submission
2. **Storage**: Database abstraction layer (currently in-memory, ready for PostgreSQL)
3. **Vite Integration**: Development server with HMR support

### Database Schema
- **Users Table**: Basic user structure with username/password (expandable)
- **Contact Submissions**: Ready for implementation (currently logged to console)

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **API Processing**: Express routes handle form submissions with Zod validation
3. **Data Storage**: Currently uses in-memory storage, configured for PostgreSQL migration
4. **Response Handling**: Standardized JSON responses with error handling
5. **UI Updates**: Toast notifications and form state management

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **framer-motion**: Animation library
- **wouter**: Lightweight routing
- **zod**: Runtime type validation

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Type safety
- **tsx**: TypeScript execution
- **esbuild**: Fast bundling for production

## Deployment Strategy

### Build Process
1. **Client Build**: Vite builds React app to `dist/public`
2. **Server Build**: esbuild bundles Express server to `dist/index.js`
3. **Static Assets**: Client assets served from server in production

### Environment Configuration
- **Development**: `npm run dev` - runs server with Vite middleware
- **Production**: `npm run build && npm run start` - builds and serves static files
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL

### Deployment Targets
- **Replit**: Configured for autoscale deployment
- **Port Configuration**: Server runs on port 5000, external port 80
- **Database**: Uses Neon serverless PostgreSQL

## Changelog
- July 7, 2025: Migration to Replit and AI enhancements
  - Successfully migrated project from Replit Agent to standard Replit environment
  - Fixed AI chatbot response handling and JSON parsing
  - Enhanced AI consultant system to conduct full questionnaires autonomously
  - Added detailed program descriptions with student achievements and school statistics
  - Improved AI prompting with structured consultation flow
  - Removed frontend questionnaire logic, delegating all conversation to AI
  - Implemented AI-powered course registration system with PostgreSQL database
  - Added automatic registration functionality - AI can now register users directly
  - Created course_registrations table with full student data tracking
  - Updated teacher photos per user request (replaced Michael Johnson with Dmitry Kozlov)
- June 26, 2025: Major AI integration and multimedia enhancements
  - Added video background with American cities (LA, Miami) in hero section
  - Implemented AI chatbot with OpenAI integration for personalized course recommendations
  - Replaced Google Maps with Yandex Maps in contact section
  - Fixed teacher avatar image in About section
  - Added floating chat button alongside existing phone button
  - Created intelligent pre-screening flow before AI engagement to save tokens
- June 25, 2025: Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.
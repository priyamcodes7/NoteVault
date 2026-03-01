# NoteVault

NoteVault is a secure and structured note management application built to demonstrate full-stack integration using modern web technologies.  
It focuses on authentication, user-specific data storage, and clean UI architecture.

---

## Tech Stack and Rationale

### Vite
Used as the frontend build tool.
- Provides fast development server
- Optimized production builds
- Minimal configuration

### React
Used for building the user interface.
- Component-based architecture
- Reusable UI logic
- Efficient state-driven rendering

### TypeScript
Used for type safety.
- Reduces runtime errors
- Improves maintainability
- Better development experience

### Supabase
Used as Backend-as-a-Service.
- Authentication system
- PostgreSQL database
- Secure user-specific data handling
- Eliminates need for custom backend server

### Tailwind CSS
Used for styling.
- Utility-first CSS approach
- Rapid UI development
- Responsive design support

### shadcn/ui
Used for UI components.
- Prebuilt accessible components
- Clean and modern interface
- Reduces design complexity

---

## Architecture Overview

### Frontend
- React with TypeScript
- Component-driven structure
- Tailwind-based styling

### Backend
- Supabase Authentication
- Supabase PostgreSQL database
- Secure user-based data isolation

### Application Flow
1. User signs up or logs in.
2. Supabase handles authentication.
3. Notes are stored in the database.
4. Data is fetched per authenticated user.
5. UI updates dynamically based on state.

---

## Features

- User registration and login
- Secure note storage
- User-specific data isolation
- Create notes
- Edit notes
- Delete notes
- Responsive and minimal interface

---

## Future Improvements

- Folder-based note organization
- Tag filtering
- Markdown support
- End-to-end encryption
- AI-based summarization
- Export and backup functionality

---

## Purpose of the Project

This project demonstrates:

- Full-stack application development
- Secure authentication handling
- Database integration
- Clean and scalable frontend architecture
- Production-ready structure suitable for hackathons and portfolios

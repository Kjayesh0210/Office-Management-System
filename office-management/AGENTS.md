# AGENTS.md
## Project
Office Management System built with Next.js.
## Primary Goal
Build a production-ready, scalable, maintainable, and optimized full-stack application following modern Next.js best practices.
# Tech Stack
## Core
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- MongoDB
- Mongoose
## Runtime
- Node.js
---
# Project Structure
Use the default Next.js project structure.
```
src/
├── app/
├── components/
├── hooks/
├── lib/
├── types/
├── utils/
├── middleware.ts
└── ...
```
Do **not** create separate frontend and backend folders.
Backend logic should be implemented using:
- Route Handlers (`src/app/api`)
- Server Actions where appropriate
---
# Coding Principles
Always prefer:
- Clean code
- Readable code
- Optimized code
- Modular architecture
- Maintainable code
- Scalable architecture
Avoid unnecessary complexity.
Never over-engineer a solution.
---
# TypeScript
- Use strict typing.
- Avoid `any` unless absolutely unavoidable.
- Prefer interfaces and reusable types.
- Keep types organized.
---
# React
- Prefer Server Components.
- Use Client Components only when required.
- Avoid unnecessary re-renders.
- Do not prematurely optimize with `useMemo`, `useCallback`, or `React.memo`.
- Assume React Compiler is available when appropriate.
---
# Next.js
Always follow App Router best practices.
Prefer:
- Server Actions
- Route Handlers
- Dynamic rendering only when required
- Built-in Next.js features before third-party packages
---
# API Design
- Use RESTful APIs.
- Validate incoming data.
- Return proper HTTP status codes.
- Implement proper error handling.
- Keep controllers/routes thin.
- Move business logic into reusable functions.
---
# Database
Use MongoDB with Mongoose.
Guidelines:
- Reuse database connections.
- Keep schemas organized.
- Avoid duplicate queries.
- Write efficient database operations.
---
# Styling
Use Tailwind CSS exclusively.
Guidelines:
- Keep UI clean.
- Build reusable components.
- Maintain consistent spacing.
- Prefer utility classes over custom CSS.
Avoid inline styles unless absolutely necessary.
---
# Performance
Always consider:
- Performance
- Scalability
- Code reuse
- Bundle size
- Efficient rendering
- Efficient database queries
Do not optimize prematurely, but avoid obviously inefficient implementations.
---
# Dependencies
Before introducing a new package:
- Prefer built-in Next.js or React functionality.
- Only install dependencies that provide significant value.
- Avoid dependency bloat.
---
# Folder Organization
As the project grows, organize code into logical folders.
Example:
```
src/
├── app/
├── components/
├── lib/
├── hooks/
├── services/
├── models/
├── types/
├── utils/
├── actions/
└── middleware.ts
```
---
# Code Quality
Write code as if it will be maintained for years.
Prefer:
- Small reusable functions
- Descriptive names
- Single Responsibility Principle
- DRY (Don't Repeat Yourself)
- Consistent formatting
Avoid:
- Duplicate logic
- Magic numbers
- Deeply nested code
- Unnecessary comments
Code should be self-explanatory whenever possible.
---
# Communication
When suggesting implementations:
- Explain trade-offs when multiple good solutions exist.
- Recommend the simplest solution that satisfies the requirements.
- Do not overcomplicate the architecture.
When writing code:
- Produce complete, production-ready code.
- Follow existing project conventions.
- Keep consistency throughout the codebase.
---
# Future Features
The project may eventually include:
- Authentication
- Role-Based Access Control (RBAC)
- Employee Management
- Attendance
- Payroll
- Leave Management
- Task Management
- File Uploads
- Dashboard Analytics
- Notifications
- Real-time notifications (using a dedicated real-time service if needed)
Design new code with future scalability in mind without implementing unnecessary abstractions.
# Decision Making

When multiple valid approaches exist:

1. Prefer the official Next.js recommendation.
2. Prefer simplicity over cleverness.
3. Prefer long-term maintainability over short-term convenience.
4. Explain why a particular approach was chosen if there are significant trade-offs.

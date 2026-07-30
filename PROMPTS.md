# PROMPTS.md

# Car Dealership & Inventory Management System — AI Tooling & Prompt History

This document provides a complete, chronological record of the prompts used during the design, development, debugging, testing, and deployment of the **Car Dealership & Inventory Management System**. It reflects how AI tools were used as intelligent assistants to accelerate boilerplate setup, architecture design, error resolution, test generation, and documentation—while the developer led the implementation, logic validation, code integration, and overall quality assurance.

---

## AI Tools Used

- **ChatGPT (OpenAI)**: Primary architectural guide, API contract design, schema generation, debugging partner, and README authoring.
- **Google Gemini**: Refactoring React component structures, styling optimizations with Tailwind CSS v4, and code quality reviews.
- **Blackbox AI**: Quick troubleshooting for specific syntax issues, regex validation, and Jest test runner edge cases.

---

## AI Usage Overview

AI assistance was strategically integrated across all major phases of development:

1. **System Architecture & Planning**: Formulating clean folder structure, database collection design, and API endpoint contracts.
2. **Backend Development**: Generating base Express routers, Mongoose schemas, JWT authentication middleware, and validation rules.
3. **Frontend Development**: Designing modular React 18 components, UI dialogs, context state management, and Tailwind CSS v4 layouts.
4. **Debugging & Problem Solving**: Resolving CORS issues, database connection timeouts, React state synchronization bugs, and test assertion failures.
5. **Testing & QA**: Constructing Jest and Supertest suites to achieve full test coverage across authentication and vehicle CRUD endpoints.
6. **Deployment & Documentation**: Configuring build scripts, Netlify/Render deployment settings, and crafting visual README documentation.

---

## Development Prompt History

---

### Prompt 1
> "This is requirement specification document for a project I have to create for a Car Dealership Inventory System. Guide me throughout the project. I need to complete this in a tight deadline of 1 day. Guide me accordingly and follow a professional workflow similar to software industry standards."

### Purpose
To break down the assignment scope into structured, manageable phases and establish a realistic 1-day execution timeline.

---

### Prompt 2
> "Design a clean, production-ready folder structure for a full-stack Car Dealership Inventory System using React 18 (Vite), Express.js 5, Node.js, and MongoDB. Separate frontend and backend cleanly with proper separation of concerns (controllers, services, routes, models, middleware, components, context)."

### Purpose
To organize the codebase according to industry best practices before writing any code.

---

### Prompt 3
> "Design Mongoose schemas for User and Vehicle collections. User should support roles ('admin', 'customer') and hashed passwords. Vehicle should store make, model, year, price, mileage, fuelType, transmission, status ('Available', 'Sold'), description, and imageUrl."

### Purpose
To establish scalable, strongly-typed MongoDB data models for inventory items and user authentication.

---

### Prompt 4
> "Implement JWT Authentication in Express using bcrypt for password hashing and jsonwebtoken for token generation. Create an authentication middleware (`authMiddleware`) that verifies the JWT token from the Authorization header and checks for admin privileges."

### Purpose
To construct secure authentication and Role-Based Access Control (RBAC) on the backend.

---

### Prompt 5
> "Generate REST API endpoints for `/api/auth/register` and `/api/auth/login` with express-validator to validate email format, password minimum length, and required user fields."

### Purpose
To build backend user registration and login endpoints with input validation.

---

### Prompt 6
> "Create RESTful CRUD endpoints for `/api/vehicles`. Public users can view available vehicles, while only logged-in Admins can create, edit, or delete vehicle listings. Include proper error handling."

### Purpose
To implement core inventory management business logic on the backend.

---

### Prompt 7
> "I'm getting a MongoDB connection error when running `npm run dev` in the backend: `MongoServerSelectionError: connection timed out`. How do I resolve this connection issue with MongoDB Atlas?"

### Purpose
To debug database connection timeouts caused by missing IP whitelist rules in MongoDB Atlas.

---

### Prompt 8
> "Implement search and filter query logic in the `GET /api/vehicles` endpoint. Users should be able to filter by make, model, min/max price range, year, and status."

### Purpose
To implement flexible backend search and filtering functionality for the vehicle inventory catalog.

---

### Prompt 9
> "Create a vehicle purchase API endpoint `POST /api/vehicles/:id/purchase`. It should check if the vehicle is available, mark it as 'Sold', and return the updated vehicle record. If already sold, return a 400 Bad Request."

### Purpose
To build the transaction business logic and inventory status validation.

---

### Prompt 10
> "I am setting up Vite + React with Tailwind CSS v4 in the frontend. When starting Vite, `@import "tailwindcss";` throws an unhandled post-css import error. How should I correctly configure Tailwind CSS v4 with Vite?"

### Purpose
To resolve build errors related to the setup of Tailwind CSS v4 with `@tailwindcss/vite`.

---

### Prompt 11
> "Design a React frontend architecture that aligns with our Express backend. How should I structure components, services (Axios instance with auth interceptors), context (AuthContext), and page routes?"

### Purpose
To plan modular frontend state management, API services, and page navigation.

---

### Prompt 12
> "Create an AuthContext in React that handles user login, registration, token persistence in `localStorage`, and sets the default Authorization header on Axios requests."

### Purpose
To manage user authentication state across the React application seamlessly.

---

### Prompt 13
> "When fetching data from `http://localhost:5000/api/vehicles` in React running on `http://localhost:5173`, I am getting a CORS error in the browser console: `Access to XMLHttpRequest at '...' from origin 'http://localhost:5173' has been blocked by CORS policy`. How do I fix this in Express?"

### Purpose
To resolve Cross-Origin Resource Sharing (CORS) issues between the Vite development client and Express API server.

---

### Prompt 14
> "Generate React components for Login and Register pages using Tailwind CSS. Include form validation, loading states, and error alerts when credentials are invalid."

### Purpose
To build intuitive, responsive authentication interfaces for users.

---

### Prompt 15
> "Create a main Dashboard component for displaying vehicle cards in a grid layout. Add search bars, filter dropdowns for make/year/price, and status badges ('Available' vs 'Sold'). Use Lucide icons for styling."

### Purpose
To construct the primary user dashboard for browsing vehicle inventory.

---

### Prompt 16
> "Create an Admin Dashboard page with an inventory table and dialog modals for adding new vehicles, editing existing details, and deleting listings with confirmation prompts."

### Purpose
To build administrative interface tools for catalog management.

---

### Prompt 17
> "In my React application, after a user clicks 'Purchase' in the Purchase Dialog modal, the API request succeeds on the backend, but the UI still displays the vehicle status as 'Available' until I manually refresh the page. How do I fix this state update bug?"

### Purpose
To fix React state immutability and sync issues by updating local state immediately after API confirmation.

---

### Prompt 18
> "Write a Node.js seed script `seed-admin.js` that checks if an admin user exists in MongoDB and creates a default admin account with hashed password if not present."

### Purpose
To automate admin account provisioning for testing and deployment setup.

---

### Prompt 19
> "Generate automated backend test suites using Jest and Supertest for auth endpoints (`/api/auth/register`, `/api/auth/login`) and vehicle CRUD endpoints (`/api/vehicles`)."

### Purpose
To implement automated integration testing and ensure API contract reliability.

---

### Prompt 20
> "My Jest tests in `vehicle.test.js` are failing with status `401 Unauthorized` on `POST /api/vehicles` even though I created an admin user in `beforeAll`. How do I extract the JWT token from the login response and attach it to Supertest requests?"

### Purpose
To fix authorization header handling in Supertest integration test cases.

---

### Prompt 21
> "Guide me on deploying the Express backend to Render and the React Vite frontend to Netlify. What environment variables need to be set on each platform, and how do I handle SPA client-side routing on Netlify?"

### Purpose
To deploy the full-stack application to cloud hosting platforms with environment configuration (`_redirects` / `netlify.toml`).

---

### Prompt 22
> "Make changes to the README.md file, make it seem authentic, professional, and useful. Include visual layout tables showcasing all images from the `Screenshots/` directory, project badges, setup guides, REST API documentation, and architecture layout."

### Purpose
To generate comprehensive, visually polished project documentation for submission.

---

### Prompt 23
> "Review the entire codebase and suggest any security optimizations, such as sanitizing inputs, environment variable protection, error handling edge cases, and code cleanups before final submission."

### Purpose
To perform a final quality and security code review before project submission.

---

## Reflection & Developer Notes

Using AI tools throughout this project significantly accelerated development—specifically by cutting down time spent on writing routine CRUD boilerplate, styling form fields, constructing regex validators, and drafting documentation. 

However, AI was strictly used as a **co-pilot**, not an autonomous developer:
- **Architectural & Business Logic Oversight**: AI-generated code snippets were continuously reviewed, refactored, and adapted to conform to the project's specific constraints (such as role-based access rules and inventory status validation).
- **Hands-on Debugging**: When issues arose—such as CORS header misconfigurations, MongoDB connection timeouts, or Jest token authentication headers—manual investigation of terminal outputs and console tracebacks was required to formulate targeted prompts and fix the root causes.
- **Testing & Verification**: Every API endpoint and frontend interface was manually verified and tested via Jest integration test runs, Postman/curl requests, and browser testing.

This collaborative approach combined the rapid prototyping capabilities of AI with human domain knowledge, rigorous testing, and attention to detail.

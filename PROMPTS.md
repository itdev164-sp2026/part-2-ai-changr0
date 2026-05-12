# Prompting Log — ITDEV-164

## Activity 1: The AI-Native Launchpad

### Prompt 1

**What I asked:**

> Look at my project structure and tell me:

1. What framework and version am I using?
2. What styling solution is configured?
3. What components exist so far?
   Then add a small "Setup verified ✓" badge to the bottom of the home page.

**What happened:**

> It analyzed my prompt and gave me the following information:

Analysis

1. Framework:
   Next.js 15.3.0 with Turbopack enabled

2. Styling:
   Tailwind CSS v4.1.0 with next-themes for dark mode support

3. Existing Components:
   header.tsx — Header with ITDEV-164 branding and mode toggle
   mode-toggle.tsx — Theme toggle component
   theme-provider.tsx — Theme provider wrapper

   Now I'll add the "Setup verified ✓" badge to the bottom of your home page:

> Did it create the right files? Yes

### Prompt 2

**What I asked:**
Look at the existing src/app/page.tsx and src/app/layout.tsx in this project.
Replace the current homepage content with a "Developer Profile" page for me.
It should include:

- My name: Rickey Chang
- A short bio: As a web development student I started out learning HTML, CSS, and JavaScript. Now in my later courses I am exposed to React, GraphQL, GitHub, and Tailwind CSS.
- A "Skills" section that displays at least 6 skills in a responsive
  Tailwind CSS grid (use cards with icons from lucide-react)

Keep the existing Header component and layout structure intact.
If you need to create new components, go ahead and create them in
the src/components/ folder.

**What happened:**

> It inspected page.tsx and layout.tsx first, then replace the homepage content with a responsive Developer Profile while preserving the existing layout and header wiring. After that it replaced the homepage with the new Developer Profile content and kept the existing layout/header untouched.
> Bellow is the information it gave:

Changes Made:

Created a new component — skill-card.tsx for displaying individual skills with icons and descriptions

Updated the homepage (page.tsx) with:

Your name and title: "Rickey Chang"
Your bio about learning web development
A Skills section with 7 skills in a responsive grid:
HTML, CSS, JavaScript, React, Tailwind CSS, GraphQL, GitHub
Each skill card includes an icon from lucide-react and a brief description
Hover effects for interactivity
Updated metadata (layout.tsx) to reflect the new profile page

> What did you learn about writing effective prompts?
> Giving it specific or detailed prompt made it understood what I wanted to do.

### Reflection

> Write 2-3 sentences reflecting on the experience. How did it feel
> to direct an AI to build something for you? What surprised you?
> What would you do differently next time?

I have used ChatGPT before and it wasn't like this. I like how it edits my files in the editor, and when it finishes it gives me a list of what it did and explains it pretty well. I also like that I have the option to keep or undo something because this gives me a lot of time to review what was changed or not changed. Something I would do differently next time is to add more information to the prompt.


## Activity 2: Building the Dashboard Shell

### Prompt 1

**What I asked:**

> Using the shadcn sidebar components that are now in my src/components/ui/ folder, create a professional, collapsible dashboard layout. It should include:

1. A sidebar (src/components/app-sidebar.tsx) with navigation links for:
   - Overview (use the Home icon from lucide-react)
   - Projects (use the FolderOpen icon)
   - Settings (use the Settings icon)

2. A top navigation area with breadcrumbs showing the current page.

3. A main content area that wraps the existing page content.

4. Update src/app/layout.tsx to use the new SidebarProvider and sidebar layout.

Important: Preserve the Developer Profile content from Activity 1 in
src/app/page.tsx — it should appear in the main content area of the new layout.
Keep the dark mode toggle working.


**What happened:**

 It created app-sidebar.tsx and wired it into layout.tsx.The new layout used the shadcn sidebar provider that added a collapsible navigation rail with Overview, Projects, and Settings. It also showed route-aware breadcrumbs plus the dark mode toggle in the top bar. It kept the developer profile content in page.tsx inside the new main area.

### Prompt 2

**What I asked:**

> The sidebar is not responsive on mobile. It should collapse into a sheet (slide-out panel) that opens when clicking a trigger button. The shadcn Sidebar component supports this with the "offcanvas" variant or by using SidebarTrigger. Please fix the mobile behavior.

**What happened:**

It updated the mobile behavior to work as a slide-out sheet. What it changed were sidebar collapse mode to offcanvas in app-sidebar.tsx so it aligns with shadcn's mobile sheet pattern. It added a mobile state handling  with useSidebar for on route changes to close automatically and kept the SidebarTrigger at the top so it can still be clickable in mobile layout.

### Reflection

> Did the Agent accidentally delete or overwrite any of your Activity 1 code? 
   no
> What did you learn about giving the Agent context about existing code you want to preserve?
   For example layout.tsx, it got upgraded with many things when the agent implemented the dashboard. It also added destination pages for the nav items in page.tsx.

## Activity 3: Server-Side Data with Supabase

### Prompt 1

**What I asked:**

Using the Supabase client at src/lib/supabase.ts, create a new Server Component
at src/app/projects/page.tsx that:

1. Fetches all records from the "projects" table in Supabase
2. Displays them in a professional layout using shadcn/ui Card components
   (run `npx shadcn@latest add card` if needed)
3. Each card should show the project title, description, and a status badge
4. The status badge should be color-coded:
   - "active" = green
   - "completed" = blue
   - "archived" = gray

Use @workspace context to match the styling of our existing Dashboard.
This must be a React Server Component (async function, no "use client").
Do NOT use useEffect or useState for data fetching.

**What happened:**

> (Did the Agent create a Server Component or a Client Component?
> Did it use async/await or useEffect? Did you have to correct it?)
   The agent implement an async Server Component. It replaced the static projects page with an async server component in page.tsx and it made changes in card.tsx by adding shadcn Card UI components. the new page now fetches all rows from the projects table using the supabase client in supabase.ts. Each project now has a professional card layout that shows the title, description and status.
      status:
      - active -> green
      - completed -> blue
      - archived -> gray
   

### Prompt 2

**What I asked:**

The breadcrumb in src/app/layout.tsx always shows "Overview" because the page
name is hardcoded. Extract the breadcrumb into its own client component at
src/components/breadcrumb-nav.tsx that uses usePathname() from next/navigation
to display the correct page name. Map "/" to "Overview", "/projects" to
"Projects", and "/settings" to "Settings". Keep "ITDEV-164" as the first
breadcrumb segment. Then update layout.tsx to use the new component.

**What happened:**

> (Describe the result and what you learned from the exchange)
It re-applied the breadcrumb extraction and put the new client component in breadcrumb-nav.tsx using usePathname(). It updated layout.tsx to render the new components and adjusted app-sidebar.tsx making the topbar accepts the breadcrumb as a prop. There was a warning in layout.tsx for global.css but is unrelated to the breadcrumbs.

### Reflection

> How does fetching data on the server feel different from the useEffect pattern you used in Web Programming 1? 
> What are the advantages you noticed? 
> Did anything surprise you about how simple server-side data fetching is in the App Router?

It is very different from REST api but the coding is less and the async function is very nice compared with the client-side to fetch for data.


## Activity 4: AI-Driven Forms & Validation

### Prompt 1

**What I asked:**

Create a Zod validation schema in a new file src/lib/schemas.ts for a "Project"
with the following fields:

- title: string, minimum 3 characters, with a custom error message
  "Title must be at least 3 characters"
- description: string, minimum 10 characters, with a custom error message
  "Description must be at least 10 characters"
- status: enum with values "active", "completed", "archived"

Export the schema and also export the inferred TypeScript type using z.infer.

**What happened:**

The agent created schema correctly with with validation rules for: 
title (min 3 chars)
description (min 10 chars)
status (enum with "active", "completed", "archived")

### Prompt 2

**What I asked:**

Using the Zod schema from src/lib/schemas.ts, do the following:

1. Create a form component at src/components/project-form.tsx that:
   - Is a Client Component ("use client") because it uses react-hook-form hooks
   - Uses react-hook-form with the zodResolver from @hookform/resolvers for validation
   - Uses shadcn/ui Field, FieldLabel, and FieldError for field layout
   - Uses shadcn/ui Input for title, Textarea for description, and Select for status
   - Shows inline error messages under each field when validation fails
   - Has a "Create Project" submit button
   - Shows a sonner toast notification on successful submission

2. Create a Server Action at src/app/actions.ts that:
   - Has "use server" at the top of the file
   - Accepts the validated form data
   - Validates it again with the Zod schema (server-side validation)
   - Inserts the validated data into the Supabase "projects" table
   - Returns a success or error response

3. Create a new page at src/app/projects/new/page.tsx that renders
   the project form within the dashboard layout.

4. Add a "New Project" button to the existing projects page
   (src/app/projects/page.tsx) that links to /projects/new.

Use @workspace to match the existing project styling.

**What happened:**

In project-form.tsx it has "use client" and in actions.tsx it has "use server". In page.tsx it added Link and Button imports and combined header section with "New Project" button. 

### Prompt 3 (if applicable)

**What I asked:**

I did not see the toast notification when I successfully create a new project.

**What happened:**

It found that the toaster component was missing from the root layout and added it to layout.tsx.

### Reflection

I like that with Zod, you define the "Shape of Truth" first then components become a visual representation of that schema. I like how it act as a "gatekeeper" that ensures all required keys to work. Previous course I would be using if/else statements or switch statements, but with Zod it automatically generate the validation function.


## Activity 5: Securing the App with Supabase Auth

### Prompt 1

**What I asked:**

Implement a complete email/password authentication flow for this Next.js 15
App Router project using @supabase/ssr. Here is what I need:

1. SUPABASE CLIENTS: Create server-side Supabase client utilities in
   src/lib/supabase/ that work correctly with Next.js cookies. I need
   separate clients for Server Components, Server Actions, and Middleware.

2. LOGIN PAGE: Create a page at src/app/(auth)/login/page.tsx with a
   shadcn/ui card-based login form. It should support both "Sign In"
   and "Sign Up" (toggle between them or use tabs). Handle the auth
   via Server Actions, not client-side fetch.

3. MIDDLEWARE: Create a middleware.ts file at src/middleware.ts (next to
   the app directory — Next.js looks for middleware as a sibling of app)
   that:
   - Refreshes the user's auth session on every request
   - Protects the /projects routes — redirect unauthenticated users to /login
   - Allows unauthenticated access to /login
   - Uses supabase.auth.getUser() (NOT getSession()) for verification

4. SIGN OUT: Add a "Sign Out" button to the existing sidebar component
   (src/components/app-sidebar.tsx) that calls a Server Action to sign
   the user out and redirect to /login. The button must only render
   when an authenticated user is present — pass the user as a prop from
   the root layout (which will need to fetch it via the server Supabase
   client) and gate the Sign Out UI on that prop.

5. UPDATE DATA QUERIES: Modify the projects page and the create-project
   Server Action to use the authenticated Supabase client so that RLS
   policies filter data per user.

Use @workspace to understand the existing project structure. Do not remove
or break existing functionality — integrate auth around it.

**What happened:**

It created the server-side supabase clients server.ts and middleware.ts. Then for authentication it created actions.ts for signin, signup, and signout while updating schemas.ts with signInSchema and signUpSchema. It create middleware.ts that protects /projects and /settings routes and uses supabase.auth.getUser() for verification. For UI integration, it updated app-sidebar.tsx to accept user prop from root layout. When authenticated it displays user email and sign out button. Lastly, it updated layout.tsx to fetch user from the server supabase client and passes user to the AppSidebar component.

### Prompt 2

**What I asked:**

When I sign out of the account I don't get taken back to the sign in page.

**What happened:**
After signing out, the page is still stuck on Projects Page instead of going back to the sign in page. The agent looked at the signOut() function actions.ts and found that redirect() is inside the try-catch block in and moved it out. 

### Reflection

The agent handled middleware.ts like a route-level auth gate. It created a supabase middleware client so every request can refresh before any page renders. How it compares to checking login status is that it is better for route protection. 

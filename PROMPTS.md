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
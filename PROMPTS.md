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

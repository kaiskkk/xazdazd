# xazdazd

This is your AI coding assistant context. Paste this into Claude when building features.

## Stack
- **Framework:** Next.js 15 (App Router)
- **Auth:** Clerk (users can sign up/sign in)
- **Database:** Neon Postgres + Drizzle ORM
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion + GSAP + Lottie (full motion graphics)
- **AI:** Not configured yet (add via Vercel env vars when needed)

## Project Structure
```
src/
├── app/
│   ├── api/              # API routes (add /api/[name]/route.ts)
│   ├── dashboard/        # Protected pages (user must be logged in)
│   ├── sign-in/          # Clerk sign-in page
│   ├── sign-up/          # Clerk sign-up page
│   ├── layout.tsx        # Root layout with Clerk provider
│   ├── page.tsx          # Landing page (redirects to dashboard if logged in)
│   └── globals.css       # Global styles
├── components/           # React components (create this folder)
├── lib/
│   └── db/
│       ├── index.ts      # Database connection
│       └── schema.ts     # Database tables (edit this to add tables)
└── middleware.ts         # Protects routes (dashboard, api, etc.)
```

## How to Add Features

### Add a new page
Create a file at `src/app/[page-name]/page.tsx`
- For protected pages, add the path to middleware.ts
- Use `"use client"` at top if you need interactivity (buttons, forms)

### Add a database table
1. Edit `src/lib/db/schema.ts` to add your table
2. Commit and push to GitHub
3. Tables automatically sync to Neon during Vercel deployment
   - No manual migration commands needed
   - Works from mobile/web - just push the code

### Add an API route
Create `src/app/api/[route-name]/route.ts`
```typescript
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // Your logic here
  return NextResponse.json({ data: "..." });
}
```

## Customizing the Dashboard

The default `/dashboard` page is just a starting point to help you understand your stack.

**To replace it:**
- Edit `src/app/dashboard/page.tsx` with your own content
- Or delete it entirely and build your landing page at `src/app/page.tsx`

This is your app - the dashboard is optional scaffolding.

## Current Database Schema

```typescript
// Items table (example - customize for your app)
items: {
  id: uuid (primary key)
  userId: text (the Clerk user ID)
  title: text
  content: text (optional)
  createdAt: timestamp
  updatedAt: timestamp
}
```

## Rules for AI
- Use TypeScript for all files
- Use Tailwind CSS for styling (no CSS modules)
- Use Framer Motion for React animations, GSAP for scroll/timeline effects, Lottie for motion graphics
- Use server components by default, add "use client" only when needed
- Always check auth with `auth()` from @clerk/nextjs/server in API routes
- Use the `db` object from @/lib/db for database queries
- Keep it simple - don't over-engineer

## Animation with Framer Motion

```typescript
"use client";
import { motion } from "framer-motion";

// Fade in
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
  Content
</motion.div>

// Slide up on scroll
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Appears on scroll
</motion.div>

// Hover effect
<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
  Click me
</motion.button>
```

## GSAP for Scroll & Timeline Effects

```typescript
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Animate on scroll
useEffect(() => {
  gsap.to(".box", {
    x: 200,
    scrollTrigger: {
      trigger: ".box",
      start: "top center",
      end: "bottom center",
      scrub: true,
    },
  });
}, []);

// Timeline sequence
useEffect(() => {
  const tl = gsap.timeline();
  tl.to(".first", { opacity: 1, duration: 0.5 })
    .to(".second", { x: 100, duration: 0.3 })
    .to(".third", { scale: 1.2, duration: 0.4 });
}, []);
```

## Lottie for Motion Graphics

Use After Effects animations or grab free ones from [LottieFiles.com](https://lottiefiles.com)

```typescript
"use client";
import Lottie from "lottie-react";
import animationData from "./animation.json"; // Download from LottieFiles

// Basic usage
<Lottie animationData={animationData} loop={true} />

// With controls
import { useRef } from "react";

export function AnimatedIcon() {
  const lottieRef = useRef(null);

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop={false}
      autoplay={false}
      onMouseEnter={() => lottieRef.current?.play()}
      onMouseLeave={() => lottieRef.current?.stop()}
      style={{ width: 200, height: 200 }}
    />
  );
}

// From URL (no download needed)
import { useLottie } from "lottie-react";

export function RemoteAnimation() {
  const { View } = useLottie({
    path: "https://assets.lottiefiles.com/packages/lf20_xxx.json",
    loop: true,
  });
  return View;
}
```

## Example Requests to Claude

- "Add a page where I can save notes"
- "Create a form to add new items"
- "Add a delete button to each item"
- "Make the dashboard show all my items"
- "Add a search bar to filter items"
- "Animate the cards to fade in on page load"
- "Add a smooth hover effect to the buttons"
- "Make elements animate as I scroll down"
- "Create a staggered animation for a list of items"
- "Add a Lottie animation for the loading state"
- "Add an animated success checkmark using Lottie"
- "Create a hero section with a Lottie background animation"

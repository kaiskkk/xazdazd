# xazdazd

Created with [Vibe Starter](https://vibestarter.net)

## Your app is live!

Visit: https://xazdazd.vercel.app

## Getting Started (Local Development)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build from Your Phone

1. Open Claude on your phone
2. Paste the contents of PROMPT.md
3. Describe what you want to build
4. Claude writes the code
5. Push to GitHub (via web or app)
6. Site updates automatically!

## Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Framework** | Next.js 15 | React with App Router |
| **Auth** | Clerk | User sign-up/sign-in |
| **Database** | Neon + Drizzle | Postgres with type-safe ORM |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **Animations** | Framer Motion | React component animations |
| **Scroll Effects** | GSAP | Timelines & scroll-triggered |
| **Motion Graphics** | Lottie | After Effects animations |
| **Hosting** | Vercel | Auto-deploys on git push |

## Animation Libraries

Your app includes three animation libraries for different use cases:

### Framer Motion
Best for: React component animations, hover effects, layout transitions
```tsx
<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
  Click me
</motion.div>
```

### GSAP
Best for: Scroll-triggered animations, complex timelines, parallax
```tsx
gsap.to(".element", { scrollTrigger: { trigger: ".element" }, x: 100 });
```

### Lottie
Best for: Complex motion graphics, animated icons, loading states
```tsx
<Lottie animationData={animation} loop={true} />
```

Browse free animations at [LottieFiles.com](https://lottiefiles.com)

## Useful Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run db:push    # Sync database schema
npm run db:studio  # Open database UI
```

## Learn More

- See `PROMPT.md` for detailed AI coding instructions
- Visit your dashboard at /dashboard for quick start guide

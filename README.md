# Tao Solutions Client Intake

Premium single-page call intake form built with Next.js 15, TypeScript, Tailwind CSS, shadcn/ui-style components, Framer Motion, React Hook Form, Zod, and Supabase.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3001` when running with `npm run dev -- -p 3001`.

## Environment

Create `.env.local` from `.env.example` and provide:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3001
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Supabase

Run [supabase/client_leads.sql](supabase/client_leads.sql) in the Supabase SQL editor. The app writes through the server API route with the service role key, stores every valid lead in `public.client_leads`, and keeps row level security enabled.

Without Supabase keys, local development submissions are saved to `data/client-leads.jsonl`.

## Verification

```bash
npm run lint
npm run build
npm audit --omit=dev
```

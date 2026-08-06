import Link from "next/link";
import { CheckCircle2, Mail, ShieldCheck } from "lucide-react";

export default function SuccessPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div className="premium-grid pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
      <section className="glass-panel relative w-full max-w-3xl rounded-[28px] px-6 py-10 text-center sm:px-12 sm:py-14">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_24px_60px_rgba(16,185,129,0.28)]">
          <CheckCircle2 className="size-10" />
        </div>
        <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Confirmation</p>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Your answers were submitted.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-8 text-slate-600">
          We received your responses and will review them before the call.
        </p>
        <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white/78 p-5 shadow-sm">
            <Mail className="size-5 text-blue-600" />
            <p className="mt-4 text-sm font-semibold text-slate-950">Submitted</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">Your answers are ready for review.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/78 p-5 shadow-sm">
            <ShieldCheck className="size-5 text-emerald-600" />
            <p className="mt-4 text-sm font-semibold text-slate-950">Data handling</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">Your submission is stored securely.</p>
          </div>
        </div>
        <div className="mt-9">
          <Link href="/" className="focus-ring inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            Submit another intake
          </Link>
        </div>
      </section>
    </main>
  );
}

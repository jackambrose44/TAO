import { ClientIntakeForm } from "@/components/intake/client-intake-form";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="premium-grid pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
      <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 pt-10 text-center sm:px-6 sm:pt-16 lg:px-8">
        <div className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur">
          Tao Solutions Client Onboarding
        </div>
        <h1 className="mt-7 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
          Start the call with clarity.
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-base leading-8 text-slate-600 sm:text-lg">
          Tell us what triggered the call, where revenue and time are leaking, and how ready you are to grow.
        </p>
        <div className="mt-8 grid w-full max-w-3xl grid-cols-1 gap-3 pb-8 text-left sm:grid-cols-3">
          {[
            ["01", "Call context"],
            ["02", "Revenue leaks"],
            ["03", "Growth readiness"]
          ].map(([number, label]) => (
            <div key={number} className="rounded-2xl border border-slate-200/80 bg-white/72 px-4 py-3 shadow-sm backdrop-blur">
              <p className="text-xs font-semibold text-blue-600">{number}</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{label}</p>
            </div>
          ))}
        </div>
      </section>
      <ClientIntakeForm />
    </main>
  );
}

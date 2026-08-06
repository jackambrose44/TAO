import Image from "next/image";
import { ClientIntakeForm } from "@/components/intake/client-intake-form";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="premium-grid pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
      <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 pt-10 text-center sm:px-6 sm:pt-14 lg:px-8">
        <div className="flex flex-col items-center">
          <Image
            src="/tao-logo.webp"
            alt="Tao Solutions"
            width={112}
            height={112}
            priority
            className="size-20 rounded-lg shadow-[0_22px_55px_rgba(15,23,42,0.16)] ring-1 ring-slate-200 sm:size-24"
          />
        </div>
        <h1 className="mt-8 max-w-3xl text-balance text-4xl font-semibold text-slate-950 sm:text-6xl">
          Client Intake
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-base leading-8 text-slate-600 sm:text-lg">
          Complete the questions below before your call.
        </p>
      </section>
      <ClientIntakeForm />
    </main>
  );
}

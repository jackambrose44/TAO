"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Lock } from "lucide-react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { FloatingField } from "@/components/intake/floating-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  clientLeadSchema,
  defaultClientLeadValues,
  readinessScores,
  type ClientLeadFormValues
} from "@/lib/validation";

const requiredFields: Array<keyof ClientLeadFormValues> = [
  "bookingReason",
  "callGoals",
  "revenueLeak",
  "timeLeak",
  "blocker",
  "prospectingMethod",
  "monthlyNewClients",
  "growthCapacity",
  "growthReadiness"
];

type QuestionField = {
  name: keyof Pick<
    ClientLeadFormValues,
    | "bookingReason"
    | "callGoals"
    | "revenueLeak"
    | "timeLeak"
    | "blocker"
    | "prospectingMethod"
    | "growthCapacity"
  >;
  label: string;
  max: number;
};

const questionFields: QuestionField[] = [
  {
    name: "bookingReason",
    label: "What made you book a call today?",
    max: 700
  },
  {
    name: "callGoals",
    label: "What are you hoping we cover on the call?",
    max: 700
  },
  {
    name: "revenueLeak",
    label: "Where do you think your business is leaking revenue?",
    max: 700
  },
  {
    name: "timeLeak",
    label: "Where do you think your business is leaking time?",
    max: 700
  },
  {
    name: "blocker",
    label: "What has stopped you from stopping these problems?",
    max: 700
  },
  {
    name: "prospectingMethod",
    label: "How do you currently prospect clients?",
    max: 700
  },
  {
    name: "growthCapacity",
    label: "What is your current capacity for growth, or new clients?",
    max: 500
  }
];

export function ClientIntakeForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ClientLeadFormValues>({
    resolver: zodResolver(clientLeadSchema),
    defaultValues: defaultClientLeadValues,
    mode: "onChange"
  });

  const values = useWatch({ control });

  const progress = useMemo(() => {
    const completed = requiredFields.filter((field) => Boolean(values[field])).length;
    return Math.round((completed / requiredFields.length) * 100);
  }, [values]);

  async function onSubmit(data: ClientLeadFormValues) {
    setServerError("");
    const response = await fetch("/api/client-leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const payload = (await response.json()) as { message?: string };
    if (!response.ok) {
      setServerError(payload.message ?? "Something went wrong. Please try again.");
      return;
    }

    setSubmitted(true);
    window.setTimeout(() => {
      router.push("/success");
    }, 1300);
  }

  function onInvalid() {
    setServerError("Please answer every question before submitting.");
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
      <motion.div
        className="glass-panel overflow-hidden rounded-lg"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="border-b border-slate-200/75 bg-white/72 px-5 py-5 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-950">Intake Questions</p>
              <p className="mt-1 text-sm text-slate-500">Please answer each prompt before your call.</p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm">
              <Lock className="size-3.5 text-emerald-600" />
              Secure
            </div>
          </div>
          <div className="mt-5 flex items-center gap-4">
            <Progress value={progress} />
            <span className="w-11 text-right text-sm font-semibold text-slate-700">{progress}%</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="submitted"
              className="flex min-h-[560px] flex-col items-center justify-center px-6 py-16 text-center"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
            >
              <motion.div
                className="flex size-20 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_24px_60px_rgba(16,185,129,0.28)]"
                initial={{ scale: 0.4, rotate: -16 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <Check className="size-9" />
              </motion.div>
              <h2 className="mt-7 text-3xl font-semibold text-slate-950">Submission received</h2>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit(onSubmit, onInvalid)}
              className="space-y-8 px-5 py-6 sm:px-8 sm:py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              noValidate
            >
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
                {...register("companyWebsite")}
              />

              {questionFields.map((question, index) => {
                const value = values[question.name] ?? "";
                return (
                  <FloatingField
                    key={question.name}
                    id={question.name}
                    label={question.label}
                    error={errors[question.name]?.message}
                    counter={`${value.length}/${question.max}`}
                    index={index + 1}
                  >
                    <Textarea id={question.name} placeholder="Write your answer here." {...register(question.name)} />
                  </FloatingField>
                );
              })}

              <FloatingField
                id="monthlyNewClients"
                label="How many new clients are your systems bringing in per month?"
                error={errors.monthlyNewClients?.message}
                counter={`${values.monthlyNewClients?.length ?? 0}/120`}
                index={8}
              >
                <Input
                  id="monthlyNewClients"
                  inputMode="text"
                  placeholder="Example: 3-5 per month"
                  {...register("monthlyNewClients")}
                />
              </FloatingField>

              <div className="space-y-3 rounded-lg border border-slate-200/80 bg-white/58 p-4 shadow-sm backdrop-blur">
                <div className="flex items-start justify-between gap-4 px-1">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-[11px] font-semibold text-slate-400 shadow-sm">
                      09
                    </span>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-base font-semibold text-slate-950">How ready are you to grow your business?</h2>
                      <p className="text-sm text-slate-500">Put on a scale of 1-5.</p>
                    </div>
                  </div>
                </div>
                <Controller
                  control={control}
                  name="growthReadiness"
                  render={({ field }) => (
                    <div
                      className="grid grid-cols-5 gap-2.5 sm:gap-3"
                      role="radiogroup"
                      aria-label="How ready are you to grow your business?"
                    >
                      {readinessScores.map((score) => {
                        const selected = field.value === score;
                        return (
                          <button
                            key={score}
                            type="button"
                            onClick={() => field.onChange(score)}
                            className={cn(
                              "focus-ring flex aspect-square min-h-14 items-center justify-center rounded-lg border text-lg font-semibold transition-all sm:min-h-16",
                              selected
                                ? "border-slate-950 bg-slate-950 text-white shadow-[0_18px_42px_rgba(15,23,42,0.18)]"
                                : "border-slate-200 bg-white/78 text-slate-700 shadow-sm hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
                            )}
                            aria-checked={selected}
                            role="radio"
                          >
                            {score}
                          </button>
                        );
                      })}
                    </div>
                  )}
                />
                {errors.growthReadiness ? (
                  <p className="px-1 text-xs font-medium text-red-600" role="alert">
                    {errors.growthReadiness.message}
                  </p>
                ) : null}
              </div>

              {serverError ? (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
                  {serverError}
                </div>
              ) : null}

              <div className="border-t border-slate-200/75 pt-6">
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Submitting
                    </>
                  ) : (
                    <>
                      Submit
                      <Check className="size-4" />
                    </>
                  )}
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

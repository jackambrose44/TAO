import { z } from "zod";

export const readinessScores = [1, 2, 3, 4, 5] as const;

const longAnswer = (label: string, max = 700) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .max(max, `${label} must stay under ${max} characters.`);

export const clientLeadSchema = z.object({
  bookingReason: longAnswer("What made you book a call today?"),
  callGoals: longAnswer("What are you hoping we cover on the call?"),
  revenueLeak: longAnswer("Where do you think your business is leaking revenue?"),
  timeLeak: longAnswer("Where do you think your business is leaking time?"),
  blocker: longAnswer("What has stopped you from solving these problems?"),
  prospectingMethod: longAnswer("How do you currently prospect clients?"),
  monthlyNewClients: z
    .string()
    .trim()
    .min(1, "How many new clients are your systems bringing in per month? is required.")
    .max(120, "Keep this under 120 characters."),
  growthCapacity: longAnswer("What is your current capacity for growth, or new clients?", 500),
  growthReadiness: z.coerce
    .number({ required_error: "Select how ready you are to grow." })
    .int()
    .min(1, "Select a readiness score from 1 to 5.")
    .max(5, "Select a readiness score from 1 to 5."),
  companyWebsite: z.string().max(0, "Spam detected.").optional()
});

export type ClientLeadFormValues = z.infer<typeof clientLeadSchema>;

export const defaultClientLeadValues: ClientLeadFormValues = {
  bookingReason: "",
  callGoals: "",
  revenueLeak: "",
  timeLeak: "",
  blocker: "",
  prospectingMethod: "",
  monthlyNewClients: "",
  growthCapacity: "",
  growthReadiness: undefined as unknown as ClientLeadFormValues["growthReadiness"],
  companyWebsite: ""
};

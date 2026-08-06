import { randomUUID } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isRateLimited } from "@/lib/rate-limit";
import { clientLeadSchema } from "@/lib/validation";

export const runtime = "nodejs";

type LeadSubmission = {
  booking_reason: string;
  call_goals: string;
  revenue_leak: string;
  time_leak: string;
  blocker: string;
  prospecting_method: string;
  monthly_new_clients: string;
  growth_capacity: string;
  growth_readiness: number;
  source_ip: string;
  user_agent: string | null;
};

function getRequestIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1"
  );
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && serviceRoleKey ? { url, serviceRoleKey } : null;
}

function toSubmissionRecord(
  lead: ReturnType<typeof clientLeadSchema.parse>,
  request: NextRequest,
  ip: string
): LeadSubmission {
  return {
    booking_reason: lead.bookingReason,
    call_goals: lead.callGoals,
    revenue_leak: lead.revenueLeak,
    time_leak: lead.timeLeak,
    blocker: lead.blocker,
    prospecting_method: lead.prospectingMethod,
    monthly_new_clients: lead.monthlyNewClients,
    growth_capacity: lead.growthCapacity,
    growth_readiness: lead.growthReadiness,
    source_ip: ip,
    user_agent: request.headers.get("user-agent")
  };
}

async function storeLocally(record: LeadSubmission) {
  const dataDir = path.join(process.cwd(), "data");
  await mkdir(dataDir, { recursive: true });
  await appendFile(
    path.join(dataDir, "client-leads.jsonl"),
    `${JSON.stringify({ id: randomUUID(), created_at: new Date().toISOString(), ...record })}\n`,
    "utf8"
  );
}

export async function POST(request: NextRequest) {
  const ip = getRequestIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: "Too many submissions from this network. Please try again later." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = clientLeadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Please review the highlighted fields and submit again.", errors: parsed.error.flatten() },
      { status: 400 }
    );
  }

  if (parsed.data.companyWebsite) {
    return NextResponse.json({ message: "Submission could not be accepted." }, { status: 400 });
  }

  const record = toSubmissionRecord(parsed.data, request, ip);
  const supabaseConfig = getSupabaseConfig();

  try {
    if (!supabaseConfig) {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          { message: "Supabase is not configured yet. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." },
          { status: 500 }
        );
      }

      await storeLocally(record);
      return NextResponse.json({ message: "Lead saved locally." }, { status: 201 });
    }

    const supabase = createClient(supabaseConfig.url, supabaseConfig.serviceRoleKey, {
      auth: { persistSession: false }
    });

    const windowStart = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const { count: recentSubmissionCount, error: rateLimitError } = await supabase
      .from("client_leads")
      .select("id", { count: "exact", head: true })
      .eq("source_ip", ip)
      .gte("created_at", windowStart);

    if (rateLimitError) {
      throw rateLimitError;
    }

    if ((recentSubmissionCount ?? 0) >= 5) {
      return NextResponse.json(
        { message: "Too many submissions from this network. Please try again later." },
        { status: 429 }
      );
    }

    const { error } = await supabase.from("client_leads").insert(record);

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: "Lead submitted successfully." }, { status: 201 });
  } catch (error) {
    console.error("Client intake submission failed", error);
    return NextResponse.json(
      { message: "We could not submit your intake right now. Please try again in a moment." },
      { status: 500 }
    );
  }
}

create extension if not exists pgcrypto;

create table if not exists public.client_leads (
  id uuid primary key default gen_random_uuid(),
  booking_reason text not null,
  call_goals text not null,
  revenue_leak text not null,
  time_leak text not null,
  blocker text not null,
  prospecting_method text not null,
  monthly_new_clients text not null,
  growth_capacity text not null,
  growth_readiness integer not null,
  source_ip text,
  user_agent text,
  created_at timestamptz not null default now(),
  constraint client_leads_growth_readiness_range check (growth_readiness between 1 and 5)
);

alter table public.client_leads
  add column if not exists booking_reason text,
  add column if not exists call_goals text,
  add column if not exists revenue_leak text,
  add column if not exists time_leak text,
  add column if not exists blocker text,
  add column if not exists prospecting_method text,
  add column if not exists monthly_new_clients text,
  add column if not exists growth_capacity text,
  add column if not exists growth_readiness integer,
  add column if not exists source_ip text,
  add column if not exists user_agent text,
  add column if not exists created_at timestamptz default now();

do $$
declare
  legacy_column text;
begin
  foreach legacy_column in array array[
    'first_name',
    'last_name',
    'email',
    'phone_number',
    'company_name',
    'job_title',
    'business_website',
    'industry',
    'company_size',
    'current_crm',
    'biggest_business_challenge',
    'services_interested_in',
    'budget',
    'preferred_contact_method'
  ]
  loop
    if exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = 'client_leads'
        and column_name = legacy_column
    ) then
      execute format('alter table public.client_leads alter column %I drop not null', legacy_column);
    end if;
  end loop;
end $$;

alter table public.client_leads
  drop constraint if exists client_leads_email_format,
  drop constraint if exists client_leads_services_nonempty,
  drop constraint if exists client_leads_growth_readiness_range,
  add constraint client_leads_growth_readiness_range check (growth_readiness between 1 and 5);

alter table public.client_leads enable row level security;

drop policy if exists "Service role can manage client leads" on public.client_leads;
create policy "Service role can manage client leads"
  on public.client_leads
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create index if not exists client_leads_created_at_idx on public.client_leads (created_at desc);

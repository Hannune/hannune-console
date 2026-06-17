-- Multi-service tier: account_services 테이블 추가.
-- 옛: accounts.tier 단일 = user 1명 = tier 1개.
-- 신: account_services (account_id, service) = user 가 service 별 독립 tier 보유.
--
-- 적용 방법: Supabase dashboard → SQL Editor → 통째로 붙여넣고 Run.

-- ---------- table ----------
create table if not exists public.account_services (
  account_id uuid not null references public.accounts(id) on delete cascade,
  service text not null,
  tier text not null default 'free',
  polar_customer_id text,
  polar_subscription_id text,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (account_id, service)
);

create index if not exists account_services_polar_sub_id_idx
  on public.account_services(polar_subscription_id);
create index if not exists account_services_polar_customer_id_idx
  on public.account_services(polar_customer_id);

-- ---------- RLS ----------
alter table public.account_services enable row level security;

-- 권한 부여 (SQL 으로 만든 새 테이블은 자동 grant 안 됨)
grant select, insert, update, delete on public.account_services to service_role;
grant select on public.account_services to authenticated;

drop policy if exists "account_services select own" on public.account_services;
create policy "account_services select own"
  on public.account_services
  for select
  using (account_id = auth.uid());

-- ---------- updated_at trigger ----------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists account_services_set_updated_at on public.account_services;
create trigger account_services_set_updated_at
  before update on public.account_services
  for each row execute function public.set_updated_at();

-- ---------- 데이터 마이그레이션 ----------
-- accounts 테이블엔 polar_customer_id 만 있음. polar_subscription_id 는
-- subscriptions 테이블 (service 별 row) 에서 active sub 1건 join.
insert into public.account_services (account_id, service, tier, polar_customer_id, polar_subscription_id)
select
  a.id,
  'entity-resolution',
  coalesce(a.tier, 'free'),
  a.polar_customer_id,
  s.polar_subscription_id
from public.accounts a
left join lateral (
  select polar_subscription_id
  from public.subscriptions
  where account_id = a.id
    and service = 'entity-resolution'
    and status = 'active'
  order by current_period_end desc nulls last
  limit 1
) s on true
on conflict (account_id, service) do nothing;

-- 모든 account 에 ownership-api free tier 도 박음 (기본 접근권)
insert into public.account_services (account_id, service, tier)
select id, 'ownership-api', 'free'
from public.accounts
on conflict (account_id, service) do nothing;

-- Enable RLS and add per-user policies for messages
alter table public.messages enable row level security;

create policy "Users can view their messages"
on public.messages
for select
using (auth.uid() = user_id);

create policy "Users can insert their messages"
on public.messages
for insert
with check (auth.uid() = user_id);

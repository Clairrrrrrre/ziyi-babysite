-- MVP story schema for quiz + branching narrative
create table if not exists public.characters (
  id text primary key,
  name text not null,
  book text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.quiz_questions (
  id text primary key,
  question text not null,
  order_index int not null,
  created_at timestamptz not null default now()
);

create table if not exists public.quiz_options (
  id text primary key,
  question_id text not null references public.quiz_questions(id) on delete cascade,
  label text not null,
  score jsonb not null default '{}'::jsonb,
  order_index int not null,
  created_at timestamptz not null default now()
);

create table if not exists public.story_chapters (
  id text primary key,
  character_id text not null references public.characters(id) on delete cascade,
  title text not null,
  intro text,
  start_node_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.story_nodes (
  id text primary key,
  chapter_id text not null references public.story_chapters(id) on delete cascade,
  title text,
  body text not null,
  order_index int,
  created_at timestamptz not null default now()
);

create table if not exists public.story_endings (
  id text primary key,
  chapter_id text not null references public.story_chapters(id) on delete cascade,
  title text not null,
  body text not null,
  is_canon boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.story_choices (
  id text primary key,
  node_id text not null references public.story_nodes(id) on delete cascade,
  label text not null,
  next_node_id text references public.story_nodes(id) on delete set null,
  ending_id text references public.story_endings(id) on delete set null,
  order_index int,
  created_at timestamptz not null default now()
);

create table if not exists public.game_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  character_id text,
  chapter_id text,
  quiz_answers jsonb not null default '[]'::jsonb,
  result jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.game_steps (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null references public.game_runs(id) on delete cascade,
  step_index int not null,
  node_id text,
  choice_id text,
  created_at timestamptz not null default now()
);

create index if not exists game_runs_user_id_idx on public.game_runs(user_id);
create index if not exists game_steps_run_id_idx on public.game_steps(run_id);

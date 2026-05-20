
CREATE TABLE public.guestbook_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  handle TEXT NOT NULL CHECK (char_length(handle) BETWEEN 1 AND 32),
  message TEXT NOT NULL CHECK (char_length(message) BETWEEN 1 AND 200),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.guestbook_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "guestbook public read"
  ON public.guestbook_entries FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "guestbook public insert"
  ON public.guestbook_entries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE INDEX guestbook_entries_created_at_idx
  ON public.guestbook_entries (created_at DESC);

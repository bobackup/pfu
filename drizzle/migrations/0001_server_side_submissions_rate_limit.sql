DROP POLICY IF EXISTS "Anyone submits with consent" ON public.submissions;

CREATE TABLE public.submission_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.submission_rate_limits TO service_role;
ALTER TABLE public.submission_rate_limits ENABLE ROW LEVEL SECURITY;
CREATE INDEX submission_rate_limits_key_time ON public.submission_rate_limits (key_hash, created_at);
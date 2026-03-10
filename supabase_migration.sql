-- UoE Next Portal – Waitlist Table Migration
-- Run this in your Supabase SQL Editor to add the survey columns.
--
-- UPSERT STRATEGY:
--   If a duplicate email is submitted, the survey fields are updated
--   on the existing row instead of throwing a unique-constraint error.

-- 1. Create the waitlist table if it doesn't already exist
--    (email is the unique conflict target used for upserts)
CREATE TABLE IF NOT EXISTS waitlist (
  id          BIGSERIAL PRIMARY KEY,
  email       TEXT NOT NULL UNIQUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Add survey columns (safe to re-run; ignored if columns already exist)
ALTER TABLE waitlist
  ADD COLUMN IF NOT EXISTS old_portal_issues  TEXT[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS new_portal_likes   TEXT[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS sentiment          TEXT    DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS personal_opinion   TEXT    DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS updated_at         TIMESTAMPTZ DEFAULT NULL;

-- 3. Enable Row-Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- 4. Allow anonymous inserts AND updates (needed for upsert on conflict)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'waitlist' AND policyname = 'allow_anon_insert'
  ) THEN
    EXECUTE '
      CREATE POLICY allow_anon_insert ON waitlist
        FOR INSERT TO anon
        WITH CHECK (true);
    ';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'waitlist' AND policyname = 'allow_anon_update'
  ) THEN
    EXECUTE '
      CREATE POLICY allow_anon_update ON waitlist
        FOR UPDATE TO anon
        USING (true)
        WITH CHECK (true);
    ';
  END IF;
END;
$$;

-- 5. (Optional) allow only authenticated admin to SELECT rows
-- CREATE POLICY allow_admin_select ON waitlist
--   FOR SELECT TO authenticated
--   USING (true);

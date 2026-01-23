-- ============================================================================
-- Update Icons to Simple Icons Format
-- ============================================================================
-- This script converts icon fields from path format (/icons/name.svg) to
-- simple-icons brand identifiers (e.g., 'github', 'slack').
--
-- Location: example/seed/update-icons.sql
--
-- Purpose:
--   - Migrate from legacy path-based icons to simple-icons library
--   - Enable consistent brand icon rendering across the application
--   - Simplify icon management and updates
--
-- Prerequisites:
--   - demo-data.sql must be executed first
--   - simple-icons library must be installed in the project
--
-- Usage:
--   Execute this file after demo-data.sql in your Supabase SQL Editor:
--   psql "your-database-url" < example/seed/update-icons.sql
-- ============================================================================

-- Update integration icons to simple-icons brand identifiers
-- Each UPDATE maps an integration ID to its corresponding simple-icons slug
UPDATE integrations SET icon = 'sanity' WHERE id = 'sanity';
UPDATE integrations SET icon = 'buildkite' WHERE id = 'buildkite';
UPDATE integrations SET icon = 'datocms' WHERE id = 'dato-cms';
UPDATE integrations SET icon = 'tinybird' WHERE id = 'tiny-bird';
UPDATE integrations SET icon = 'mailchimp' WHERE id = 'mailchimp';
UPDATE integrations SET icon = 'slack' WHERE id = 'slack';
UPDATE integrations SET icon = 'openai' WHERE id = 'chatgpt';  -- ChatGPT uses OpenAI icon
UPDATE integrations SET icon = 'github' WHERE id = 'github';
UPDATE integrations SET icon = 'zapier' WHERE id = 'zapier';
UPDATE integrations SET icon = 'stripe' WHERE id = 'stripe';
UPDATE integrations SET icon = 'googleappsscript' WHERE id = 'clasp';  -- Clasp uses Google Apps Script icon
UPDATE integrations SET icon = 'linear' WHERE id = 'linear-atlas';  -- Linear Atlas uses Linear icon
UPDATE integrations SET icon = 'pipedream' WHERE id = 'pipedream';
UPDATE integrations SET icon = 'webflow' WHERE id = 'webflow';
UPDATE integrations SET icon = 'linear' WHERE id = 'linear';
UPDATE integrations SET icon = 'producthunt' WHERE id = 'producthunt';


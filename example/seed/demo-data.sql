-- ============================================================================
-- Navly Demo Data - Initial Seed Data
-- ============================================================================
-- This file contains demo data for development and testing purposes.
-- It includes sample categories and integrations to demonstrate the app's
-- functionality and data structure.
--
-- Location: example/seed/demo-data.sql
--
-- Tables populated:
--   - categories: 7 sample categories
--   - integrations: 16 sample integration tools
--
-- Usage:
--   Execute this file in your Supabase SQL Editor or via psql:
--   psql "your-database-url" < example/seed/demo-data.sql
-- ============================================================================

-- Insert category data
-- Categories organize integrations into logical groups
INSERT INTO categories (id, name, description, icon, order_weight, enabled) VALUES
('all', 'All integrations', 'View all available integrations', 'grid', 0, true),
('devtools', 'DevTools', 'Development tools and platforms', 'code', 1, true),
('messaging', 'Messaging', 'Communication and messaging platforms', 'message-circle', 2, true),
('monitoring', 'Monitoring', 'Monitoring and observability tools', 'activity', 3, true),
('productivity', 'Productivity', 'Productivity and collaboration tools', 'zap', 4, true),
('security', 'Security', 'Security and compliance tools', 'shield', 5, true),
('searching', 'Searching', 'Search and discovery tools', 'search', 6, true);

-- Insert integration data
-- Each integration represents a tool or service that can be integrated
-- Note: icon field uses path format (/icons/name.svg) - run update-icons.sql to convert to simple-icons format
INSERT INTO integrations (id, name, description, icon, url, category, featured, tags, background_color, order_weight, enabled) VALUES
('sanity', 'Sanity', 'Real-time collaboration platform for structured content', '/icons/sanity.svg', 'https://www.sanity.io', 'devtools', true, ARRAY['cms', 'content', 'collaboration'], '#f03e2f', 100, true),
('buildkite', 'Buildkite', 'Buildkite is an open-source platform for running fast, secure, and scalable continuous integration pipelines', '/icons/buildkite.svg', 'https://buildkite.com', 'devtools', true, ARRAY['ci', 'cd', 'pipeline'], '#14cc80', 99, true),
('dato-cms', 'Dato CMS', 'Your Secure, Powerful Content Hub for Limitless Growth', '/icons/dato-cms.svg', 'https://www.datocms.com', 'devtools', true, ARRAY['cms', 'content', 'headless'], '#ff6b6b', 98, true),
('tiny-bird', 'Tiny Bird', 'Tinybird is a serverless real-time analytics platform for developers', '/icons/tiny-bird.svg', 'https://www.tinybird.co', 'devtools', true, ARRAY['analytics', 'real-time', 'data'], '#00d4ff', 97, true),
('mailchimp', 'Mailchimp', 'Grow your business with all-in-one marketing and automation', '/icons/mailchimp.svg', 'https://mailchimp.com', 'productivity', false, ARRAY['email', 'marketing', 'automation'], '#ffe01b', 50, true),
('slack', 'Slack', 'Slack is a new way to communicate with your team. It''s faster, better organized, and more secure than email.', '/icons/slack.svg', 'https://slack.com', 'messaging', false, ARRAY['chat', 'collaboration', 'team'], '#4a154b', 90, true),
('chatgpt', 'ChatGPT', 'Use AI to get answers, find inspiration and be more productive', '/icons/chatgpt.svg', 'https://chat.openai.com', 'productivity', false, ARRAY['ai', 'chat', 'assistant'], '#10a37f', 85, true),
('github', 'GitHub', 'Where the world builds software', '/icons/github.svg', 'https://github.com', 'devtools', false, ARRAY['git', 'code', 'collaboration'], '#24292e', 95, true),
('zapier', 'Zapier', 'Build custom automations to create or update issues', '/icons/zapier.svg', 'https://zapier.com', 'productivity', false, ARRAY['automation', 'integration', 'workflow'], '#ff4a00', 80, true),
('stripe', 'Stripe', 'APIs suite for online payment processing and commerce solutions', '/icons/stripe.svg', 'https://stripe.com', 'devtools', false, ARRAY['payment', 'api', 'commerce'], '#635bff', 88, true),
('clasp', 'Clasp', 'Develop Google Apps Script projects locally using clasp (Command Line Apps Script Projects)', '/icons/clasp.svg', 'https://github.com/google/clasp', 'devtools', false, ARRAY['google', 'apps-script', 'cli'], '#ea4335', 70, true),
('linear-atlas', 'Linear Atlas', 'Gain back-tested insights into your team''s performance', '/icons/linear-atlas.svg', 'https://linear.app/atlas', 'productivity', false, ARRAY['analytics', 'team', 'insights'], '#5e6ad2', 75, true),
('pipedream', 'Pipedream', 'Integration and compute platform built for developers', '/icons/pipedream.svg', 'https://pipedream.com', 'devtools', false, ARRAY['integration', 'automation', 'api'], '#0ba672', 72, true),
('webflow', 'Webflow', 'Create professional custom websites visually on CMS-powered', '/icons/webflow.svg', 'https://webflow.com', 'devtools', false, ARRAY['website', 'cms', 'design'], '#4353ff', 78, true),
('linear', 'Linear', 'Share projects easily with view-only link access', '/icons/linear.svg', 'https://linear.app', 'productivity', false, ARRAY['project-management', 'issue-tracking', 'team'], '#5e6ad2', 82, true),
('producthunt', 'Producthunt', 'Publish roadmap, call recorder and research repository', '/icons/producthunt.svg', 'https://www.producthunt.com', 'productivity', false, ARRAY['product', 'launch', 'community'], '#da552f', 68, true);

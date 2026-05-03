# Zenosite

## Project Info
- **Location:** ~/projects/zenosite
- **Shortcode:** zs
- **Backend ports:** 32400-32499
- **Frontend ports:** 43000-43499
- **Comms:** ~/projects/.agent-comms/zenosite.msg.md

## FIRST THING EVERY SESSION
1. Read your comms file at `~/projects/.agent-comms/zenosite.msg.md`
2. Read `~/.claude/CLAUDE.md` (global rules)
3. Read this file

## Status
- **Phase:** Live — static marketing website
- **Live URL:** https://siteez.labzeno.com (static files served by Nginx)
- **Tech:** Pure HTML/CSS/JS, no build step

## Site Structure
- `index.html` — main landing page
- `eula.html` — End User License Agreement
- `merchant.html` — merchant info
- `partner.html` — partner info
- `assets/` — static assets

## Tech Stack
- Pure HTML/CSS/JS (no framework, no build step)
- Served directly by Nginx as static files
- Follow `~/projects/zentemplate/CODING_STANDARD.md` if backend is added later

# Zenosite

## Project Info
- **Location:** ~/projects/zenosite
- **Shortcode:** zs
- **Backend ports:** 32400-32499 (none active — static site)
- **Frontend ports:** 43000-43499 (none active — Nginx serves static files)
- **Comms:** ~/projects/.agent-comms/zenosite.msg.md

## FIRST THING EVERY SESSION
1. Read your comms file at `~/projects/.agent-comms/zenosite.msg.md`
2. Read `~/.claude/CLAUDE.md` (global rules)
3. Read this file

## Status
- **Phase:** Live — static marketing website
- **Live URL:** https://siteez.labzeno.com (static files served by Nginx from ~/projects/zenosite/)
- **Tech:** Pure HTML/CSS/JS, no framework, no build step → PRD.md §6

## Site Structure & Flows → PRD.md §3
Four pages: `index.html` (landing), `merchant.html`, `partner.html`, `eula.html`. Assets in `assets/`.

## Non-Obvious Decisions → PRD.md §10
Key: feedback FAB removed; reveal animations default visible; no framework by design.

# Muninn website development

- Use `codex/muninn-expansion` for this work and later code changes, matching the bot repository's branch. Preserve unrelated local changes.
- Keep bot features, command examples and data disclosures consistent with `/workspace/Discord-AIChatbot`. Keep its `site/` copy aligned with this authoritative website.
- Prepare changes on the branch; publish the home page only after the owner explicitly says "go live".
- Keep personal email addresses, private identifying details and credentials out of the repository. Public developer names are Jack or Odin.
- When Terms or Privacy change, update `effectiveDate` in `config.js` and fallback dates in the pages. Use `/feedback` and developer contact in Discord for support.
- Static HTML/CSS/JavaScript; no dependency installation or build. Validate local links, JavaScript syntax, mobile layout, accessibility and local HTTP responses before handing off.
- Use the existing isolated checkout, not a new worktree unless explicitly requested.

# Muninn-SubDetails-Website

Website for the **Muninn** Discord bot: home page, Terms of Service and Privacy Policy.
Hosted with GitHub Pages:

- Home: https://jackodinn.github.io/Muninn-SubDetails-Website/
- Terms of Service: https://jackodinn.github.io/Muninn-SubDetails-Website/terms.html
- Privacy Policy: https://jackodinn.github.io/Muninn-SubDetails-Website/privacy.html

## Files

- `config.js`: bot name, developer, support link, Application ID and the "Effective" date. Every page reads these.
- `style.css`: the whole design (dark by default, light when the visitor's system is in light mode).
- `site.js`: fade-in on scroll, and the "On this page" list on the Terms and Privacy pages (built from their headings).
- `assets/`: game pictures for the home page, drawn by the bot itself.

Keep `privacy.html` accurate when the bot starts storing or sending new kinds of data, and update
`effectiveDate` in `config.js` when the Terms or Privacy Policy change.


## Community expansion branch

Continue implementation work on `codex/muninn-expansion`, matching the bot repository. The owner approved publishing the current expansion with **go live** on October 19, 2026.
Continue later edits on this same branch; obtain publication authorization for subsequent releases.
The updated pages cover quests, cosmetics, suggestions, tags, opt-in events, tournaments, matchmaking,
private study decks/bookmarks, data controls, AI limits, digests, reaction GIFs and optional NYT Wordle.
AI source drafts need review; NYT connectivity remains dependent on service access policy.

Both repositories’ website files must stay aligned. Bot source changes require matching command and
privacy updates. Keep personal email addresses out of source; use the configured public support link
and direct private data requests through Discord. No credentials belong in either repository.

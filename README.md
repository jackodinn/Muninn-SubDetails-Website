# Muninn-SubDetails-Website

Website for the **Muninn** Discord bot: home page, Terms of Service and Privacy Policy.
Hosted with GitHub Pages:

- Home: https://jackodinn.github.io/Muninn-SubDetails-Website/
- Terms of Service: https://jackodinn.github.io/Muninn-SubDetails-Website/terms.html
- Privacy Policy: https://jackodinn.github.io/Muninn-SubDetails-Website/privacy.html

## Files

- `config.js`: bot name, developer, contact email, Application ID and the "Effective" date. Every page reads these.
- `style.css`: the whole design (dark by default, light when the visitor's system is in light mode).
- `site.js`: fade-in on scroll, and the "On this page" list on the Terms and Privacy pages (built from their headings).
- `assets/`: game pictures for the home page, drawn by the bot itself.

Keep `privacy.html` accurate when the bot starts storing or sending new kinds of data, and update
`effectiveDate` in `config.js` when the Terms or Privacy Policy change.

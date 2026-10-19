// Edit these values; every page picks them up.
window.SITE = {
  botName: 'Muninn',
  developer: 'Odin',
  supportUrl: 'https://github.com/jackodinn/Discord-AIChatbot/issues', // Public support only; use Discord for private requests
  applicationId: '766474857352527912', // Developer Portal → General Information → Application ID
  effectiveDate: 'October 19, 2026',
};

// Fill placeholders like <span data-site="botName"></span> and the invite link.
document.addEventListener('DOMContentLoaded', () => {
  for (const el of document.querySelectorAll('[data-site]')) el.textContent = window.SITE[el.dataset.site];
  for (const el of document.querySelectorAll('[data-contact]')) {
    el.href = window.SITE.supportUrl;
    if (el.dataset.contact !== 'link') el.textContent = 'Contact the developer'; // "link" keeps the text
  }
  // Every "Add to Discord" button (data-invite) gets the invite link, or is hidden without an Application ID.
  const hasId = /^\d+$/.test(window.SITE.applicationId);
  for (const invite of document.querySelectorAll('[data-invite]')) {
    if (!hasId) invite.hidden = true;
    else invite.href = `https://discord.com/oauth2/authorize?client_id=${window.SITE.applicationId}&permissions=564358971518032&scope=bot%20applications.commands`;
  }
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
  document.title = document.title.replace('Muninn', window.SITE.botName);
});

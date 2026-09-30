// Edit these values; every page picks them up.
window.SITE = {
  botName: 'Muninn',
  developer: 'Odin',
  contactEmail: 'jackodinn@gmail.com', // where people can ask for data deletion
  applicationId: '766474857352527912', // Developer Portal → General Information → Application ID
  effectiveDate: 'September 30, 2026',
};

// Fill placeholders like <span data-site="botName"></span> and the invite link.
document.addEventListener('DOMContentLoaded', () => {
  for (const el of document.querySelectorAll('[data-site]')) el.textContent = window.SITE[el.dataset.site];
  for (const el of document.querySelectorAll('[data-mailto]')) {
    el.href = `mailto:${window.SITE.contactEmail}`;
    if (el.dataset.mailto !== 'link') el.textContent = window.SITE.contactEmail; // "link" keeps the text
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

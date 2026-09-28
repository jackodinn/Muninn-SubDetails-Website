// Edit these values; every page picks them up.
window.SITE = {
  botName: 'Muninn',
  developer: 'Odin',
  contactEmail: 'jackodinn@gmail.com', // where people can ask for data deletion
  applicationId: 'YOUR_APP_ID', // Developer Portal → General Information → Application ID
  effectiveDate: 'September 28, 2026',
};

// Fill placeholders like <span data-site="botName"></span> and the invite link.
document.addEventListener('DOMContentLoaded', () => {
  for (const el of document.querySelectorAll('[data-site]')) el.textContent = window.SITE[el.dataset.site];
  for (const el of document.querySelectorAll('[data-mailto]')) {
    el.href = `mailto:${window.SITE.contactEmail}`;
    el.textContent = window.SITE.contactEmail;
  }
  const invite = document.getElementById('invite');
  if (invite && !/^\d+$/.test(window.SITE.applicationId)) {
    invite.hidden = true; // no Application ID yet, so there's no valid invite link
  } else if (invite) {
    invite.href = `https://discord.com/oauth2/authorize?client_id=${window.SITE.applicationId}&permissions=564358971518032&scope=bot%20applications.commands`;
  }
  document.title = document.title.replace('Muninn', window.SITE.botName);
});

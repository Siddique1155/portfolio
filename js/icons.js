/* Inline SVG icons — no icon font or external image requests. */
const ICONS = {
  whatsapp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z"/><path d="M8.5 9.3c.2-.9 1-1.5 1.9-1.3.3 1 .7 1.9 1.3 2.7-.4.6-.9 1-1.5 1.3.6 1.3 1.6 2.3 2.9 2.9.3-.6.7-1.1 1.3-1.5.8.6 1.7 1 2.7 1.3.2.9-.4 1.7-1.3 1.9-3.6.8-7.5-3.1-6.7-6.7Z"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M15 8.5h-2c-.6 0-1 .5-1 1.1V12h3l-.4 3h-2.6v7h-3v-7H7v-3h1.8v-2.1C8.8 7.6 10.3 6 13 6h2v2.5Z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="6" width="18" height="12" rx="3"/><path d="M11 10.5v3l2.6-1.5-2.6-1.5Z" fill="currentColor" stroke="none"/></svg>`,
  telegram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m21 4-18 7.2 5.6 1.8L20 6l-9.4 8.8.4 5 2.6-3.2L18 20 21 4Z" stroke-linejoin="round"/></svg>`,
  web: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.2 2.3 3.3 5.3 3.3 8.5s-1.1 6.2-3.3 8.5c-2.2-2.3-3.3-5.3-3.3-8.5S9.8 5.8 12 3.5Z"/></svg>`,
  email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="M4.5 7 12 12.5 19.5 7"/></svg>`,
  crm: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="3.2"/><path d="M5 20c.6-3.6 3.4-6 7-6s6.4 2.4 7 6"/></svg>`,
  sheets: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="3.5" width="16" height="17" rx="2"/><path d="M4 9.5h16M4 14.5h16M10 9.5v11"/></svg>`,
  automation: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="5.5" cy="6" r="2"/><circle cx="18.5" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M7.3 7 12 16M16.7 7 12 16"/></svg>`,
  agent: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="6" y="6" width="12" height="12" rx="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><circle cx="9.5" cy="10.5" r=".8" fill="currentColor" stroke="none"/><circle cx="14.5" cy="10.5" r=".8" fill="currentColor" stroke="none"/><path d="M9 14.5c1 .8 3 .8 4 0"/></svg>`,
  social: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6" cy="12" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="18" cy="18" r="2.4"/><path d="m8.1 10.8 7.8-3.6M8.1 13.2l7.8 3.6"/></svg>`,
  wordpress: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="8.5"/><path d="M4 10.5 8 17l1.7-5.5L11.5 17l4-9M15 8h3"/></svg>`,
  custom: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3.5 5 6v6c0 4.4 3 7.4 7 8.5 4-1.1 7-4.1 7-8.5V6l-7-2.5Z"/><path d="M9 12l2 2 4-4"/></svg>`,
  code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m9 8-4 4 4 4M15 8l4 4-4 4"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M8 10.5v6M8 7.8v.1M12.5 16.5v-3.7c0-1.3.9-2.1 2-2.1s1.8.8 1.8 2.1v3.7"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2-.2 4.5-1 4.5-4.5 0-1-.4-1.8-1-2.5.1-.2.4-1.2-.1-2.5 0 0-.8-.3-2.8 1a9.4 9.4 0 0 0-5 0c-2-1.3-2.8-1-2.8-1-.5 1.3-.2 2.3-.1 2.5-.6.7-1 1.5-1 2.5 0 3.5 2.5 4.3 4.5 4.5-.3.3-.5.7-.5 1.3V19"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  external: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3M15 4h5v5M20 4l-9 9"/></svg>`,
};

function mountIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach((el) => {
    const key = el.getAttribute('data-icon');
    if (ICONS[key] && !el.dataset.mounted) {
      el.innerHTML = ICONS[key];
      el.dataset.mounted = 'true';
    }
  });
}

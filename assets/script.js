/* Set this to a verified public HTTPS contact page or mailto address before opening submissions. */
const CONTACT_URL = '';

const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
toggle.hidden = false;
navigation.classList.add('menu-ready');
function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    toggle.focus();
  }
});

if (CONTACT_URL && /^(https:\/\/|mailto:)[^\s]+$/i.test(CONTACT_URL)) {
  const contact = document.querySelector('#contact-link');
  contact.href = CONTACT_URL;
  contact.hidden = false;
  document.querySelector('#contact-status').textContent = 'Use our verified contact channel to send your proposal. Every project is subject to review and written terms.';
}

const copyButton = document.querySelector('#copy-proposal');
const checklist = 'Reborn Chains — Coin proposal\n\nCoin name and ticker:\nOfficial website:\nSource-code repository:\nExplorer (if available):\nCurrent chain status:\nMasternode collateral and requirements:\nCommunity links:\nYour role and public contact:\nProposed use cases:\nSupport requested:\n\nNever include private keys, seed phrases or passwords.';
copyButton.hidden = false;
copyButton.addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(checklist);
    status.textContent = 'Checklist copied. Complete it and keep it ready for submission.';
  } catch {
    status.textContent = 'Copy is unavailable in this browser. Select and copy the checklist text above manually.';
  }
});

const rotationToggle = document.querySelector(".rotation-toggle");
if (rotationToggle) {
  rotationToggle.hidden = false;
  rotationToggle.addEventListener("click", () => {
    const paused = rotationToggle.getAttribute("aria-pressed") !== "true";
    rotationToggle.setAttribute("aria-pressed", String(paused));
    rotationToggle.textContent = paused ? "Resume rotation" : "Pause rotation";
    document.querySelector(".hero-art").classList.toggle("phoenix-paused", paused);
  });
}

const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const nav = $('#nav'), menu = $('#menuToggle');

$('#themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('light');
  $('#themeToggle').textContent = document.body.classList.contains('light') ? '☀' : '☾';
});
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.textContent = open ? '✕' : '☰';
  menu.setAttribute('aria-expanded', String(open));
});
$$('nav a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open'); menu.textContent = '☰';
}));
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    if (entry.target.id) $$('nav a').forEach(a => a.classList.toggle('active', a.hash === '#'+entry.target.id));
    observer.unobserve(entry.target);
  }
}), {threshold:.12});
$$('.hero-copy,.hero-visual,.section-head,.about-copy,.about-art,.skill-card,.tool-list,.project-card,.contact-copy,.contact-form').forEach(el => {
  el.classList.add('reveal'); observer.observe(el);
});
$$('.filters button').forEach(btn => btn.addEventListener('click', () => {
  $$('.filters button').forEach(b => b.classList.toggle('active', b === btn));
  $$('.project-card').forEach(card => card.classList.toggle('hidden', btn.dataset.filter !== 'all' && card.dataset.type !== btn.dataset.filter));
}));
const dialog = $('#projectDialog');
$$('.detail-btn').forEach(btn => btn.addEventListener('click', () => {
  $('#dialogTitle').textContent = btn.dataset.title;
  dialog.showModal();
}));
$('#closeDialog').addEventListener('click', () => dialog.close());
$('#dialogOk').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
$('#contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#name').value.trim(), email = $('#email').value.trim(), message = $('#message').value.trim();
  const subject = encodeURIComponent('Pesan portfolio dari ' + name);
  const body = encodeURIComponent('Nama: '+name+'\nEmail: '+email+'\n\nPesan:\n'+message);
  $('#formStatus').textContent = 'Aplikasi email akan dibuka. Periksa pesan sebelum mengirim.';
  window.location.href = `mailto:hanafi.maulana@example.com?subject=${subject}&body=${body}`;
});
window.addEventListener('scroll', () => $('.nav-wrap').classList.toggle('scrolled', scrollY > 10), {passive:true});
$('#year').textContent = new Date().getFullYear();

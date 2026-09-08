const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const layers = [...document.querySelectorAll('[data-depth]')];
const chapters = [...document.querySelectorAll('.chapter')];
const links = [...document.querySelectorAll('.nav-products a')];
let frame = 0;

function render() {
  frame = 0;
  const height = window.innerHeight;
  const y = window.scrollY;
  const distance = document.documentElement.scrollHeight - height;
  document.documentElement.style.setProperty('--progress', distance > 0 ? y / distance : 0);
  const active = chapters.find(section => {
    const box = section.getBoundingClientRect();
    return box.top < height * .5 && box.bottom > height * .5;
  });
  links.forEach(link => {
    const selected = link.hash === `#${active?.id}`;
    link.classList.toggle('active', selected);
    if (selected) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  layers.forEach(layer => {
    // Measure the untransformed parent so motion cannot feed back into its own position.
    const section = layer.closest('.chapter, .hero');
    const bounds = section.getBoundingClientRect();
    const delta = Math.max(-height, Math.min(height, height * .35 - bounds.top));
    layer.style.setProperty('--dy', `${motionPreference.matches ? 0 : delta * Number(layer.dataset.depth)}px`);
  });
  const alarm = document.querySelector('.alarm').getBoundingClientRect();
  document.querySelector('.clock-ring').style.setProperty('--rotation', `${motionPreference.matches ? 0 : -alarm.top * .025}deg`);
  const trade = document.querySelector('.trade').getBoundingClientRect();
  const amount = Math.max(0, Math.min(1, (height - trade.top) / (height * .9)));
  document.querySelector('.frontier').style.setProperty('--draw', motionPreference.matches ? 0 : (1 - amount) * 600);
}
function schedule() { if (!frame) frame = requestAnimationFrame(render); }
document.documentElement.classList.add('motion-ready');
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .15 });
document.querySelectorAll('[data-reveal]').forEach(node => observer.observe(node));
window.addEventListener('scroll', schedule, { passive: true });
window.addEventListener('resize', schedule);
motionPreference.addEventListener('change', schedule);
render();

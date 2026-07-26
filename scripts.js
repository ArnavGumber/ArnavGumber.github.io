const navToggle = document.querySelector('.nav-toggle');
const header = document.querySelector('.site-header');
const progressBar = document.querySelector('.scroll-progress');
const spotlight = document.querySelector('.cursor-spotlight');
const revealItems = document.querySelectorAll('.reveal');
const year = document.getElementById('year');
const magnetics = document.querySelectorAll('.magnetic');
const form = document.getElementById('contact-form');
const formStatus = document.querySelector('.form-status');

if (year) {
  year.textContent = new Date().getFullYear();
}

document.body.classList.remove('is-loading');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    header.classList.toggle('nav-open');
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
  });
}

const updateProgress = () => {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
  if (progressBar) {
    progressBar.style.transform = `scaleX(${progress})`;
  }
};

window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('load', updateProgress);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));

window.addEventListener('mousemove', (event) => {
  if (!spotlight) return;
  spotlight.style.left = `${event.clientX}px`;
  spotlight.style.top = `${event.clientY}px`;
});

magnetics.forEach((button) => {
  button.addEventListener('mousemove', (event) => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const offsetX = (x / rect.width - 0.5) * 8;
    const offsetY = (y / rect.height - 0.5) * 8;
    button.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = '';
  });
});

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (formStatus) {
      formStatus.textContent = 'Thanks for reaching out. I will reply as soon as I can.';
    }
    form.reset();
  });
}


// ── Init Lucide Icons ──
lucide.createIcons();

// ── Typewriter ──
(function () {
  const words  = ['Analista de Dados', 'Desenvolvedora Web', 'Programadora', 'Full Stack Dev', 'Especialista em BI'];
  const el     = document.getElementById('typewriter');
  let wi = 0, ci = 0, deleting = false;
  const SPEED_TYPE = 80, SPEED_DEL = 45, PAUSE = 1800;

  function tick() {
    const word    = words[wi];
    el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);

    if (!deleting && ci > word.length) {
      deleting = true;
      setTimeout(tick, PAUSE);
      return;
    }
    if (deleting && ci < 0) {
      deleting = false;
      ci = 0;
      wi = (wi + 1) % words.length;
    }
    setTimeout(tick, deleting ? SPEED_DEL : SPEED_TYPE);
  }
  tick();
})();

// ── Cursor glow ──
const cursorGlow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', e => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

// ── Back to top ──
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.borderBottomColor = 'rgba(168,85,247,0.2)';
  } else {
    navbar.style.borderBottomColor = 'rgba(168,85,247,0.1)';
  }
}, { passive: true });

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');
const observer  = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));

function setActive(el) {
  navLinks.forEach(l => l.classList.remove('active'));
  el.classList.add('active');
}

// ── Mobile menu ──
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon   = document.getElementById('menu-icon');
let   menuOpen   = false;

function toggleMenu() {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  menuIcon.setAttribute('data-lucide', menuOpen ? 'x' : 'menu');
  lucide.createIcons();
}
function closeMobileMenu() {
  menuOpen = false;
  mobileMenu.classList.remove('open');
  menuIcon.setAttribute('data-lucide', 'menu');
  lucide.createIcons();
}

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Progress bars — anima quando entra na viewport ──
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const target = fill.dataset.width || '0';
      setTimeout(() => { fill.style.width = target + '%'; }, 150);
      barObserver.unobserve(fill);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.progress-bar-fill').forEach(el => barObserver.observe(el));

// ── Timeline cards — fade-in + slide-up ao entrar na viewport ──
const tlObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('tl-visible'), i * 120);
      tlObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.tl-card').forEach(el => tlObserver.observe(el));

// ── 3D Tilt on project cards ──
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect   = card.getBoundingClientRect();
    const cx     = rect.left + rect.width  / 2;
    const cy     = rect.top  + rect.height / 2;
    const dx     = (e.clientX - cx) / (rect.width  / 2);
    const dy     = (e.clientY - cy) / (rect.height / 2);
    const rotX   = -dy * 7;
    const rotY   =  dx * 7;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
  });
});

// ── Contact form — envia via EmailJS ──
function sendContactEmail(btn) {
  const wrap    = btn.closest('.glass-card');
  const inputs  = wrap.querySelectorAll('.contact-input');
  const name    = inputs[0].value.trim();
  const email   = inputs[1].value.trim();
  const message = inputs[2].value.trim();

  if (!name || !email || !message) {
    btn.querySelector('span').innerHTML = '<i data-lucide="alert-circle" class="w-4 h-4"></i> Preencha todos os campos';
    lucide.createIcons();
    setTimeout(() => {
      btn.querySelector('span').innerHTML = '<i data-lucide="send" class="w-4 h-4"></i> Enviar Mensagem';
      lucide.createIcons();
    }, 2500);
    return;
  }

  btn.disabled = true;
  btn.querySelector('span').innerHTML = '<i data-lucide="loader" class="w-4 h-4 animate-spin"></i> Enviando...';
  lucide.createIcons();

  emailjs.send('service_mu3ihmp', 'template_skzrip1', {
    name:    name,
    email:   email,
    message: message,
    title:   `Contato via Portfólio — ${name}`,
  })
  .then(() => {
    btn.querySelector('span').innerHTML = '<i data-lucide="check" class="w-4 h-4"></i> Mensagem enviada!';
    lucide.createIcons();
    inputs.forEach(i => i.value = '');
    setTimeout(() => {
      btn.disabled = false;
      btn.querySelector('span').innerHTML = '<i data-lucide="send" class="w-4 h-4"></i> Enviar Mensagem';
      lucide.createIcons();
    }, 3000);
  })
  .catch(() => {
    btn.querySelector('span').innerHTML = '<i data-lucide="x-circle" class="w-4 h-4"></i> Erro ao enviar. Tente novamente.';
    lucide.createIcons();
    btn.disabled = false;
    setTimeout(() => {
      btn.querySelector('span').innerHTML = '<i data-lucide="send" class="w-4 h-4"></i> Enviar Mensagem';
      lucide.createIcons();
    }, 3000);
  });
}

// ── Project filter ──
function filterProjects(btn, category) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const cards  = document.querySelectorAll('.project-card');
  const noProj = document.getElementById('no-projects');
  let   visible = 0;

  cards.forEach((card, i) => {
    const match = category === 'all' || card.dataset.category === category;
    if (match) {
      card.style.display = '';
      card.style.animation = 'none';
      card.offsetHeight;
      card.style.animation = `cardReveal 0.45s cubic-bezier(0.23,1,0.32,1) ${i * 60}ms both`;
      visible++;
    } else {
      card.style.display = 'none';
    }
  });

  noProj.classList.toggle('hidden', visible > 0);
}

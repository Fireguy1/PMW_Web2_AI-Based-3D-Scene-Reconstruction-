/* ═══════════════════════════════════════════════════
   HeriTeq — script.js
   ═══════════════════════════════════════════════════ */

/* ─── Mouse Spotlight ─── */
const spotlight = document.getElementById('spotlight');
document.addEventListener('mousemove', (e) => {
  spotlight.style.left = e.clientX + 'px';
  spotlight.style.top  = e.clientY + 'px';
});

/* ─── Navbar: scroll effect + active link ─── */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Glassmorphism on scroll
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link highlight
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

/* ─── Hamburger menu ─── */
const hamburger  = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  hamburger.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

/* ─── Reveal on scroll (Intersection Observer) ─── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

/* ─── Smooth scroll for all anchor links ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ─── Subtle card tilt on mouse move ─── */
function addTilt(selector, maxTilt = 6) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect  = card.getBoundingClientRect();
      const x     = (e.clientX - rect.left) / rect.width  - 0.5;
      const y     = (e.clientY - rect.top)  / rect.height - 0.5;
      const tiltX = -y * maxTilt;
      const tiltY =  x * maxTilt;
      card.style.transform = `translateY(-8px) perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

addTilt('.feature-card', 5);
addTilt('.about-card', 4);
addTilt('.theme-card', 4);

/* ─── Typing effect in hero tagline ─── */
function typeWriter(el, text, speed = 55) {
  el.textContent = '';
  let i = 0;
  function tick() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(tick, speed);
    } else {
      el.style.borderRight = 'none';
    }
  }
  el.style.borderRight = '2px solid #146C94';
  el.style.display = 'inline';
  setTimeout(tick, 800);
}

const taglineEl = document.querySelector('.hero-tagline');
if (taglineEl) {
  const originalText = taglineEl.textContent.trim().replace(/\s+/g, ' ');
  typeWriter(taglineEl, originalText, 40);
}

/* ─── Number counter animation ─── */
// reserved for future stats section

/* ─── Page load fade-in ─── */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

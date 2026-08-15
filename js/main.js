/**
 * ==========================================================================
 * GOBIKA S - PORTFOLIO JAVASCRIPT
 * Interactive Features: Theme Switcher, Typed Text, Modals, Toast Alerts,
 * Project Filters, Clipboard Actions, and Smooth Scroll
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. THEME TOGGLE (DARK / LIGHT MODE)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const htmlElement = document.documentElement;

  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem('gobika-portfolio-theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode ✨`);
    });
  }

  function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('gobika-portfolio-theme', theme);

    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.className = 'fa-solid fa-sun';
        themeIcon.style.color = '#f59e0b';
      } else {
        themeIcon.className = 'fa-solid fa-moon';
        themeIcon.style.color = '';
      }
    }
  }

  // --------------------------------------------------------------------------
  // 2. DYNAMIC TYPED TEXT EFFECT IN HERO
  // --------------------------------------------------------------------------
  const typedOutput = document.getElementById('typed-output');
  const roles = [
    'B.Tech Information Technology',
    'Aspiring Software Engineer',
    'Innovation Project Coordinator',
    'IIC Student Coordinator (IT)',
    'Executive Member - Student Association'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const pauseBetweenRoles = 1800;

  function typeEffect() {
    if (!typedOutput) return;

    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      typedOutput.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, pauseBetweenRoles);
        return;
      }
    } else {
      typedOutput.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
  }

  typeEffect();

  // --------------------------------------------------------------------------
  // 3. NAVBAR SCROLL EFFECT & ACTIVE LINK HIGHLIGHTING
  // --------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Navbar backdrop blur on scroll
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Active link highlighting
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Back to top click action
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4. MOBILE NAVIGATION DRAWER
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. PROJECT FILTER FUNCTIONALITY
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hide');
          card.style.display = 'flex';
        } else {
          card.classList.add('hide');
          card.style.display = 'none';
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 6. RESUME MODAL HANDLERS
  // --------------------------------------------------------------------------
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtn = document.getElementById('open-resume-btn');
  const heroViewResumeBtn = document.getElementById('hero-view-resume-btn');
  const closeResumeModalBtn = document.getElementById('close-resume-modal-btn');
  const modalCloseActionBtn = document.getElementById('modal-close-action-btn');

  function openResume() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResume() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  if (openResumeBtn) openResumeBtn.addEventListener('click', openResume);
  if (heroViewResumeBtn) heroViewResumeBtn.addEventListener('click', openResume);
  if (closeResumeModalBtn) closeResumeModalBtn.addEventListener('click', closeResume);
  if (modalCloseActionBtn) modalCloseActionBtn.addEventListener('click', closeResume);

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResume();
    });
  }

  // --------------------------------------------------------------------------
  // 7. PROJECT DETAILS MODAL HANDLERS
  // --------------------------------------------------------------------------
  const projectDetailModal = document.getElementById('project-detail-modal');
  const projDetailTitle = document.getElementById('proj-detail-title');
  const projDetailBody = document.getElementById('proj-detail-body');
  const closeProjModalBtn = document.getElementById('close-project-modal-btn');
  const closeProjFooterBtn = document.getElementById('close-project-modal-footer-btn');

  const projectDetailsMap = {
    '1': {
      title: 'Campus Innovation & Project Exhibition Tracker',
      content: `
        <h4 style="color: var(--primary-cyan); margin-bottom: 0.5rem;">Project Overview</h4>
        <p style="color: var(--text-secondary); margin-bottom: 1rem;">
          Designed to streamline project exhibitions organized under the Innovation Project Coordination role at Nandha Engineering College. It empowers student innovators to submit project abstracts, upload demo materials, and view jury review schedules.
        </p>
        <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">Key Highlights</h4>
        <ul style="color: var(--text-secondary); margin-left: 1.25rem; margin-bottom: 1rem;">
          <li>Interactive roster for cross-disciplinary project showcases.</li>
          <li>Categorized evaluation metrics for innovation prototypes.</li>
          <li>Responsive glassmorphic user interface built with HTML5 & modern CSS.</li>
        </ul>
      `
    },
    '2': {
      title: 'Research Paper: Future Paradigms in Next-Gen IT',
      content: `
        <h4 style="color: var(--primary-cyan); margin-bottom: 0.5rem;">Research Scope & Presentation</h4>
        <p style="color: var(--text-secondary); margin-bottom: 1rem;">
          Presented at an inter-collegiate state-level technical symposium. The paper synthesizes contemporary advancements in cloud computing architectures, data processing pipelines, and AI-driven automation systems.
        </p>
        <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">Presentation Highlights</h4>
        <ul style="color: var(--text-secondary); margin-left: 1.25rem; margin-bottom: 1rem;">
          <li>Detailed analysis of scalable web enterprise infrastructures.</li>
          <li>Comparative study on cybersecurity best practices for students.</li>
          <li>Created high-impact visual slide decks using advanced MS PowerPoint formatting.</li>
        </ul>
      `
    },
    '3': {
      title: 'Innovative Engineering Solution & Prototype Demo',
      content: `
        <h4 style="color: var(--primary-cyan); margin-bottom: 0.5rem;">Prototype Demonstration</h4>
        <p style="color: var(--text-secondary); margin-bottom: 1rem;">
          Developed and defended a practical prototype solution addressing departmental communication bottlenecks, ensuring rapid broadcast of emergency academic circulars and event deadlines.
        </p>
        <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">Outcomes</h4>
        <ul style="color: var(--text-secondary); margin-left: 1.25rem; margin-bottom: 1rem;">
          <li>Hands-on system modeling and requirements gathering.</li>
          <li>Live exhibition demonstration in front of external faculty evaluators.</li>
          <li>Received commendation for clarity of presentation and structured documentation.</li>
        </ul>
      `
    },
    '4': {
      title: 'Interactive Student IT Association Hub',
      content: `
        <h4 style="color: var(--primary-cyan); margin-bottom: 0.5rem;">Departmental Association Portal</h4>
        <p style="color: var(--text-secondary); margin-bottom: 1rem;">
          Developed as part of the Executive Member responsibilities for the IT Student Association. The hub centralizes tech symposium registrations, coding challenge notifications, and guest speaker announcements.
        </p>
        <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">Features</h4>
        <ul style="color: var(--text-secondary); margin-left: 1.25rem; margin-bottom: 1rem;">
          <li>Modern event countdown and dynamic registration links.</li>
          <li>Clean mobile-optimized layout accessible across campus devices.</li>
          <li>Accessible information hierarchy with semantic HTML.</li>
        </ul>
      `
    },
    '5': {
      title: 'Hands-On Technical Workshop: Emerging Web Tech',
      content: `
        <h4 style="color: var(--primary-cyan); margin-bottom: 0.5rem;">Workshop Milestone</h4>
        <p style="color: var(--text-secondary); margin-bottom: 1rem;">
          Completed intensive practical lab sessions exploring modern front-end styling systems, CSS Grid layouts, flex architectures, and DOM manipulation methods.
        </p>
        <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">Skills Acquired</h4>
        <ul style="color: var(--text-secondary); margin-left: 1.25rem; margin-bottom: 1rem;">
          <li>Responsive design techniques for diverse viewport sizes.</li>
          <li>Web performance optimization and structured code formatting.</li>
          <li>Practical application in engineering lab environments.</li>
        </ul>
      `
    },
    '6': {
      title: 'Modern Recruiter-Ready Portfolio System',
      content: `
        <h4 style="color: var(--primary-cyan); margin-bottom: 0.5rem;">Personal Brand Platform</h4>
        <p style="color: var(--text-secondary); margin-bottom: 1rem;">
          Built from the ground up to present academic credentials, leadership experience as an Innovation and IIC Coordinator, and technical skills in a pristine, recruiter-friendly digital interface.
        </p>
        <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">Technical Specs</h4>
        <ul style="color: var(--text-secondary); margin-left: 1.25rem; margin-bottom: 1rem;">
          <li>Pure HTML5 & Vanilla CSS3 Design System (Glassmorphism + Dark/Light Theme).</li>
          <li>1-Click interactive recruiter actions (Copy email/phone with toast alerts).</li>
          <li>Fully responsive, fast-loading, and SEO-optimized architecture.</li>
        </ul>
      `
    }
  };

  document.querySelectorAll('.view-project-detail-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-project');
      const data = projectDetailsMap[projId];

      if (data && projectDetailModal && projDetailTitle && projDetailBody) {
        projDetailTitle.textContent = data.title;
        projDetailBody.innerHTML = data.content;
        projectDetailModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeProjectModal() {
    if (projectDetailModal) {
      projectDetailModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  if (closeProjModalBtn) closeProjModalBtn.addEventListener('click', closeProjectModal);
  if (closeProjFooterBtn) closeProjFooterBtn.addEventListener('click', closeProjectModal);

  if (projectDetailModal) {
    projectDetailModal.addEventListener('click', (e) => {
      if (e.target === projectDetailModal) closeProjectModal();
    });
  }

  // --------------------------------------------------------------------------
  // 8. 1-CLICK COPY TO CLIPBOARD & TOAST SYSTEM
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyPhoneBtn = document.getElementById('copy-phone-btn');
  const toastAlert = document.getElementById('toast-alert');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(msg) {
    if (!toastAlert || !toastMessage) return;
    toastMessage.textContent = msg;
    toastAlert.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastAlert.classList.remove('show');
    }, 3500);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'gopika.sr2006@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied Email: ${email} 📋`);
      }).catch(() => {
        showToast('Email: gopika.sr2006@gmail.com');
      });
    });
  }

  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      const phone = '+916369273921';
      navigator.clipboard.writeText(phone).then(() => {
        showToast(`Copied Phone: ${phone} 📞`);
      }).catch(() => {
        showToast('Phone: +91 6369273921');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 9. CONTACT FORM INTERACTION
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('sender-name')?.value.trim() || 'Recruiter';
      const email = document.getElementById('sender-email')?.value.trim() || '';
      const subject = document.getElementById('sender-subject')?.value.trim() || '';
      const message = document.getElementById('sender-message')?.value.trim() || '';

      // Direct mailto fallback link constructor
      const mailtoLink = `mailto:gopika.sr2006@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;

      showToast(`Thank you, ${name}! Opening your email client... 🚀`);
      
      setTimeout(() => {
        window.location.href = mailtoLink;
        contactForm.reset();
      }, 1000);
    });
  }

  // --------------------------------------------------------------------------
  // 10. CURRENT YEAR IN FOOTER
  // --------------------------------------------------------------------------
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 11. KEYBOARD ACCESSIBILITY (ESC to close modals)
  // --------------------------------------------------------------------------
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeResume();
      closeProjectModal();
    }
  });

});

/**
 * Celebso Startup School - Main Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initProgressBar();
  initNavbar();
  initScrollAnimations();
  initCardSpotlight();
  initSmoothAnchors();
  initAccordions();
  initApplyModal();
  initInsightsFilter();
  initCounters();
  initFormSubmissions();
});

/* Top Reading Progress Bar */
function initProgressBar() {
  let bar = document.getElementById('scrollProgressBar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'scrollProgressBar';
    document.body.prepend(bar);
  }

  const updateProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      bar.style.width = Math.min(Math.max(progress, 0), 100) + '%';
    }
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/* Navbar Scroll & Mobile Menu */
function initNavbar() {
  const navbar = document.querySelector('.navbar, .header');
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.nav-menu, .nav-links');

  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      const isOpen = menu.classList.contains('open');
      toggle.innerHTML = isOpen 
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    });

    // Close menu on click outside
    document.addEventListener('click', (e) => {
      if (navbar && !navbar.contains(e.target) && menu.classList.contains('open')) {
        menu.classList.remove('open');
      }
    });
  }
}

/* Scroll Reveal with Staggered Cascades */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  };

  // Pre-calculate stagger indexes for grid and child groups
  document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
    const children = el.querySelectorAll('.glass-card, .mentor-card, .phase-card, .stat-item, .faq-item, .chips-group > *');
    if (children.length > 0) {
      children.forEach((child, index) => {
        child.style.setProperty('--stagger-index', index);
      });
    }
  });

  // Also auto-stagger direct grids
  document.querySelectorAll('.stats-grid, .mentors-grid, .phases-grid, .articles-grid').forEach((grid) => {
    Array.from(grid.children).forEach((child, index) => {
      child.style.setProperty('--stagger-index', index);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
    observer.observe(el);
  });
}

/* Dynamic Mouse Spotlight on Interactive Cards */
function initCardSpotlight() {
  const cards = document.querySelectorAll(
    '.glass-card, .mentor-card, .phase-card, .founder-video-card, .stat-item'
  );

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mouse-x', '-500px');
      card.style.setProperty('--mouse-y', '-500px');
    });
  });
}

/* Smooth Scrolling for internal links */
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* FAQ Accordions */
function initAccordions() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Optional: close other accordions in the same list
        const parentList = item.closest('.faq-list');
        if (parentList) {
          parentList.querySelectorAll('.faq-item').forEach((sibling) => {
            if (sibling !== item) sibling.classList.remove('active');
          });
        }

        item.classList.toggle('active', !isActive);
      });
    }
  });
}

/* Apply Now Modal */
function initApplyModal() {
  const modal = document.getElementById('applyModal');
  const openButtons = document.querySelectorAll('[data-action="open-apply-modal"]');
  const closeBtn = document.querySelector('.modal-close');

  if (!modal) return;

  const openModal = (e) => {
    if (e) e.preventDefault();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  openButtons.forEach((btn) => btn.addEventListener('click', openModal));

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* Insights Search and Category Filter */
function initInsightsFilter() {
  const searchInput = document.getElementById('insightsSearch');
  const filterBtns = document.querySelectorAll('[data-category-btn]');
  const articles = document.querySelectorAll('[data-article-category]');

  if (!articles.length) return;

  let currentCategory = 'all';
  let currentSearch = '';

  const filterArticles = () => {
    articles.forEach((article) => {
      const category = article.getAttribute('data-article-category') || '';
      const title = (article.querySelector('h3, h4')?.textContent || '').toLowerCase();
      const desc = (article.querySelector('p')?.textContent || '').toLowerCase();

      const matchesCat = currentCategory === 'all' || category.toLowerCase().includes(currentCategory.toLowerCase());
      const matchesSearch = !currentSearch || title.includes(currentSearch) || desc.includes(currentSearch);

      if (matchesCat && matchesSearch) {
        article.style.display = '';
      } else {
        article.style.display = 'none';
      }
    });
  };

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.toLowerCase().trim();
      filterArticles();
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active', 'btn-primary'));
      filterBtns.forEach((b) => b.classList.add('btn-outline'));

      btn.classList.add('active', 'btn-primary');
      btn.classList.remove('btn-outline');

      currentCategory = btn.getAttribute('data-category-btn') || 'all';
      filterArticles();
    });
  });
}

/* Number Counters */
function initCounters() {
  const counterElements = document.querySelectorAll('.stat-num[data-target]');

  if (!counterElements.length) return;

  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute('data-target'));
    const isDecimal = el.getAttribute('data-target').includes('.');
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const start = 0;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * ease;

      el.innerHTML = (isDecimal ? current.toFixed(1) : Math.floor(current)) + `<span class="plus">${suffix}</span>`;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach((el) => observer.observe(el));
}

/* Interactive Form Submissions with Toast Feedback */
function initFormSubmissions() {
  const forms = document.querySelectorAll('form[data-ajax="true"]');

  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor"></path>
          </svg> Submitting...
        `;
      }

      setTimeout(() => {
        showToast('Application submitted successfully! Our team will contact you within 24 hours.', 'success');
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
        const modal = document.getElementById('applyModal');
        if (modal && modal.classList.contains('open')) {
          setTimeout(() => {
            modal.classList.remove('open');
            document.body.style.overflow = '';
          }, 1200);
        }
      }, 1000);
    });
  });
}

function showToast(message, type = 'success') {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
    `;
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.style.cssText = `
    background: #10221A;
    border: 1px solid #CAFF04;
    color: #FFFFFF;
    padding: 16px 22px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.6), 0 0 25px rgba(202,255,4,0.3);
    font-size: 0.95rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 12px;
    animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  `;

  toast.innerHTML = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CAFF04" stroke-width="2.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

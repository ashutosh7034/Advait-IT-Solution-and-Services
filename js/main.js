/**
 * Advait IT Solutions and Services — Main Core JavaScript
 * Handles sticky navigation, mobile menu drawer, scroll-to-top, toast notifications,
 * and copyright year.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', initApp);

  // Mark page as fully loaded once assets finish to activate smooth scrolling safely without reload scroll shift
  window.addEventListener('load', () => {
    document.documentElement.classList.add('page-loaded');
  });

  function initApp() {
    initStickyHeader();
    initMobileNav();
    initScrollToTop();
    initDynamicYear();
    setActiveNavLink();
  }

  /**
   * Sticky header on scroll
   */
  function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /**
   * Mobile menu drawer toggle & dropdown interactions
   */
  function initMobileNav() {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const navMenu = document.querySelector('.nav-menu');
    if (!hamburgerBtn || !navMenu) return;

    const closeNav = () => {
      navMenu.classList.remove('is-open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      const icon = hamburgerBtn.querySelector('svg');
      if (icon) {
        icon.innerHTML = '<path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
      }
    };

    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
      
      const icon = hamburgerBtn.querySelector('svg');
      if (icon) {
        if (isOpen) {
          icon.innerHTML = '<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
        } else {
          icon.innerHTML = '<path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
        }
      }
    });

    // Mobile/Tablet dropdown toggle
    const dropdownToggles = document.querySelectorAll('.nav-item.dropdown > .nav-link');
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
          const parent = toggle.closest('.nav-item.dropdown');
          const hasMenu = parent && parent.querySelector('.dropdown-menu');
          if (hasMenu) {
            e.preventDefault();
            parent.classList.toggle('is-open');
          }
        }
      });
    });

    // Close menu when clicking links inside drawer
    const drawerLinks = navMenu.querySelectorAll('a:not(.dropdown-toggle)');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          closeNav();
        }
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeNav();
        hamburgerBtn.focus();
      }
    });

    // Close if resized to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && navMenu.classList.contains('is-open')) {
        closeNav();
      }
    }, { passive: true });
  }

  /**
   * Highlights current active navigation item accurately
   */
  function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentHash = window.location.hash;
    const links = document.querySelectorAll('.nav-menu .nav-link');
    
    // Clear all existing active classes
    links.forEach(link => link.classList.remove('active'));

    let matched = false;

    // Check hash-specific link first (e.g. about.html#leadership)
    if (currentHash) {
      const targetWithHash = currentPath + currentHash;
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href === targetWithHash) {
          link.classList.add('active');
          matched = true;
        }
      });
    }

    // Match path-based link
    if (!matched) {
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
          const cleanHref = href.split('#')[0].split('?')[0];
          if (cleanHref === currentPath || (currentPath === '' && cleanHref === 'index.html')) {
            link.classList.add('active');
          }
        }
      });
    }
  }

  /**
   * Back to top button
   */
  function initScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * Sets dynamic year in footer
   */
  function initDynamicYear() {
    const yearElements = document.querySelectorAll('.dynamic-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
      el.textContent = currentYear;
    });
  }

  /**
   * Global Toast Notification Helper
   */
  window.showToast = function (message, type = 'info', duration = 4000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#10B981" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>';
    } else if (type === 'error') {
      iconSvg = '<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#EF4444" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>';
    } else {
      iconSvg = '<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#155EEF" stroke-width="2"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 16v-4m0-4h.01"/></svg>';
    }

    toast.innerHTML = `
      <span class="toast-icon">${iconSvg}</span>
      <span class="toast-text">${document.createTextNode(message).data}</span>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, duration);
  };
})();

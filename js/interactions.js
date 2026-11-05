/**
 * Advait IT Solutions and Services — Interactions & Micro-Interactions
 * Handles scroll reveal animations, animated statistics counters,
 * and accessible FAQ accordion.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initCounters();
    initFaqAccordion();
    initHeroSlider();
  });

  function initHeroSlider() {
    const slider = document.querySelector('.hero-section');
    const slides = Array.from(document.querySelectorAll('.hero-slide'));
    if (!slider || slides.length < 2) return;

    let activeIndex = 0;
    let timer = null;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const loadSlide = (index) => {
      const slide = slides[index];
      if (!slide || slide.dataset.loaded === 'true') return;

      const image = slide.getAttribute('data-image');
      if (!image) return;

      slide.style.backgroundImage = `url("${image}")`;
      slide.dataset.loaded = 'true';
    };

    const showSlide = (index) => {
      activeIndex = (index + slides.length) % slides.length;
      loadSlide(activeIndex);
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('is-active', slideIndex === activeIndex);
      });
    };

    const stopTimer = () => {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    const startTimer = () => {
      if (reducedMotion || document.hidden) return;
      stopTimer();
      timer = window.setInterval(() => {
        showSlide(activeIndex + 1);
      }, 4000);
    };

    // Pause when the page is not visible, resume when user returns
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopTimer();
      else startTimer();
    });

    loadSlide(0);
    showSlide(0);
    const preloadNext = () => loadSlide(1);
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preloadNext, { timeout: 2000 });
    } else {
      window.setTimeout(preloadNext, 1000);
    }
    startTimer();
  }

  /**
   * Scroll Reveal with IntersectionObserver
   */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealElements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  /**
   * Animated Numeric Counters (Respects prefers-reduced-motion)
   */
  function initCounters() {
    const statCounters = document.querySelectorAll('.stat-counter');
    if (!statCounters.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const runCounter = (el) => {
      const target = parseInt(el.getAttribute('data-target') || '0', 10);
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';

      if (prefersReducedMotion) {
        el.textContent = `${prefix}${target}${suffix}`;
        return;
      }

      const duration = 1600; // ms
      const frameDuration = 1000 / 60;
      const totalFrames = Math.round(duration / frameDuration);
      let frame = 0;

      const timer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        // Ease-out cubic
        const currentCount = Math.round(target * (1 - Math.pow(1 - progress, 3)));

        el.textContent = `${prefix}${currentCount}${suffix}`;

        if (frame >= totalFrames) {
          clearInterval(timer);
          el.textContent = `${prefix}${target}${suffix}`;
        }
      }, frameDuration);
    };

    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    statCounters.forEach(counter => counterObserver.observe(counter));
  }

  /**
   * Accessible FAQ Accordion
   */
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
      const trigger = item.querySelector('.faq-trigger');
      const content = item.querySelector('.faq-content');
      if (!trigger || !content) return;

      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close sibling items for clean accordion UX
        faqItems.forEach(sibling => {
          if (sibling !== item && sibling.classList.contains('active')) {
            sibling.classList.remove('active');
            const siblingTrigger = sibling.querySelector('.faq-trigger');
            const siblingContent = sibling.querySelector('.faq-content');
            if (siblingTrigger) siblingTrigger.setAttribute('aria-expanded', 'false');
            if (siblingContent) siblingContent.style.maxHeight = null;
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          trigger.setAttribute('aria-expanded', 'false');
          content.style.maxHeight = null;
        } else {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });

    // Update open accordion item height if window is resized
    window.addEventListener('resize', () => {
      const activeContent = document.querySelector('.faq-item.active .faq-content');
      if (activeContent) {
        activeContent.style.maxHeight = activeContent.scrollHeight + 'px';
      }
    }, { passive: true });
  }

  /**
   * Active Quick-Nav Highlighting for Services Page
   */
  function initServicesQuickNav() {
    const quickNavLinks = document.querySelectorAll('.quicknav-link, .quicknav-card');
    const serviceCards = document.querySelectorAll('.service-detail-card');
    if (!quickNavLinks.length || !serviceCards.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          quickNavLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -60% 0px'
    });

    serviceCards.forEach(card => observer.observe(card));

    // Smooth scroll navigation accounting for sticky header offset
    quickNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            const header = document.querySelector('.site-header');
            const announcement = document.querySelector('.announcement-strip');
            const offset = (header ? header.offsetHeight : 68) + (announcement ? announcement.offsetHeight : 38) + 20;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({
              top: Math.max(0, top),
              behavior: 'smooth'
            });
            history.pushState(null, '', href);
          }
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initServicesQuickNav();
  });
})();

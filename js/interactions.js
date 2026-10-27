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

    // Preload all background images to eliminate blank flashes during rotation
    slides.forEach(slide => {
      const image = slide.getAttribute('data-image');
      if (image) {
        const preloadImg = new Image();
        preloadImg.src = image;
        slide.style.backgroundImage = `url("${image}")`;
      }
    });

    let activeIndex = 0;
    let timer = null;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const showSlide = (index) => {
      activeIndex = (index + slides.length) % slides.length;
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

    showSlide(0);
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
    const quickNavLinks = document.querySelectorAll('.quicknav-link');
    const serviceCards = document.querySelectorAll('.service-detail-card');
    const quickNav = document.querySelector('.services-quicknav');
    if (!quickNavLinks.length || !serviceCards.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          quickNavLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('active');
              // Keep the active pill visible without changing the document scroll position.
              const linkEnd = link.offsetLeft + link.offsetWidth;
              const visibleEnd = quickNav.scrollLeft + quickNav.clientWidth;
              if (link.offsetLeft < quickNav.scrollLeft) {
                quickNav.scrollLeft = link.offsetLeft;
              } else if (linkEnd > visibleEnd) {
                quickNav.scrollLeft = linkEnd - quickNav.clientWidth;
              }
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px'
    });

    serviceCards.forEach(card => observer.observe(card));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initServicesQuickNav();
  });
})();

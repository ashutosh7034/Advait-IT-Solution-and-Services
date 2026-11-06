const fs = require('fs');

const catalog = JSON.parse(fs.readFileSync('scratch/services_catalog.json', 'utf8'));

const jsContent = `/**
 * Advait IT Solutions and Services — Services Directory Engine
 * Visual-First Architecture: compact hero, instant category filtering,
 * real-time search, accessible modal dialog, and safe DOM formatting.
 */

(function () {
  'use strict';

  const SERVICES_DATA = ${JSON.stringify(catalog, null, 2)};

  let activeCategory = 'all';
  let activeSearchQuery = '';
  let lastFocusedElement = null;

  document.addEventListener('DOMContentLoaded', () => {
    initServicesFilter();
    initServicesSearch();
    initServiceModal();
    handleInitialHash();
    window.addEventListener('hashchange', handleInitialHash);
  });

  /**
   * Initializes Category Filter Tabs (.cat-pill)
   */
  function initServicesFilter() {
    const filterButtons = document.querySelectorAll('.cat-pill');
    if (!filterButtons.length) return;

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        activeCategory = btn.getAttribute('data-filter') || 'all';

        applyFilterAndSearch();
      });
    });
  }

  /**
   * Initializes Live Search Input & Clear Button
   */
  function initServicesSearch() {
    const searchInput = document.querySelector('#servicesSearchInput');
    const clearBtn = document.querySelector('#servicesSearchClear');
    const resetBtn = document.querySelector('#resetServicesFiltersBtn');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        activeSearchQuery = e.target.value.trim().toLowerCase();
        if (clearBtn) {
          clearBtn.style.display = activeSearchQuery.length > 0 ? 'flex' : 'none';
        }
        applyFilterAndSearch();
      });

      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          searchInput.value = '';
          activeSearchQuery = '';
          clearBtn.style.display = 'none';
          searchInput.focus();
          applyFilterAndSearch();
        });
      }
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', resetAllFilters);
    }
  }

  /**
   * Resets all search and category filters
   */
  function resetAllFilters() {
    activeCategory = 'all';
    activeSearchQuery = '';

    const searchInput = document.querySelector('#servicesSearchInput');
    const clearBtn = document.querySelector('#servicesSearchClear');
    if (searchInput) searchInput.value = '';
    if (clearBtn) clearBtn.style.display = 'none';

    const filterButtons = document.querySelectorAll('.cat-pill');
    filterButtons.forEach(btn => {
      const isAll = btn.getAttribute('data-filter') === 'all';
      btn.classList.toggle('active', isAll);
      btn.setAttribute('aria-selected', isAll ? 'true' : 'false');
    });

    applyFilterAndSearch();
  }

  /**
   * Filters the services card grid in real time
   */
  function applyFilterAndSearch() {
    const cards = document.querySelectorAll('.advait-service-card');
    const countElement = document.querySelector('#servicesVisibleCount');
    const emptyState = document.querySelector('#servicesEmptyState');
    const emptyStateText = document.querySelector('#emptyStateText');

    let visibleCount = 0;

    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardText = (card.textContent || '').toLowerCase();

      const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;
      const matchesSearch = !activeSearchQuery || cardText.includes(activeSearchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (countElement) {
      countElement.textContent = visibleCount;
    }

    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.style.display = 'block';
        if (emptyStateText && activeSearchQuery) {
          emptyStateText.textContent = 'We could not find any services matching "' + activeSearchQuery + '". Try adjusting your search keywords or resetting filters.';
        } else if (emptyStateText) {
          emptyStateText.textContent = 'We could not find any services matching the selected category.';
        }
      } else {
        emptyState.style.display = 'none';
      }
    }
  }

  /**
   * Initializes Service Details Modal Dialog
   */
  function initServiceModal() {
    const modal = document.querySelector('#serviceDetailModal');
    const closeBtn = document.querySelector('#serviceModalCloseBtn');
    const dismissBtn = document.querySelector('#modalDismissBtn');

    document.addEventListener('click', (e) => {
      const exploreBtn = e.target.closest('.service-explore-btn');
      if (exploreBtn) {
        e.preventDefault();
        const serviceId = exploreBtn.getAttribute('data-service-id');
        openServiceModal(serviceId, exploreBtn);
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeServiceModal);
    if (dismissBtn) dismissBtn.addEventListener('click', closeServiceModal);

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeServiceModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('is-active')) {
        closeServiceModal();
      }
    });
  }

  /**
   * Opens the service modal and populates data safely
   */
  function openServiceModal(serviceId, triggerBtn) {
    const modal = document.querySelector('#serviceDetailModal');
    if (!modal) return;

    const data = SERVICES_DATA.find(s => s.id === serviceId);
    if (!data) return;

    lastFocusedElement = triggerBtn || document.activeElement;

    const kickerEl = modal.querySelector('#modalServiceKicker');
    const titleEl = modal.querySelector('#modalServiceTitle');
    const descEl = modal.querySelector('#modalServiceDesc');
    const mediaWrap = modal.querySelector('#modalServiceMedia');
    const imageEl = modal.querySelector('#modalServiceImage');
    const metaGridEl = modal.querySelector('#modalServiceMetaGrid');
    const tagsEl = modal.querySelector('#modalServiceTags');
    const quoteBtn = modal.querySelector('#modalQuoteBtn');
    const waBtn = modal.querySelector('#modalWhatsAppBtn');

    if (kickerEl) {
      kickerEl.textContent = data.categoryLabel;
    }
    if (titleEl) {
      titleEl.textContent = data.title;
    }

    // Safe DOM formatting: parses HTML string into elements, preserving <em>/<strong> without raw tags
    if (descEl) {
      setSafeFormattedContent(descEl, data.fullDesc);
    }

    // Modal Image / Media Handling:
    // Only display media wrap if verified image exists. Gracefully hide on error or empty.
    if (mediaWrap && imageEl) {
      if (data.image && data.image.trim() !== '') {
        mediaWrap.style.display = 'block';
        imageEl.src = data.image;
        imageEl.alt = data.imageAlt || data.title;
        imageEl.onerror = () => {
          mediaWrap.style.display = 'none';
        };
      } else {
        mediaWrap.style.display = 'none';
      }
    }

    // Meta blocks
    if (metaGridEl) {
      metaGridEl.innerHTML = '';
      (data.metaBlocks || []).forEach(mb => {
        const block = document.createElement('div');
        block.className = 'service-meta-block';
        
        const h4 = document.createElement('h4');
        h4.textContent = mb.title;
        
        const p = document.createElement('p');
        p.textContent = mb.content;
        
        block.appendChild(h4);
        block.appendChild(p);
        metaGridEl.appendChild(block);
      });
    }

    // Tags list
    if (tagsEl) {
      tagsEl.innerHTML = '';
      (data.tags || []).forEach(tag => {
        const pill = document.createElement('span');
        pill.className = 'service-pill-tag';
        pill.textContent = tag;
        tagsEl.appendChild(pill);
      });
    }

    // CTAs
    if (quoteBtn) {
      quoteBtn.href = 'contact.html?service=' + data.quoteSlug;
      quoteBtn.setAttribute('title', 'Request a Customized Quote for ' + data.title);
    }
    if (waBtn) {
      const msg = encodeURIComponent('Hello Advait IT Solutions, I would like to discuss ' + data.title + '.');
      waBtn.href = 'https://wa.me/919702420582?text=' + msg;
    }

    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    const closeBtn = modal.querySelector('#serviceModalCloseBtn');
    if (closeBtn) {
      setTimeout(() => closeBtn.focus(), 60);
    }
  }

  /**
   * Closes the service modal
   */
  function closeServiceModal() {
    const modal = document.querySelector('#serviceDetailModal');
    if (!modal) return;

    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  /**
   * Safely formats description preserving semantic inline formatting (em, strong, p, br)
   */
  function setSafeFormattedContent(container, htmlString) {
    container.innerHTML = '';
    if (!htmlString) return;

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, 'text/html');
      const allowedTags = new Set(['EM', 'STRONG', 'B', 'I', 'P', 'SPAN', 'BR']);

      function sanitize(node) {
        if (node.nodeType === Node.TEXT_NODE) {
          return document.createTextNode(node.textContent);
        }
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (allowedTags.has(node.tagName)) {
            const cleanEl = document.createElement(node.tagName.toLowerCase());
            node.childNodes.forEach(child => {
              const cleanChild = sanitize(child);
              if (cleanChild) cleanEl.appendChild(cleanChild);
            });
            return cleanEl;
          } else {
            const fragment = document.createDocumentFragment();
            node.childNodes.forEach(child => {
              const cleanChild = sanitize(child);
              if (cleanChild) fragment.appendChild(cleanChild);
            });
            return fragment;
          }
        }
        return null;
      }

      doc.body.childNodes.forEach(child => {
        const cleanNode = sanitize(child);
        if (cleanNode) container.appendChild(cleanNode);
      });
    } catch (e) {
      container.textContent = htmlString.replace(/<[^>]+>/g, '');
    }
  }

  /**
   * Handles direct URL hash navigation (e.g. services.html#cybersecurity)
   */
  function handleInitialHash() {
    const hash = window.location.hash ? window.location.hash.substring(1) : '';
    if (!hash) return;

    const targetCard = document.getElementById(hash);
    if (!targetCard || !targetCard.classList.contains('advait-service-card')) return;

    resetAllFilters();

    setTimeout(() => {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetCard.classList.add('card-highlighted');
      setTimeout(() => {
        targetCard.classList.remove('card-highlighted');
      }, 2500);
    }, 150);
  }

})();
`;

fs.writeFileSync('js/services.js', jsContent, 'utf8');
console.log('Successfully wrote js/services.js');


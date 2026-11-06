const fs = require('fs');

console.log('=== APPLYING SERVICES DROPDOWN FIX ===');

// 1. Update css/style.css
let styleCss = fs.readFileSync('css/style.css', 'utf8');

const oldChevronTarget = `.nav-item.dropdown:hover .nav-link svg.chevron,
.nav-item.dropdown:focus-within .nav-link svg.chevron {
  transform: rotate(180deg);
}`;

const newChevronTarget = `.nav-item.dropdown.is-open .nav-link svg.chevron,
.nav-item.dropdown:hover .nav-link svg.chevron,
.nav-item.dropdown:focus-within .nav-link svg.chevron {
  transform: rotate(180deg);
}`;

if (styleCss.includes(oldChevronTarget)) {
  styleCss = styleCss.replace(oldChevronTarget, newChevronTarget);
}

const oldMenuDisplay = `.nav-item.dropdown:hover .dropdown-menu,
.nav-item.dropdown:focus-within .dropdown-menu {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}`;

const newMenuDisplay = `/* Invisible Intent Bridge: eliminates dead-zone gap between navbar and dropdown panel */
.dropdown-menu::before {
  content: "";
  position: absolute;
  top: -16px;
  left: 0;
  right: 0;
  height: 16px;
  background: transparent;
  pointer-events: auto;
}

.nav-item.dropdown.is-open .dropdown-menu,
.nav-item.dropdown:hover .dropdown-menu,
.nav-item.dropdown:focus-within .dropdown-menu {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}`;

if (styleCss.includes(oldMenuDisplay)) {
  styleCss = styleCss.replace(oldMenuDisplay, newMenuDisplay);
  fs.writeFileSync('css/style.css', styleCss, 'utf8');
  console.log('✓ Updated dropdown bridge and .is-open styles in css/style.css');
}

// 2. Update js/main.js
let mainJs = fs.readFileSync('js/main.js', 'utf8');

if (!mainJs.includes('initDropdownNav();')) {
  mainJs = mainJs.replace(
    'initMobileNav();',
    'initMobileNav();\n    initDropdownNav();'
  );
}

const oldMobileDropdown = `    // Mobile/Tablet dropdown toggle
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
    });`;

if (mainJs.includes(oldMobileDropdown)) {
  mainJs = mainJs.replace(oldMobileDropdown, '    // Note: Dropdown interactions handled in initDropdownNav() for all viewports');
}

const dropdownNavCode = `  /**
   * Enterprise-Grade Dropdown Navigation
   * Supports Desktop Click & Hover with debounced intent bridge,
   * mobile drawer integration, keyboard accessibility, outside click,
   * and link selection dismissal.
   */
  function initDropdownNav() {
    const dropdowns = document.querySelectorAll('.nav-item.dropdown');
    if (!dropdowns.length) return;

    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      const menu = dropdown.querySelector('.dropdown-menu');
      if (!toggle || !menu) return;

      let closeTimer = null;

      const openDropdown = () => {
        if (closeTimer) {
          clearTimeout(closeTimer);
          closeTimer = null;
        }
        dropdown.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
      };

      const closeDropdown = (immediate = false) => {
        if (closeTimer) {
          clearTimeout(closeTimer);
          closeTimer = null;
        }
        if (immediate) {
          dropdown.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        } else {
          closeTimer = setTimeout(() => {
            dropdown.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
          }, 220);
        }
      };

      // 1. Toggle on Click (both Desktop & Mobile)
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = dropdown.classList.contains('is-open');
        if (isOpen) {
          closeDropdown(true);
        } else {
          dropdowns.forEach(other => {
            if (other !== dropdown) {
              other.classList.remove('is-open');
              const otherToggle = other.querySelector('.dropdown-toggle');
              if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
            }
          });
          openDropdown();
        }
      });

      // 2. Desktop Mouse Events with Intent Bridge
      dropdown.addEventListener('mouseenter', () => {
        if (window.innerWidth > 1024) {
          openDropdown();
        }
      });

      dropdown.addEventListener('mouseleave', () => {
        if (window.innerWidth > 1024) {
          closeDropdown(false);
        }
      });

      menu.addEventListener('mouseenter', () => {
        if (window.innerWidth > 1024) {
          openDropdown();
        }
      });

      menu.addEventListener('mouseleave', () => {
        if (window.innerWidth > 1024) {
          closeDropdown(false);
        }
      });

      // 3. Close immediately when any link inside dropdown is selected
      const links = menu.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('click', () => {
          closeDropdown(true);
          const navMenu = document.querySelector('.nav-menu');
          const hamburger = document.querySelector('.hamburger-btn');
          if (navMenu && navMenu.classList.contains('is-open') && window.innerWidth <= 1024) {
            navMenu.classList.remove('is-open');
            if (hamburger) {
              hamburger.setAttribute('aria-expanded', 'false');
              const icon = hamburger.querySelector('svg');
              if (icon) {
                icon.innerHTML = '<path d=\"M4 6h16M4 12h16M4 18h16\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/>';
              }
            }
            document.body.style.overflow = '';
          }
        });
      });

      // 4. Keyboard Navigation
      toggle.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openDropdown();
          const firstLink = menu.querySelector('a');
          if (firstLink) firstLink.focus();
        }
      });

      menu.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          closeDropdown(true);
          toggle.focus();
        }
      });
    });

    // 5. Global Document Listeners: Outside click & Escape
    document.addEventListener('click', (e) => {
      dropdowns.forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove('is-open');
          const toggle = dropdown.querySelector('.dropdown-toggle');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdowns.forEach(dropdown => {
          if (dropdown.classList.contains('is-open')) {
            dropdown.classList.remove('is-open');
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) {
              toggle.setAttribute('aria-expanded', 'false');
              toggle.focus();
            }
          }
        });
      }
    });
  }
`;

if (!mainJs.includes('function initDropdownNav()')) {
  mainJs = mainJs.replace('function initScrollToTop()', dropdownNavCode + '\n  function initScrollToTop()');
  fs.writeFileSync('js/main.js', mainJs, 'utf8');
  console.log('✓ Added initDropdownNav() to js/main.js');
}

// 3. Update js/interactions.js
let interJs = fs.readFileSync('js/interactions.js', 'utf8');
const oldInterClosure = `          if (navMenu && navMenu.classList.contains('is-open')) {
            navMenu.classList.remove('is-open');
            if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
          }`;

const newInterClosure = `          if (navMenu && navMenu.classList.contains('is-open')) {
            navMenu.classList.remove('is-open');
            if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
          }
          const openDropdowns = document.querySelectorAll('.nav-item.dropdown.is-open');
          openDropdowns.forEach(d => {
            d.classList.remove('is-open');
            const t = d.querySelector('.dropdown-toggle');
            if (t) t.setAttribute('aria-expanded', 'false');
          });`;

if (interJs.includes(oldInterClosure) && !interJs.includes('const openDropdowns =')) {
  interJs = interJs.replace(oldInterClosure, newInterClosure);
  fs.writeFileSync('js/interactions.js', interJs, 'utf8');
  console.log('✓ Updated dropdown link handler in js/interactions.js');
}

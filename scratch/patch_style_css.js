const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

// Replace chevron rule
const chevronRegex = /\.nav-item\.dropdown:hover \.nav-link svg\.chevron,\s*\.nav-item\.dropdown:focus-within \.nav-link svg\.chevron\s*\{/g;
css = css.replace(chevronRegex, `.nav-item.dropdown.is-open .nav-link svg.chevron,
.nav-item.dropdown:hover .nav-link svg.chevron,
.nav-item.dropdown:focus-within .nav-link svg.chevron {`);

// Add bridge and replace menu display rule
const menuDisplayRegex = /\.nav-item\.dropdown:hover \.dropdown-menu,\s*\.nav-item\.dropdown:focus-within \.dropdown-menu\s*\{[^}]*\}/g;

const replacementMenuDisplay = `/* Invisible Intent Bridge: eliminates dead-zone gap between navbar and dropdown panel */
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

css = css.replace(menuDisplayRegex, replacementMenuDisplay);

fs.writeFileSync('css/style.css', css, 'utf8');
console.log('Successfully patched css/style.css with Intent Bridge and is-open styles!');


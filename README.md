# Advait IT Solutions and Services — Corporate Website

A complete, modern, accessible, responsive, and performance-optimized corporate website built for **Advait IT Solutions and Services**.

Built using clean, semantic **HTML5**, modern **CSS3** (with design tokens, custom properties, and micro-interactions), and modular **Vanilla JavaScript**. No heavyweight frontend frameworks are required, ensuring lightning-fast load times and seamless deployment to your existing domain.

---

## 📁 Project Structure

```
advait-it-solutions/
├── index.html              # Homepage (Hero, Stats, 6 Core Services, Advait Advantage Preview, 4-Stage Process, FAQ, CTA)
├── about.html              # About Us (Story, Mission, Vision, Verified Scale, Leadership Profiles)
├── advait-advantage.html   # The Advait Advantage (Agency vs Freelancer Comparison Matrix, 4 Pillars, Client Rights)
├── services.html           # Full Services Page (All 14 detailed IT service categories + Quick Jump Nav)
├── projects.html           # Portfolio Showcase (Search bar, Category Filters, Accessible Detail Modal)
├── contact.html            # Contact & Quotations (Formspree Form, 2 WhatsApp buttons, Direct Email)
├── privacy-policy.html     # Corporate Privacy & Confidentiality Policy
├── 404.html                # Custom 404 Error Page
├── robots.txt              # Search engine crawler instructions
├── sitemap.xml             # XML sitemap for SEO indexing
├── favicon.svg             # Modern geometric vector brandmark favicon
├── README.md               # Project documentation and deployment guide
├── css/
│   ├── style.css           # Core Design System (Colors, Typography, Navbar, Cards, Buttons, Modals)
│   ├── animations.css      # Keyframes, scroll reveal observers, reduced-motion accessibility
│   └── responsive.css     # Mobile-first breakpoints (320px, 480px, 768px, 1024px, 1200px)
├── js/
│   ├── main.js             # Sticky header, mobile drawer menu, scroll-to-top, toast alerts, year
│   ├── interactions.js     # Scroll-triggered animations, animated stat counters, accessible FAQ
│   ├── projects-data.js    # Centralized portfolio data array, search engine, modal view
│   └── form-validation.js  # Formspree AJAX integration, client validation, fallback alerts
└── assets/
    ├── logos/
    │   ├── logo.svg        # Horizontal brand logo for light backgrounds / navbar
    │   ├── logo-white.svg  # Horizontal brand logo for dark footer / dark backgrounds
    │   └── logo-mark.svg   # Standalone brandmark icon
    └── images/
        ├── hero-tech-dashboard.svg   # Modern cloud architecture dashboard illustration
        ├── founder-ashutosh.svg      # Executive vector portrait for Ashutosh Pandey
        ├── techlead-aakash.svg       # Engineering vector portrait for Aakash Pandey
        ├── project-1.svg             # Project 1 Preview (Enterprise CRM & Workflow Portal)
        ├── project-2.svg             # Project 2 Preview (Healthcare Teleconsultation Platform)
        ├── project-3.svg             # Project 3 Preview (High-Velocity E-Commerce Engine)
        ├── project-4.svg             # Project 4 Preview (EdTech Student Learning Hub)
        ├── project-5.svg             # Project 5 Preview (Fintech Ledger & Invoicing Suite)
        └── project-6.svg             # Project 6 Preview (Logistics Telematics & Dispatcher)
```

---

## 🚀 How to Run Locally

Because this project uses pure HTML5, CSS3, and Vanilla JavaScript, it requires **zero build steps** or `npm install` commands.

### Option 1: VS Code Live Server (Recommended)
1. Open the `advait-it-solutions` folder in **VS Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click on `index.html` and click **"Open with Live Server"**.

### Option 2: Python Local Server
Open a terminal inside the project directory:
```bash
# Python 3
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

### Option 3: Node / NPX Serve
```bash
npx serve .
```

---

## ⚙️ Configuration Details to Update Before Going Live

### 1. Formspree Contact Form Endpoint
To receive form inquiries directly into your inbox:
1. Create a free account at [Formspree.io](https://formspree.io/).
2. Create a new form and copy your unique Form ID (e.g., `xpzgkdaw`).
3. Update the Form ID in **two files**:
   - In `contact.html` (line 125):
     ```html
     <form id="advaitContactForm" action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST">
     ```
     Replace `YOUR_FORMSPREE_ID` with your Formspree ID.
   - In `js/form-validation.js` (line 9):
     ```javascript
     const FORMSPREE_FORM_ID = 'YOUR_FORMSPREE_ID';
     ```
     Replace `'YOUR_FORMSPREE_ID'` with your Formspree ID.

> **Note:** If the form is submitted while the placeholder `YOUR_FORMSPREE_ID` is present, the website will display a helpful reminder banner with one-click direct WhatsApp and Email fallbacks so you never miss an inquiry.

### 2. Configure Your Live Domain Name & Canonical URLs
Search and replace `https://yourdomain.com` with your actual domain name (e.g., `https://advaititsolutions.com`) across:
- `index.html` (canonical, Open Graph, Twitter card, Schema JSON-LD)
- `about.html` (canonical, Open Graph)
- `services.html` (canonical, Open Graph)
- `projects.html` (canonical, Open Graph)
- `contact.html` (canonical, Open Graph)
- `privacy-policy.html` (canonical)
- `robots.txt` (`Sitemap: https://yourdomain.com/sitemap.xml`)
- `sitemap.xml` (all `<loc>` URLs)

### 3. Contact & WhatsApp Numbers
All verified contact options are configured throughout the pages:
- **Email:** `akp2756097@gmail.com`
- **WhatsApp 1:** `+91 9702420582` (Pre-linked with project inquiry text)
- **WhatsApp 2:** `+91 6391929317` (Pre-linked with technical services text)

---

## 🛠️ How to Add or Update Projects

All projects displayed on `projects.html` and the homepage are managed in a single, clean JavaScript data file: [`js/projects-data.js`](js/projects-data.js).

To add a new project, simply append a new object to `ADVAIT_PROJECTS`:

```javascript
{
  id: 'proj-7',
  title: 'Your New Project Name',
  category: 'web-apps', // 'websites', 'web-apps', 'business-software', 'mobile-apps', or 'other-it'
  categoryLabel: 'Web Applications',
  status: 'Verified Project',
  summary: 'Short one-sentence description shown on the card.',
  fullDescription: 'Detailed multi-sentence explanation shown inside the modal dialog.',
  clientType: 'Target Industry / Sector',
  techStack: ['Node.js', 'PostgreSQL', 'Docker'],
  highlights: [
    'Key performance or engineering achievement 1',
    'Key achievement 2'
  ],
  image: 'assets/images/your-project-thumbnail.svg',
  liveUrl: 'https://example.com',
  hasLiveDemo: true
}
```
The search filtering, category tabs, and modal preview will automatically update!

---

## 🌐 Deployment to Your Existing Domain

### Option A: Static Hosting (Vercel, Netlify, Cloudflare Pages)
1. Push this repository to GitHub or GitLab.
2. Connect your repo in Vercel or Cloudflare Pages.
3. Build Command: Leave blank (None).
4. Output Directory: `./` (Root).
5. Add your custom domain in the platform's **Custom Domains** settings.
6. Update your domain registrar's DNS records (CNAME / A records) as instructed by the platform.
7. SSL/HTTPS is automatically provisioned for free.

### Option B: cPanel / Traditional Web Hosting / Apache / Nginx
1. Log into your hosting cPanel or server via SFTP.
2. Navigate to your domain's document root (typically `public_html/` or `/var/www/html/`).
3. Upload all files and folders maintaining the exact directory hierarchy.
4. Ensure your server's SSL certificate (e.g., Let's Encrypt / AutoSSL) is active.
5. In cPanel, enable **Force HTTPS Redirection** under Domains.

---

## 🔒 Security Best Practices Implemented

- **No Exposed Secrets:** No API keys, credentials, or private tokens are stored in client-side files.
- **Safe Dynamic Rendering:** All dynamic project content and toast alerts sanitize user inputs and avoid dangerous HTML injections.
- **Spam Defense:** The contact form includes an invisible honeypot field (`_gotcha`) and client-side validation.
- **Strict HTTPS:** All external resource requests (Google Fonts) use secure HTTPS.

---

## ♿ Accessibility (WCAG 2.1 AA)

- **Keyboard Navigation:** Full tab navigation support with visible focus outlines on all interactive elements.
- **Focus Trapping:** The project detail modal traps keyboard focus and closes cleanly with the `Escape` key.
- **Screen Reader Support:** Semantic HTML5 landmarks (`header`, `main`, `footer`, `nav`, `article`, `aside`) and ARIA expanded attributes.
- **Reduced Motion:** Respects user operating system preference for `prefers-reduced-motion: reduce` by disabling non-essential transitions and animations.

---

## 📞 Support & Inquiries
- **Company:** Advait IT Solutions and Services
- **Founder & Head:** Ashutosh Pandey
- **Technical Lead & SDE:** Aakash Pandey
- **Office Email:** akp2756097@gmail.com
- **WhatsApp 1:** +91 9702420582
- **WhatsApp 2:** +91 6391929317
#   A d v a i t - I T - S o l u t i o n - a n d - S e r v i c e s  
 
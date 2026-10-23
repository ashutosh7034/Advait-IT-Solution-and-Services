# PRODUCTION LAUNCH CHECKLIST
**Advait IT Solutions and Services**
**Role:** Senior Frontend Engineer & Production Deployment Specialist
**Release Readiness Date:** October 2026
**Final Release Verdict:** **PASS WITH LIMITATIONS**

---

## 1. Executive Summary

This checklist provides an actionable, pre-flight guide for deploying the **Advait IT Solutions and Services** web application to public production.

The core codebase (HTML5, CSS3, Vanilla JS) is completely finalized, audited, and regression-tested. Because the custom production domain has not yet been selected by the business owner, all domain-dependent configuration points are explicitly identified below to ensure a seamless transition upon domain acquisition.

---

## 2. Phase 1: Formspree Recipient Configuration (Mandatory Owner Action)

The website uses Formspree form ID **`xoeeagyl`** (`https://formspree.io/f/xoeeagyl`). The frontend displayed email has been updated to **`ashutosh3276s16@gmail.com`**. Formspree's backend routing must be synchronized:

- [ ] **Step 1:** Log into [Formspree.io](https://formspree.io/login).
- [ ] **Step 2:** Select form `xoeeagyl` from your dashboard.
- [ ] **Step 3:** Navigate to **Settings** -> **Target Email / Recipient Notifications**.
- [ ] **Step 4:** Ensure the recipient address is updated from `akp2756097@gmail.com` to **`ashutosh3276s16@gmail.com`**.
- [ ] **Step 5:** Check your inbox at `ashutosh3276s16@gmail.com` for Formspree's confirmation link and verify it.
- [ ] **Step 6:** Submit an authorized inquiry from `contact.html` and confirm the message lands in your inbox.

---

## 3. Phase 2: Domain-Dependent Deployment Tasks (Pending Domain Selection)

The custom domain has not yet been finalized. Do NOT invent a placeholder domain. When the domain (e.g. `advaititsolutions.com`) is registered, perform the following substitutions:

### 3.1 DNS & Hosting Setup
- [ ] **Domain Purchase:** Register domain through a trusted registrar (e.g., Cloudflare, Namecheap, Google Domains/Squarespace).
- [ ] **Hosting Provider:** Connect repository to static web hosting (e.g., Cloudflare Pages, Netlify, Vercel, or AWS S3/CloudFront).
- [ ] **SSL / TLS Certificate:** Enforce automatic HTTPS with Full/Strict SSL.
- [ ] **DNS Records:** Configure root `@` A records and `www` CNAME records pointing to hosting nameservers.

### 3.2 File-Level Domain Substitutions Required

| File | Location | Current Placeholder | Action Upon Domain Selection |
|---|---|---|---|
| `robots.txt` | Line 7 | `Sitemap: https://yourdomain.com/sitemap.xml` | Replace `https://yourdomain.com` with finalized production URL |
| `sitemap.xml` | Lines 4, 10, 16, 22, 28, 34, 40 | `<loc>https://yourdomain.com/...</loc>` | Update all 7 `<loc>` URLs to finalized production domain |
| `index.html` | Head / Meta | `https://yourdomain.com/` | Replace canonical URL, `og:url`, `og:image`, and Schema.org URL |
| `about.html` | Head / Meta | `https://yourdomain.com/about.html` | Replace canonical URL, `og:url`, and Schema.org URL |
| `services.html` | Head / Meta | `https://yourdomain.com/services.html` | Replace canonical URL, `og:url`, and Schema.org URL |
| `advait-advantage.html` | Head / Meta | `https://yourdomain.com/advait-advantage.html` | Replace canonical URL, `og:url`, and Schema.org URL |
| `projects.html` | Head / Meta | `https://yourdomain.com/projects.html` | Replace canonical URL, `og:url`, and Schema.org URL |
| `contact.html` | Head / Meta | `https://yourdomain.com/contact.html` | Replace canonical URL, `og:url`, and Schema.org URL |
| `privacy-policy.html` | Head / Meta | `https://yourdomain.com/privacy-policy.html` | Replace canonical URL, `og:url`, and Schema.org URL |

---

## 4. Phase 3: Pre-Launch Verification Checklist

- [x] **Page Inventory Verified:** All 8 pages (`index.html`, `about.html`, `services.html`, `advait-advantage.html`, `projects.html`, `contact.html`, `privacy-policy.html`, `404.html`) functional.
- [x] **Official Email Standardized:** `ashutosh3276s16@gmail.com` active across all headers, cards, footers, schema, and fallback buttons.
- [x] **Link Crawl Verified:** 0 broken internal links; 100% of 31 external links hardened with `rel="noopener noreferrer"`.
- [x] **Interactive Portfolio Verified:** Search filtering, category tabs, and accessible modal dialogs functional.
- [x] **Mobile Responsiveness Verified:** 48/48 viewport tests pass with **0px horizontal overflow**.
- [x] **No Build Tools Required:** Pure static HTML5, CSS3, Vanilla JS deployable immediately to any static CDN.
- [x] **Security Audit Passed:** Zero API credentials, database keys, or private secrets in source code.
- [ ] **Formspree Recipient Verified:** Owner confirmation of Formspree dashboard settings (*Pending Owner Action*).
- [ ] **Live Inbox Delivery Confirmed:** First live test submission received in `ashutosh3276s16@gmail.com` (*Pending Owner Action*).
- [ ] **Domain & DNS Propagation:** DNS records active and SSL verified (*Pending Domain Selection*).

---

## 5. Final Deployment Recommendation

**Verdict:** **PASS WITH LIMITATIONS**

The Advait IT Solutions and Services web application is **production-ready at the codebase level**. The owner should proceed to select the production domain, update the Formspree dashboard recipient, and deploy to static hosting.

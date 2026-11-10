/**
 * Advait IT Solutions and Services — Services Directory Engine
 * Visual-First Architecture: compact hero, instant category filtering,
 * real-time search, accessible modal dialog, and safe DOM formatting.
 */

(function () {
  'use strict';

  const SERVICES_DATA = [
  {
    "id": "web-dev",
    "title": "Website Development",
    "categoryFilter": "web-dev",
    "categoryLabel": "Web & Apps",
    "icon": "<svg width=\"22\" height=\"22\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"2\" y=\"3\" width=\"20\" height=\"14\" rx=\"2\"/><line x1=\"8\" y1=\"21\" x2=\"16\" y2=\"21\"/><line x1=\"12\" y1=\"17\" x2=\"12\" y2=\"21\"/></svg>",
    "cardDesc": "Bespoke, responsive, and blazing-fast corporate websites engineered with clean HTML5, CSS3, and JavaScript that establish brand authority and convert visitors.",
    "fullDesc": "We design and build bespoke, responsive, and blazing-fast websites that communicate corporate authority and convert visitors into customers. Unlike bloated drag-and-drop site builders, we write clean, standards-compliant HTML5, CSS3, and JavaScript that load rapidly on mobile networks and rank effectively on Google.",
    "image": "assets/images/service-web-development.jpg",
    "imageAlt": "Advait IT engineer coding responsive website",
    "metaBlocks": [
      {
        "title": "Who Needs This",
        "content": "Corporations, small businesses, startups, educators, and service firms seeking a credible digital presence."
      },
      {
        "title": "Problems Solved",
        "content": "Outdated visual identity, slow page loads, poor mobile responsiveness, and zero search engine visibility."
      },
      {
        "title": "Key Capabilities",
        "content": "Corporate sites, landing pages, portfolio sites, educational platforms, e-commerce, and custom layouts."
      }
    ],
    "tags": [
      "Corporate Websites",
      "Portfolio Websites",
      "Conversion Landing Pages",
      "Educational Websites",
      "E-Commerce Websites",
      "Custom Frontend Code"
    ],
    "quoteSlug": "website-development",
    "whatsappMsg": "Website Development"
  },
  {
    "id": "web-apps",
    "title": "Web Application Development",
    "categoryFilter": "web-dev",
    "categoryLabel": "Web & Apps",
    "icon": "<svg width=\"22\" height=\"22\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"12 2 2 7 12 12 22 7 12 2\"/><polyline points=\"2 17 12 22 22 17\"/><polyline points=\"2 12 12 17 22 12\"/></svg>",
    "cardDesc": "Interactive, scalable web applications, client portals, and transaction dashboards engineered to automate workflows and handle complex business data reliably.",
    "fullDesc": "We engineer interactive, secure, and scalable web applications designed to handle dynamic business data, user authentication, and multi-step transactions. From client intake portals to complex scheduling tools, we engineer systems that streamline day-to-day operations.",
    "image": "assets/images/service-app-development.jpg",
    "imageAlt": "Custom web application interface and dashboard",
    "metaBlocks": [
      {
        "title": "Who Needs This",
        "content": "Businesses looking to offer online services, client account portals, booking engines, or digital self-service."
      },
      {
        "title": "Problems Solved",
        "content": "Manual paperwork, disorganized customer inquiries, fragmented scheduling, and inefficient data entry."
      },
      {
        "title": "Key Capabilities",
        "content": "Custom web apps, admin dashboards, customer portals, booking & appointment engines, and business automation."
      }
    ],
    "tags": [
      "Custom Web Apps",
      "Admin Dashboards",
      "Customer Portals",
      "Booking & Appointment Systems",
      "Business Workflow Automation"
    ],
    "quoteSlug": "web-applications",
    "whatsappMsg": "Web Application Development"
  },
  {
    "id": "software-dev",
    "title": "Custom Software Development",
    "categoryFilter": "software-dev",
    "categoryLabel": "Software & APIs",
    "icon": "<svg width=\"22\" height=\"22\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><polyline points=\"16 18 22 12 16 6\"/><polyline points=\"8 6 2 12 8 18\"/></svg>",
    "cardDesc": "Tailored internal management tools, database-backed processing systems, and custom business software built around practical operational realities.",
    "fullDesc": "When off-the-shelf software packages fail to match your internal procedures, our team designs and engineers tailored software systems. We construct intuitive internal management tools, database-backed processing engines, and workflow automation systems built around practical business realities.",
    "image": "assets/images/service-custom-software.jpg",
    "imageAlt": "Database-driven business software architecture",
    "metaBlocks": [
      {
        "title": "Who Needs This",
        "content": "Companies with specialized operational workflows that commercial SaaS software cannot accommodate cleanly."
      },
      {
        "title": "Problems Solved",
        "content": "Forced compromises with generic software, expensive per-seat SaaS subscription fees, and disconnected spreadsheets."
      },
      {
        "title": "Key Capabilities",
        "content": "Bespoke software architecture, business operations tools, database integrations, and legacy modernization."
      }
    ],
    "tags": [
      "Custom Business Software",
      "Internal Management Tools",
      "Database-Driven Systems",
      "API Integration",
      "Software Modernization"
    ],
    "quoteSlug": "software-development",
    "whatsappMsg": "Custom Software Development"
  },
  {
    "id": "mobile-dev",
    "title": "Mobile Application Development",
    "categoryFilter": "mobile-dev",
    "categoryLabel": "Mobile",
    "icon": "<svg width=\"22\" height=\"22\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"5\" y=\"2\" width=\"14\" height=\"20\" rx=\"2\" ry=\"2\"/><line x1=\"12\" y1=\"18\" x2=\"12.01\" y2=\"18\"/></svg>",
    "cardDesc": "High-performance native and cross-platform apps for Android and iOS featuring fluid interfaces, offline support, and seamless backend API integration.",
    "fullDesc": "We build responsive mobile applications for Android and iOS that provide intuitive user experiences and dependable offline or synchronized data operations. Whether creating a customer-facing utility or a field-worker productivity app, we ensure smooth performance across device ecosystems.",
    "image": "assets/images/hero-app-interface.svg",
    "imageAlt": "Mobile application UI and cross-platform interface",
    "metaBlocks": [
      {
        "title": "Who Needs This",
        "content": "Startups and enterprises requiring mobile customer engagement, on-the-go services, or field data collection."
      },
      {
        "title": "Problems Solved",
        "content": "Inability to reach mobile-only audiences, clunky mobile web experiences, and lack of real-time push notification engagement."
      },
      {
        "title": "Key Capabilities",
        "content": "Android apps, iOS applications, cross-platform mobile frameworks, API syncing, and performance tuning."
      }
    ],
    "tags": [
      "Android Development",
      "iOS Development",
      "Cross-Platform Apps",
      "Mobile API Sync",
      "App QA & Maintenance"
    ],
    "quoteSlug": "mobile-development",
    "whatsappMsg": "Mobile Application Development"
  },
  {
    "id": "ui-ux",
    "title": "UI/UX & Website Redesign",
    "categoryFilter": "web-dev",
    "categoryLabel": "Web & Apps",
    "icon": "<svg width=\"22\" height=\"22\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94\"/></svg>",
    "cardDesc": "Complete visual overhauls and user experience audits turning clunky legacy interfaces into modern, intuitive, high-converting digital products.",
    "fullDesc": "First impressions are critical in modern technology. We overhaul clunky, dated websites and digital interfaces into clean, modern, and high-converting experiences. Our redesign process centers on user journeys, visual hierarchy, mobile thumb ergonomics, and brand authority.",
    "image": "assets/images/hero-developer-studio.svg",
    "imageAlt": "UI/UX wireframing and conversion interface design",
    "metaBlocks": [
      {
        "title": "Who Needs This",
        "content": "Businesses suffering from high bounce rates, low user conversion, or an embarrassing, outdated digital aesthetic."
      },
      {
        "title": "Problems Solved",
        "content": "Confusing navigation structures, poor mobile legibility, low visitor trust, and lack of brand differentiation."
      },
      {
        "title": "Key Capabilities",
        "content": "UI/UX audits, wireframing, high-fidelity prototypes, brand style systems, and accessible design compliance."
      }
    ],
    "tags": [
      "Interface Design",
      "User Experience Audit",
      "Website Redesign",
      "Accessibility Tuning",
      "High-Conversion Layouts"
    ],
    "quoteSlug": "ui-ux-design",
    "whatsappMsg": "UI/UX & Website Redesign"
  },
  {
    "id": "maintenance",
    "title": "Website Maintenance & Updates",
    "categoryFilter": "cloud-devops",
    "categoryLabel": "Cloud & DevOps",
    "icon": "<svg width=\"22\" height=\"22\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z\"/></svg>",
    "cardDesc": "Proactive maintenance retainers covering routine code updates, security patching, Core Web Vitals speed tuning, and rapid bug resolution.",
    "fullDesc": "A website is a living asset that requires continuous attention. We provide ongoing maintenance contracts covering routine text updates, new feature additions, security patching, broken link resolution, and general performance upkeep.",
    "image": "assets/images/service-maintenance.jpg",
    "imageAlt": "Website maintenance and server updates",
    "metaBlocks": [
      {
        "title": "Who Needs This",
        "content": "Organizations without an in-house engineering team that need dependable technical support on retainer."
      },
      {
        "title": "Problems Solved",
        "content": "Broken site features after updates, stale content, slow performance degradation, and unaddressed security patches."
      },
      {
        "title": "Key Capabilities",
        "content": "Regular code updates, bug resolution, speed tuning, broken link audits, and monthly maintenance retainers."
      }
    ],
    "tags": [
      "Content & Text Updates",
      "Bug Rectification",
      "Feature Additions",
      "Speed Improvements",
      "Broken Link Audits",
      "Maintenance Retainers"
    ],
    "quoteSlug": "website-maintenance",
    "whatsappMsg": "Website Maintenance & Updates"
  },
  {
    "id": "hosting-domain",
    "title": "Domain, Hosting & Server Services",
    "categoryFilter": "cloud-devops",
    "categoryLabel": "Cloud & DevOps",
    "icon": "<svg width=\"22\" height=\"22\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"2\" y=\"2\" width=\"20\" height=\"8\" rx=\"2\" ry=\"2\"/><rect x=\"2\" y=\"14\" width=\"20\" height=\"8\" rx=\"2\" ry=\"2\"/><line x1=\"6\" y1=\"6\" x2=\"6.01\" y2=\"6\"/><line x1=\"6\" y1=\"18\" x2=\"6.01\" y2=\"18\"/></svg>",
    "cardDesc": "Accurate DNS configuration, SSL/TLS certificate deployment, VPS provisioning, server hardening, and zero-downtime website migrations.",
    "fullDesc": "We take the complexity out of domain and server management. We configure DNS records correctly, install and renew SSL certificates for secure HTTPS, set up Virtual Private Servers (VPS), and migrate legacy sites to dependable modern hosts without downtime.",
    "image": "assets/images/hero-network-topology.svg",
    "imageAlt": "Domain hosting and network topology infrastructure",
    "metaBlocks": [
      {
        "title": "Who Needs This",
        "content": "Businesses launching new digital domains or suffering from unreliable hosting providers with frequent downtime."
      },
      {
        "title": "Problems Solved",
        "content": "DNS misconfigurations causing email delivery failure, SSL expiration warnings, and slow shared-hosting response times."
      },
      {
        "title": "Key Capabilities",
        "content": "DNS record management, HTTPS enforcement, VPS setup, migration without data loss, and daily backups."
      }
    ],
    "tags": [
      "DNS Configuration",
      "SSL Certificates (HTTPS)",
      "VPS Server Setup",
      "Website Migration",
      "Automated Backup Config",
      "Server Troubleshooting"
    ],
    "quoteSlug": "hosting-servers",
    "whatsappMsg": "Domain, Hosting & Server Services"
  },
  {
    "id": "cloud-devops",
    "title": "Cloud, DevOps & Deployment",
    "categoryFilter": "cloud-devops",
    "categoryLabel": "Cloud & DevOps",
    "icon": "<svg width=\"22\" height=\"22\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z\"/></svg>",
    "cardDesc": "Automated Git/GitHub CI/CD deployment pipelines, multi-environment provisioning, production release management, and instant rollback safeguards.",
    "fullDesc": "We establish robust deployment pipelines that make code updates predictable and painless. Using modern Git and GitHub workflows, automated build scripts, environment isolation (development, staging, production), and automated rollback safeguards, we keep your digital products running reliably.",
    "image": "assets/images/service-cloud-devops.jpg",
    "imageAlt": "Cloud deployment and automated CI/CD pipelines",
    "metaBlocks": [
      {
        "title": "Who Needs This",
        "content": "Growing organizations seeking automated release pipelines, multi-environment setups, and zero-downtime deploys."
      },
      {
        "title": "Problems Solved",
        "content": "Manual error-prone FTP uploads, deployment outages, lack of version history, and untracked code changes."
      },
      {
        "title": "Key Capabilities",
        "content": "Git/GitHub CI/CD workflows, environment configuration, production releases, rollback strategy, and monitoring."
      }
    ],
    "tags": [
      "CI/CD Setup",
      "GitHub Workflows",
      "Environment Config",
      "Production Release Management",
      "Rollback Protocols",
      "Uptime Monitoring"
    ],
    "quoteSlug": "cloud-devops",
    "whatsappMsg": "Cloud, DevOps & Deployment"
  },
  {
    "id": "qa-testing",
    "title": "Software Testing & Quality Assurance",
    "categoryFilter": "qa-security",
    "categoryLabel": "Security & QA",
    "icon": "<svg width=\"22\" height=\"22\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M9 11l3 3L22 4\"/><path d=\"M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11\"/></svg>",
    "cardDesc": "Rigorous manual, functional, and cross-browser QA testing across diverse viewports and devices to catch defects before production launch.",
    "fullDesc": "Software should delight users, not frustrate them. We conduct rigorous manual testing across diverse browsers, operating systems, and device viewports to catch visual anomalies, broken user journeys, edge-case validation errors, and API integration failures before launch.",
    "image": "assets/images/service-qa-security.jpg",
    "imageAlt": "Software quality assurance and test validation",
    "metaBlocks": [
      {
        "title": "Who Needs This",
        "content": "Development teams and product owners preparing for public launches, feature overhauls, or regulatory audits."
      },
      {
        "title": "Problems Solved",
        "content": "Untested edge cases causing user drop-off, cross-browser rendering flaws, broken forms, and regression bugs."
      },
      {
        "title": "Key Capabilities",
        "content": "Manual testing, responsive audits, cross-browser validation, API sanity checks, and bug report documentation."
      }
    ],
    "tags": [
      "Manual Testing",
      "Functional Validation",
      "Cross-Browser Testing",
      "Responsive Device Audits",
      "API Testing",
      "Comprehensive Bug Reporting"
    ],
    "quoteSlug": "qa-testing",
    "whatsappMsg": "Software Testing & Quality Assurance"
  },
  {
    "id": "cybersecurity",
    "title": "Cybersecurity & Website Security",
    "categoryFilter": "qa-security",
    "categoryLabel": "Security & QA",
    "icon": "<svg width=\"22\" height=\"22\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" ry=\"2\"/><path d=\"M7 11V7a5 5 0 0 1 10 0v4\"/></svg>",
    "cardDesc": "Defense-in-depth web protection including HTTPS hardening, security headers (CSP, HSTS), access control audits, and dependency hygiene reviews.",
    "fullDesc": "We implement defense-in-depth security best practices to protect your web properties against common vulnerabilities and exploits. From HTTPS and Strict-Transport-Security to security headers (CSP, X-Frame-Options), access control audits, and dependency hygiene, we fortify your systems. <em>Note: In keeping with our transparent policies, we never make false claims that any software system is 100% impenetrable.</em>",
    "image": "assets/images/hero-cybersecurity.svg",
    "imageAlt": "Cybersecurity architecture and SSL data encryption",
    "metaBlocks": [
      {
        "title": "Who Needs This",
        "content": "Any business handling sensitive client inquiries, customer transaction data, or administrative logins online."
      },
      {
        "title": "Problems Solved",
        "content": "Vulnerabilities to XSS, clickjacking, insecure transport cookies, brute force attacks, and outdated package exploits."
      },
      {
        "title": "Key Capabilities",
        "content": "Security header configurations, SSL hardening, access control audits, dependency scanning, and remediation."
      }
    ],
    "tags": [
      "Security Headers Config",
      "HTTPS & SSL Hardening",
      "Access Control Auditing",
      "Dependency Vulnerability Checks",
      "Disaster Recovery Planning",
      "Remediation of Flaws"
    ],
    "quoteSlug": "cybersecurity",
    "whatsappMsg": "Cybersecurity & Website Security"
  },
  {
    "id": "api-database",
    "title": "API & Database Services",
    "categoryFilter": "software-dev",
    "categoryLabel": "Software & APIs",
    "icon": "<svg width=\"22\" height=\"22\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><ellipse cx=\"12\" cy=\"5\" rx=\"9\" ry=\"3\"/><path d=\"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3\"/><path d=\"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5\"/></svg>",
    "cardDesc": "Robust RESTful API development and normalized relational database design (PostgreSQL, MySQL) with query optimization and secure JWT authentication.",
    "fullDesc": "Data is the lifeblood of modern enterprise applications. We design normalized, high-performance relational databases (PostgreSQL, MySQL) and develop RESTful APIs that connect disparate business tools, mobile clients, and external SaaS providers cleanly and securely.",
    "image": "assets/images/hero-data-orbit.svg",
    "imageAlt": "REST API endpoints and database schema design",
    "metaBlocks": [
      {
        "title": "Who Needs This",
        "content": "Organizations modernizing disjointed databases or needing custom backend connectors between their software systems."
      },
      {
        "title": "Problems Solved",
        "content": "Slow, unindexed database queries, inconsistent data duplication across tools, and lack of API documentation."
      },
      {
        "title": "Key Capabilities",
        "content": "RESTful API engineering, PostgreSQL/MySQL schema design, query optimization, JWT authentication, and data migration."
      }
    ],
    "tags": [
      "REST API Development",
      "Database Schema Design",
      "MySQL & PostgreSQL",
      "Query Optimization",
      "Data Migration & ETL",
      "Auth & JWT Integration"
    ],
    "quoteSlug": "api-database",
    "whatsappMsg": "API & Database Services"
  },
  {
    "id": "it-consulting",
    "title": "Technical Support & IT Consulting",
    "categoryFilter": "it-consulting",
    "categoryLabel": "Consulting",
    "icon": "<svg width=\"22\" height=\"22\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3\"/><line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"/></svg>",
    "cardDesc": "Experienced technology advisory on system architecture, tech stack selection, vendor evaluations, and legacy modernization roadmaps.",
    "fullDesc": "Make confident technology decisions with experienced guidance. We provide strategic consulting on tech stack selection, system architecture, third-party vendor evaluations, legacy modernization feasibility, and day-to-day technical troubleshooting.",
    "image": "assets/images/about-corporate-team.jpg",
    "imageAlt": "Advait technical leadership and IT consulting team",
    "metaBlocks": [
      {
        "title": "Who Needs This",
        "content": "Founders and managers planning new technology investments who need honest, senior engineering input before committing budget."
      },
      {
        "title": "Problems Solved",
        "content": "Selecting wrong tech stacks that require expensive rewrites, poor vendor contracts, and unscalable software architecture."
      },
      {
        "title": "Key Capabilities",
        "content": "Architecture guidance, technology evaluation, software modernization planning, and engineering advisory."
      }
    ],
    "tags": [
      "Architecture Guidance",
      "Technology Stack Selection",
      "Digital Transformation",
      "Application Troubleshooting",
      "Feasibility Planning"
    ],
    "quoteSlug": "it-consulting",
    "whatsappMsg": "Technical Support & IT Consulting"
  },
  {
    "id": "seo-optimization",
    "title": "SEO & Website Optimization",
    "categoryFilter": "web-dev",
    "categoryLabel": "Web & Apps",
    "icon": "<svg width=\"22\" height=\"22\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><polyline points=\"23 6 13.5 15.5 8.5 10.5 1 18\"/><polyline points=\"17 6 23 6 23 12\"/></svg>",
    "cardDesc": "Technical search engine optimization, JSON-LD schema, clean semantic markup, and speed enhancements to maximize Google search rankings.",
    "fullDesc": "A high-performing website must be discovered by potential clients. We implement comprehensive technical SEO, clean semantic HTML5 markup, JSON-LD structured schema data, optimized metadata, and Core Web Vitals speed tuning to help your business earn prominent Google search visibility.",
    "image": "assets/images/hero-digital-circuit.svg",
    "imageAlt": "Search engine optimization and structured data architecture",
    "metaBlocks": [
      {
        "title": "Who Needs This",
        "content": "Businesses struggling with low Google rankings, unindexed pages, or slow mobile loading times that hurt conversions."
      },
      {
        "title": "Problems Solved",
        "content": "Missing structured data, bloated assets causing Core Web Vitals failure, duplicate meta tags, and broken sitemaps."
      },
      {
        "title": "Key Capabilities",
        "content": "Technical SEO audits, JSON-LD Schema markup, Core Web Vitals optimization, and crawlability improvements."
      }
    ],
    "tags": [
      "Technical SEO",
      "Structured Data (JSON-LD)",
      "Core Web Vitals Tuning",
      "Sitemap & Robots.txt",
      "Mobile Usability Audits",
      "Image Optimization"
    ],
    "quoteSlug": "seo-optimization",
    "whatsappMsg": "SEO & Website Optimization"
  },
  {
    "id": "additional-digital",
    "title": "Additional Digital & Integrations",
    "categoryFilter": "it-consulting",
    "categoryLabel": "Consulting",
    "icon": "<svg width=\"22\" height=\"22\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z\"/></svg>",
    "cardDesc": "Corporate email setup, payment gateway integrations (Razorpay, Stripe), CRM lead forms, WhatsApp chat links, and web analytics tracking.",
    "fullDesc": "We handle all the vital digital connectors that make a modern business run smoothly: corporate Google Workspace / Microsoft 365 email configuration, payment gateway integrations (Razorpay, Stripe), CRM contact forms, direct WhatsApp chat links, and web analytics tracking.",
    "image": "assets/images/hero-automation-grid.svg",
    "imageAlt": "API integrations and automated digital workflow systems",
    "metaBlocks": [
      {
        "title": "Who Needs This",
        "content": "Businesses needing professional digital operational integrations without hiring multiple specialized contractors."
      },
      {
        "title": "Problems Solved",
        "content": "Failed payment checkout drops, lost lead inquiries from broken forms, and lack of visitor traffic measurement."
      },
      {
        "title": "Key Capabilities",
        "content": "Custom email setup, payment checkout integrations, lead forms, WhatsApp chat triggers, and Google Analytics."
      }
    ],
    "tags": [
      "Business Email Setup",
      "Payment Gateways",
      "Lead Management Forms",
      "WhatsApp Chat Links",
      "Web Analytics",
      "Legacy Modernization"
    ],
    "quoteSlug": "digital-services",
    "whatsappMsg": "Additional Digital & Integrations"
  }
];

  let activeCategory = 'all';
  let activeSearchQuery = '';
  let lastFocusedElement = null;

  document.addEventListener('DOMContentLoaded', () => {
    initServicesFilter();
    initServicesSearch();
    initServiceModal();
    handleServiceInitialHash();
    window.addEventListener('hashchange', handleServiceInitialHash);
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

    const aliasMap = {
      'hosting-server': 'hosting-domain',
      'testing-qa': 'qa-testing',
      'security': 'cybersecurity',
      'api-db': 'api-database',
      'seo': 'seo-optimization'
    };
    const resolvedId = aliasMap[serviceId] || serviceId;
    const data = SERVICES_DATA.find(s => s.id === resolvedId);
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
   * Handles direct URL hash navigation and in-page dropdown jumps
   */
  const ID_ALIASES = {
    'hosting-server': 'hosting-domain',
    'testing-qa': 'qa-testing',
    'security': 'cybersecurity',
    'api-db': 'api-database',
    'seo': 'seo-optimization',
    'additional-digital': 'digital-services'
  };

  function scrollToCard(targetCard, updateHash = false, hashId = '') {
    if (!targetCard) return;
    const header = document.querySelector('.site-header');
    const announcement = document.querySelector('.announcement-strip');
    const offset = (header ? header.offsetHeight : 68) + (announcement ? announcement.offsetHeight : 38) + 20;
    const targetTop = targetCard.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: 'smooth'
    });

    if (updateHash && hashId && window.location.hash !== `#${hashId}`) {
      history.pushState(null, '', `#${hashId}`);
    }

    targetCard.classList.add('card-highlighted');
    setTimeout(() => {
      targetCard.classList.remove('card-highlighted');
    }, 2500);
  }

  function handleServiceInitialHash() {
    let hash = window.location.hash ? window.location.hash.substring(1) : '';
    if (!hash) return;

    if (ID_ALIASES[hash]) {
      hash = ID_ALIASES[hash];
    }

    const targetCard = document.getElementById(hash);
    if (!targetCard || !targetCard.classList.contains('advait-service-card')) return;

    resetAllFilters();

    setTimeout(() => {
      scrollToCard(targetCard, false, hash);
    }, 150);
  }

  // Handle dropdown link clicks on the same page
  document.querySelectorAll('.dropdown-link-card[href*="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || '';
      const rawHash = href.includes('#') ? href.split('#')[1] : '';
      if (!rawHash) return;

      const hash = ID_ALIASES[rawHash] || rawHash;
      const targetCard = document.getElementById(hash);
      if (targetCard && targetCard.classList.contains('advait-service-card')) {
        e.preventDefault();
        resetAllFilters();
        scrollToCard(targetCard, true, hash);

        // Close mobile nav or open dropdown
        document.querySelectorAll('.nav-item.dropdown.is-open').forEach(d => d.classList.remove('is-open'));
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && navMenu.classList.contains('is-open')) {
          navMenu.classList.remove('is-open');
          const hamburger = document.querySelector('.hamburger-btn');
          if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      }
    });
  });

})();

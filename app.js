/* ============================================
   DOGGEDLAB — app.js
   Structured for future Django templating:
   content arrays below can be swapped for
   context variables passed from views.
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  renderProjects();
  renderFeatures();
  renderArticles();
  renderDevCards();
  setupNavToggle();
  setupScrollReveal();
  setupSearch();
  setupSmoothAnchors();
});

/* ---------- Footer year ---------- */
function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- Data ---------- */
const projects = [
  {
    icon: "🔗",
    title: "PlatLink",
    desc: "A collaboration platform blending professional networking, freelance work, and real-time team chat.",
  },
  {
    icon: "✦",
    title: "AI Studio",
    desc: "Build, test, and deploy AI-powered tools and workflows without leaving the browser.",
  },
  {
    icon: "⌘",
    title: "Developer Hub",
    desc: "Docs, SDKs, and starter kits for building on top of the DOGGEDLAB platform.",
  },
  {
    icon: "✎",
    title: "Tech Blog",
    desc: "Engineering notes, product updates, and deep dives from the team.",
  },
  {
    icon: "◇",
    title: "Open Source Projects",
    desc: "Community-built tools and libraries maintained in the open.",
  },
  {
    icon: "🎓",
    title: "Learning Center",
    desc: "Guided, project-based courses for developers at every level.",
  },
];

const features = [
  { icon: "✦", title: "AI Tools", desc: "Bring AI into your workflow with ready-to-use models and APIs." },
  { icon: "⚡", title: "Fast Development", desc: "Ship faster with templates, components, and instant previews." },
  { icon: "◇", title: "Open Source", desc: "Build on transparent, community-maintained foundations." },
  { icon: "🎓", title: "Learning Resources", desc: "Hands-on tutorials that teach by building real projects." },
  { icon: "👥", title: "Community", desc: "Connect with other builders, ask questions, share your work." },
  { icon: "🔒", title: "Secure Platform", desc: "Built with security and privacy as first-class concerns." },
];

const articles = [
  { emoji: "🧠", title: "Designing AI features people actually trust", desc: "A practical framework for shipping AI that feels helpful, not gimmicky." },
  { emoji: "🛠️", title: "From idea to prototype in a weekend", desc: "How the DOGGEDLAB team moves from concept to working demo fast." },
  { emoji: "☁️", title: "Choosing a cloud stack that scales with you", desc: "The tradeoffs we weighed before picking our platform architecture." },
];

const devCards = [
  { icon: "{ }", title: "API Documentation", desc: "Full reference for every endpoint, with live request examples." },
  { icon: "⬇", title: "SDK Downloads", desc: "Official SDKs for JavaScript, Python, and more." },
  { icon: "◇", title: "GitHub Repository", desc: "Browse the source, file issues, and contribute." },
  { icon: "＜／＞", title: "Code Examples", desc: "Copy-paste starters for common integrations." },
  { icon: "👥", title: "Developer Community", desc: "Get help and share what you're building." },
];

/* ---------- Renderers ---------- */
function renderProjects() {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = projects.map(p => `
    <article class="project-card">
      <div class="card-icon">${p.icon}</div>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <a href="#" class="card-link">Open project <span class="arrow">→</span></a>
    </article>
  `).join("");
}

function renderFeatures() {
  const grid = document.getElementById("features-grid");
  grid.innerHTML = features.map(f => `
    <article class="feature-card">
      <div class="card-icon">${f.icon}</div>
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
    </article>
  `).join("");
}

function renderArticles() {
  const grid = document.getElementById("articles-grid");
  grid.innerHTML = articles.map(a => `
    <article class="article-card">
      <div class="article-image" aria-hidden="true">${a.emoji}</div>
      <div class="article-body">
        <h3>${a.title}</h3>
        <p>${a.desc}</p>
        <a href="#" class="card-link">Read more <span class="arrow">→</span></a>
      </div>
    </article>
  `).join("");
}

function renderDevCards() {
  const grid = document.getElementById("dev-grid");
  grid.innerHTML = devCards.map(d => `
    <article class="dev-card">
      <div class="card-icon">${d.icon}</div>
      <h3>${d.title}</h3>
      <p>${d.desc}</p>
      <a href="#" class="card-link">Explore <span class="arrow">→</span></a>
    </article>
  `).join("");
}

/* ---------- Mobile nav ---------- */
function setupNavToggle() {
  const header = document.getElementById("header");
  const toggle = document.getElementById("nav-toggle");
  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => {
      header.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Scroll reveal ---------- */
function setupScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el => observer.observe(el));
}

/* ---------- Search ---------- */
function setupSearch() {
  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;
    // Placeholder behavior: scroll to projects and log query.
    // In the Django-integrated version, this can submit to a /search endpoint.
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
    console.log("Search submitted:", query);
  });
}

/* ---------- Smooth anchor scrolling offset for sticky header ---------- */
function setupSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

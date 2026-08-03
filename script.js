document.addEventListener("DOMContentLoaded", () => {
    initFooterYear();
    initGalleryLoop();
    initMobileNav();
    initScrollSpy();
    initCurriculumModal();
    initContactForm();
});

/* ---------------- Footer year ---------------- */
function initFooterYear() {
    const el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
}

/* ---------------- Seamless photo gallery loop ---------------- */

function initGalleryLoop() {
    const track = document.getElementById("track");
    if (!track) return;
    const originals = Array.from(track.children);
    originals.forEach((node) => {
        const clone = node.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
    });
}

/* ---------------- Mobile nav toggle ---------------- */
function initMobileNav() {
    const toggle = document.getElementById("navToggle");
    const links = document.querySelector(".nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", () => {
        links.classList.toggle("open");
        const expanded = links.classList.contains("open");
        toggle.setAttribute("aria-expanded", String(expanded));
    });

    links.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => links.classList.remove("open"));
    });
}

/* ---------------- Scroll-spy nav highlighting ---------------- */
function initScrollSpy() {
    const sections = document.querySelectorAll("main section[id], section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");
    if (!sections.length || !navLinks.length) return;

    const map = new Map();
    navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) map.set(href.slice(1), link);
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const link = map.get(entry.target.id);
                if (!link) return;
                if (entry.isIntersecting) {
                    navLinks.forEach((l) => l.classList.remove("active"));
                    link.classList.add("active");
                }
            });
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
}

/* ---------------- Curriculum data ---------------- */

const CURRICULUM = {
    about: {
        title: "About the Institute",
        years: {
            "Overview": [
                "Residential & day-scholar undergraduate programs",
                "Small batch sizes with individual faculty mentoring",
                "Technical curriculum alongside cultural & leadership programming",
                "Daily structure: morning assembly, academic sessions, evening activities",
            ],
        },
    },
    bba: {
        title: "Bachelor of Business Administration",
        years: {
            "Year 1": ["Principles of Management", "Business Communication", "Financial Accounting", "Business Economics"],
            "Year 2": ["Marketing Management", "Human Resource Management", "Business Statistics", "Organizational Behaviour"],
            "Year 3": ["Entrepreneurship Development", "Strategic Management", "Business Analytics Basics", "Major Project"],
        },
    },
    bca: {
        title: "Bachelor of Computer Applications",
        years: {
            "Year 1": ["Programming in C", "Computer Fundamentals", "Business Mathematics", "Digital Electronics"],
            "Year 2": ["Data Structures", "DBMS & SQL", "Python Programming", "Computer Networks"],
            "Year 3": ["Software Engineering", "Mobile App Development", "Cloud Computing Basics", "Major Project"],
        },
    },
    bcom: {
        title: "Bachelor of Commerce",
        years: {
            "Year 1": ["Financial Accounting", "Business Law", "Micro Economics", "Business Communication"],
            "Year 2": ["Corporate Accounting", "Income Tax Law & Practice", "Cost Accounting", "Business Statistics"],
            "Year 3": ["Auditing", "Corporate Law", "Financial Management", "GST & Indirect Taxes"],
        },
    },
};
 
function initCurriculumModal() {
    const overlay = document.getElementById("curriculumModal");
    const closeBtn = document.getElementById("modalCloseBtn");
    const titleEl = document.getElementById("modalTitle");
    const tabsEl = document.getElementById("yearTabs");
    const contentEl = document.getElementById("yearContent");
    if (!overlay || !titleEl || !tabsEl || !contentEl) return;
 
    document.querySelectorAll("[data-course]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const key = btn.getAttribute("data-course");
            const data = CURRICULUM[key];
            if (!data) return;
            openModal(data);
        });
    });
 
    function openModal(data) {
        titleEl.textContent = data.title;
        tabsEl.innerHTML = "";
        contentEl.innerHTML = "";
 
        const yearKeys = Object.keys(data.years);
        yearKeys.forEach((yearKey, i) => {
            const tabBtn = document.createElement("button");
            tabBtn.className = "year-tab-btn" + (i === 0 ? " active" : "");
            tabBtn.type = "button";
            tabBtn.textContent = yearKey;
            tabBtn.addEventListener("click", () => {
                tabsEl.querySelectorAll(".year-tab-btn").forEach((b) => b.classList.remove("active"));
                tabBtn.classList.add("active");
                renderYear(data.years[yearKey]);
            });
            tabsEl.appendChild(tabBtn);
        });
 
        renderYear(data.years[yearKeys[0]]);
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }
 
    function renderYear(topics) {
        const ul = document.createElement("ul");
        topics.forEach((t) => {
            const li = document.createElement("li");
            li.textContent = t;
            ul.appendChild(li);
        });
        contentEl.innerHTML = "";
        contentEl.appendChild(ul);
    }
 
    function closeModal() {
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    }
 
    closeBtn?.addEventListener("click", closeModal);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });
}

/* ---------------- Contact form (front-end only) ---------------- */

function initContactForm() {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");
    if (!form || !status) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (!name || !email || !message) {
            status.textContent = "Please fill in your name, email, and message.";
            status.style.color = "#e5484d";
            return;
        }

        // TODO: replace with a real submission (fetch to a form endpoint, etc.)
        status.style.color = "";
        status.textContent = "Thanks — we'll get back to you shortly.";
        form.reset();
    });
}
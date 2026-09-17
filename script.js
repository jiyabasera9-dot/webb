document.addEventListener("DOMContentLoaded", () => {
    initFooterYear();
    initGalleryLoop();
    initMobileNav();
    initScrollSpy();
    // initCurriculumModal();
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

        status.style.color = "";
        status.textContent = "Sending...";

        emailjs.sendForm("Service_1sdbsre", "template_osurf5h", form)
            .then(() => {
                status.style.color = "#2fbf71";
                status.textContent = "✅ Thank you! Check your email — we'll reach out to you soon.";
                form.reset();
            }, (error) => {
                status.style.color = "#e5484d";
                status.textContent = "❌ Something went wrong. Please try again or call us directly.";
            });
    });
}
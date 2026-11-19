document.addEventListener('DOMContentLoaded', function () {
    // 1. Dark / Light Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');
    const root = document.documentElement;

    function applyTheme(theme) {
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
            if (themeIcon) themeIcon.textContent = '☀️';
            if (themeText) themeText.textContent = 'Світла';
        } else {
            root.removeAttribute('data-theme');
            if (themeIcon) themeIcon.textContent = '🌙';
            if (themeText) themeText.textContent = 'Темна';
        }
    }

    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            localStorage.setItem('portfolio-theme', next);
            applyTheme(next);
        });
    }

    // 2. Project Filter by Technology
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterButtons.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter');
            projectItems.forEach(function (item) {
                const tags = item.getAttribute('data-category') || '';
                if (category === 'all' || tags.includes(category)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // 3. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealElements.forEach(function (el) { observer.observe(el); });
    } else {
        revealElements.forEach(function (el) { el.classList.add('visible'); });
    }

    // 4. Interactive Menu (Active Link on Scroll & Mobile Auto-Close)
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            const nav = document.getElementById('navbarNav');
            if (nav && nav.classList.contains('show')) {
                nav.classList.remove('show');
            }
        });
    });

    window.addEventListener('scroll', function () {
        let currentId = '';
        sections.forEach(function (sec) {
            const top = sec.offsetTop - 130;
            if (window.scrollY >= top) {
                currentId = sec.getAttribute('id');
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentId) {
                link.classList.add('active');
            }
        });
    });
});

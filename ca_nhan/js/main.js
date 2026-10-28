// ===================================================
//  NAVBAR: scroll shadow + active link highlight
// ===================================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
    // Đổ bóng navbar khi cuộn
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Đánh dấu active link theo vị trí cuộn
    highlightNavLink();

    // Hiện/ẩn nút Back-to-Top
    toggleBackToTop();
});

// ===================================================
//  HAMBURGER MENU TOGGLE
// ===================================================
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks     = document.getElementById('navLinks');

hamburgerBtn.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    hamburgerBtn.classList.toggle('open', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
    // Khóa/mở cuộn trang khi menu mở
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Đóng menu khi bấm vào một link
navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburgerBtn.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});

// ===================================================
//  ACTIVE NAV LINK KHI CUỘN
// ===================================================
function highlightNavLink() {
    const sections   = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');
    let current = '';

    sections.forEach(function (section) {
        const sectionTop    = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            current = '#' + section.id;
        }
    });

    navAnchors.forEach(function (a) {
        a.classList.remove('active');
        if (a.getAttribute('href') === current) {
            a.classList.add('active');
        }
    });
}

// ===================================================
//  BACK TO TOP BUTTON
// ===================================================
const backToTopBtn = document.getElementById('backToTop');

function toggleBackToTop() {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===================================================
//  SKILL BAR ANIMATION (khi section vào viewport)
// ===================================================
const skillBars = document.querySelectorAll('.skill-bar-fill');

const barObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            const bar         = entry.target;
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width   = targetWidth + '%';
            barObserver.unobserve(bar); // chỉ chạy 1 lần
        }
    });
}, { threshold: 0.3 });

skillBars.forEach(function (bar) {
    barObserver.observe(bar);
});

// ===================================================
//  FADE-IN ANIMATION KHI CUỘN (các card, section)
// ===================================================
const fadeEls = document.querySelectorAll(
    '.skill-box, .project-card, .contact-card, .timeline-item, .about-grid, .personal-info li'
);

const fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, idx) {
        if (entry.isIntersecting) {
            setTimeout(function () {
                entry.target.style.opacity   = '1';
                entry.target.style.transform = 'translateY(0)';
            }, idx * 60);
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeEls.forEach(function (el) {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeObserver.observe(el);
});

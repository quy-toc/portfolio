// ===================================================
//  SKILL BAR ANIMATION (chạy khi tải trang xong)
// ===================================================
window.addEventListener('load', function () {
    var bars = document.querySelectorAll('.skill-bar-fill');
    bars.forEach(function (bar) {
        var width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
});

// ===================================================
//  TIMELINE FADE-IN (IntersectionObserver)
// ===================================================
var timelineItems = document.querySelectorAll('.timeline-item');

var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, idx) {
        if (entry.isIntersecting) {
            setTimeout(function () {
                entry.target.classList.add('visible');
            }, idx * 120);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

timelineItems.forEach(function (item) {
    observer.observe(item);
});
// ===================================================
// BACK TO TOP BUTTON (Tương tác 1)
// ===================================================
var backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", function() {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
});

backToTopBtn.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===================================================
// VALIDATE FORM LIÊN HỆ (Tương tác 2 - Tiêu chí 15)
// ===================================================
var contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault(); // Ngăn load lại trang
        
        var isValid = true;
        var txtName = document.getElementById("txtName").value.trim();
        var txtEmail = document.getElementById("txtEmail").value.trim();
        var txtMessage = document.getElementById("txtMessage").value.trim();
        
        // Check Tên
        if (txtName === "") {
            document.getElementById("errName").textContent = "(*) Vui lòng nhập họ tên.";
            isValid = false;
        } else {
            document.getElementById("errName").textContent = "";
        }
        
        // Check Email
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (txtEmail === "") {
            document.getElementById("errEmail").textContent = "(*) Vui lòng nhập email.";
            isValid = false;
        } else if (!emailPattern.test(txtEmail)) {
            document.getElementById("errEmail").textContent = "(*) Email không hợp lệ.";
            isValid = false;
        } else {
            document.getElementById("errEmail").textContent = "";
        }
        
        // Check Lời nhắn
        if (txtMessage === "") {
            document.getElementById("errMessage").textContent = "(*) Vui lòng nhập nội dung tin nhắn.";
            isValid = false;
        } else {
            document.getElementById("errMessage").textContent = "";
        }
        
        // Gửi thành công
        if (isValid) {
            alert("Cảm ơn bạn! Tin nhắn đã được gửi thành công.");
            contactForm.reset();
        }
    });
}
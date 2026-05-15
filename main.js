// SAMAF Landing Page - Interactivity

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Navigation & Scroll Effects
    const navbar = document.getElementById('navbar');
    const logoImg = document.getElementById('logo-img');
    const originalLogo = "https://samaf.com.au/wp-content/uploads/2024/11/Samaf-Consultation-Logo.png";
    const whiteLogo = "https://samaf.com.au/wp-content/uploads/2024/11/Samaf-Consultation-Logo.png"; // Assuming same logo, just inverted via CSS or different URL if available
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            // logoImg.style.filter = 'brightness(0) invert(1)'; // Make logo white on dark navy
        } else {
            navbar.classList.remove('scrolled');
            // logoImg.style.filter = 'none'; // Revert logo
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // 3. Industry Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // 4. Smooth Scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 6. Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-left').forEach(el => {
        observer.observe(el);
    });

    // 7. Custom Select Dropdown Logic
    const customSelect = document.getElementById('industry-select');
    if (customSelect) {
        const trigger = customSelect.querySelector('.select-trigger');
        const options = customSelect.querySelectorAll('.option');
        const input = document.getElementById('industry-input');

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            customSelect.classList.toggle('active');
        });

        options.forEach(option => {
            option.addEventListener('click', () => {
                const value = option.getAttribute('data-value');
                const text = option.innerText;
                
                trigger.querySelector('span').innerText = text;
                input.value = value;
                
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                
                customSelect.classList.remove('active');
            });
        });

        document.addEventListener('click', () => {
            customSelect.classList.remove('active');
        });
    }

});

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

    // 8. Testimonials Slider Logic (Mobile view)
    const grid = document.querySelector('.testimonials-grid');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.slider-dots .dot');

    if (grid && prevBtn && nextBtn && dots.length > 0) {
        const updateDots = () => {
            const index = Math.round(grid.scrollLeft / grid.offsetWidth);
            dots.forEach((dot, idx) => {
                if (idx === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        grid.addEventListener('scroll', updateDots);

        prevBtn.addEventListener('click', () => {
            grid.scrollBy({ left: -grid.offsetWidth, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            grid.scrollBy({ left: grid.offsetWidth, behavior: 'smooth' });
        });
        
        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                grid.scrollTo({ left: idx * grid.offsetWidth, behavior: 'smooth' });
            });
        });
    }

    // 9. Contact Form Webhook Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('contact-name');
            const emailInput = document.getElementById('contact-email');
            const phoneInput = document.getElementById('contact-phone');
            const industryInput = document.getElementById('industry-input');
            const customSelect = document.getElementById('industry-select');
            const messageInput = document.getElementById('contact-message');
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            // Form validation for Custom Industry Dropdown
            if (!industryInput || !industryInput.value) {
                if (customSelect) {
                    const selectTrigger = customSelect.querySelector('.select-trigger');
                    if (selectTrigger) {
                        selectTrigger.style.borderColor = '#ff4d4d';
                        selectTrigger.style.background = 'rgba(255, 77, 77, 0.05)';
                    }
                }
                
                let errorMsg = contactForm.querySelector('.form-error-msg');
                if (!errorMsg) {
                    errorMsg = document.createElement('div');
                    errorMsg.className = 'form-error-msg';
                    errorMsg.style.cssText = 'color: #ff4d4d; background: rgba(255, 77, 77, 0.1); border: 1px solid rgba(255, 77, 77, 0.2); padding: 12px 16px; border-radius: 8px; font-size: 14px; margin-bottom: 15px; text-align: left; display: flex; align-items: center; gap: 8px;';
                    contactForm.insertBefore(errorMsg, submitBtn);
                }
                errorMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please select your industry.';
                return;
            } else {
                // Clear any error styles from industry select
                if (customSelect) {
                    const selectTrigger = customSelect.querySelector('.select-trigger');
                    if (selectTrigger) {
                        selectTrigger.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        selectTrigger.style.background = 'rgba(255, 255, 255, 0.03)';
                    }
                }
            }

            // Remove any existing error message
            const existingError = contactForm.querySelector('.form-error-msg');
            if (existingError) {
                existingError.remove();
            }

            // Get form values
            const nameVal = nameInput ? nameInput.value.trim() : '';
            const emailVal = emailInput ? emailInput.value.trim() : '';
            const phoneVal = phoneInput ? phoneInput.value.trim() : '';
            const industryVal = industryInput.value;
            
            // Get selected industry display text
            let industryText = '';
            if (customSelect) {
                const selectTriggerSpan = customSelect.querySelector('.select-trigger span');
                if (selectTriggerSpan) {
                    industryText = selectTriggerSpan.innerText;
                }
            }
            
            const messageVal = messageInput ? messageInput.value.trim() : '';

            // Loading state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 8px;"></i> Booking Session...';

            const payload = {
                name: nameVal,
                email: emailVal,
                phone: phoneVal,
                industry: industryVal,
                industryName: industryText,
                message: messageVal,
                submittedAt: new Date().toISOString(),
                pageUrl: window.location.href
            };

            const webhookUrl = 'https://services.leadconnectorhq.com/hooks/ILfm9Yxfly5CRRQ1Dqct/webhook-trigger/112b5bd1-0518-4049-9d30-580a5d781cc9';

            try {
                const response = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    // Helper to escape HTML tags to prevent XSS in rendering the confirmation message
                    const escapeHTML = (str) => {
                        return str.replace(/[&<>'"]/g, 
                            tag => ({
                                '&': '&amp;',
                                '<': '&lt;',
                                '>': '&gt;',
                                "'": '&#39;',
                                '"': '&quot;'
                            }[tag] || tag)
                        );
                    };

                    // Replace form contents with a beautiful success message
                    contactForm.style.transition = 'opacity 0.3s ease';
                    contactForm.style.opacity = '0';
                    
                    setTimeout(() => {
                        contactForm.innerHTML = `
                            <div style="text-align: center; padding: 40px 20px; background: rgba(0, 163, 137, 0.08); border: 1px solid rgba(0, 163, 137, 0.2); border-radius: 16px; backdrop-filter: blur(10px); animation: fadeIn 0.6s ease forwards; margin-top: 10px;">
                                <div style="width: 80px; height: 80px; background: var(--secondary-teal); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; box-shadow: 0 0 20px rgba(0, 163, 137, 0.4);">
                                    <i class="fas fa-check" style="font-size: 36px; color: var(--white);"></i>
                                </div>
                                <h3 style="font-family: var(--heading-font); color: var(--white); font-size: 28px; margin-bottom: 12px; font-weight: 700;">Booking Confirmed!</h3>
                                <p style="color: var(--text-grey); font-size: 16px; line-height: 1.6; margin-bottom: 24px; max-width: 340px; margin-left: auto; margin-right: auto;">
                                    Thank you, <strong>${escapeHTML(nameVal)}</strong>. We've received your details. Our expert team will contact you within 24 hours to host your free session.
                                </p>
                                <button type="button" class="btn btn-secondary" onclick="window.location.reload();" style="font-size: 14px; padding: 12px 28px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2); background: transparent; color: var(--white); cursor: pointer; transition: all 0.3s ease;">
                                    Submit Another Request
                                </button>
                            </div>
                        `;
                        contactForm.style.opacity = '1';
                    }, 300);

                } else {
                    throw new Error('Server responded with an error');
                }
            } catch (err) {
                console.error('Submission failed:', err);
                
                // Reset submit button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;

                // Display error message
                let errorMsg = contactForm.querySelector('.form-error-msg');
                if (!errorMsg) {
                    errorMsg = document.createElement('div');
                    errorMsg.className = 'form-error-msg';
                    errorMsg.style.cssText = 'color: #ff4d4d; background: rgba(255, 77, 77, 0.1); border: 1px solid rgba(255, 77, 77, 0.2); padding: 12px 16px; border-radius: 8px; font-size: 14px; margin-bottom: 15px; text-align: left; display: flex; align-items: center; gap: 8px;';
                    contactForm.insertBefore(errorMsg, submitBtn);
                }
                errorMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Connection error. Please check your network and try again, or email us at analyst@samaf.com.au.';
            }
        });
    }

});

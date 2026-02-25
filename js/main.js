// ===========================
// PLATINOVSKAYA - MAIN JAVASCRIPT
// Mobile Menu & Interactive Features
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    // ===========================
    // MOBILE MENU TOGGLE
    // ===========================
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    // Убедимся, что меню закрыто при загрузке страницы
    if (mobileNav && mobileMenuToggle) {
        mobileNav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
        
        // Обработчик клика по кнопке меню
        mobileMenuToggle.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (!isActive) {
                // Меню открывается
                document.body.style.overflow = 'hidden';
            } else {
                // Меню закрывается
                document.body.style.overflow = '';
            }
        });
    }
    
    // ===========================
    // MOBILE DROPDOWN
    // ===========================
    const mobileDropdownTriggers = document.querySelectorAll('.mobile-dropdown-trigger');
    
    mobileDropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const dropdownContent = this.nextElementSibling;
            
            // Toggle aria-expanded
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle dropdown content
            if (dropdownContent && dropdownContent.classList.contains('mobile-dropdown-content')) {
                dropdownContent.classList.toggle('active');
            }
        });
    });
    
    // ===========================
    // CLOSE MOBILE MENU ON LINK CLICK
    // ===========================
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenuToggle && mobileNav) {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // ===========================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ===========================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===========================
    // SCROLL HEADER SHADOW
    // ===========================
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.12)';
            } else {
                header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            }
        });
    }
    
    // ===========================
    // LAZY LOADING IMAGES
    // ===========================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ===========================
    // COURSE PARAMETER FROM URL (for payment page)
    // ===========================
    const urlParams = new URLSearchParams(window.location.search);
    const courseParam = urlParams.get('course');
    
    if (courseParam && document.body.classList.contains('payment-page')) {
        // You can use this to highlight which course is being purchased
        console.log('Purchasing course:', courseParam);
    }
    
    // ===========================
    // FADE IN ANIMATION ON SCROLL
    // ===========================
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });
        
        fadeElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            fadeObserver.observe(element);
        });
    }
});

// ===========================
// CLOSE MOBILE MENU ON RESIZE
// ===========================
window.addEventListener('resize', function() {
    if (window.innerWidth >= 1024) {
        const mobileNav = document.querySelector('.mobile-nav');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        
        if (mobileNav && mobileMenuToggle) {
            mobileNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

/// ===========================
// ДОПОЛНИТЕЛЬНЫЙ JAVASCRIPT ДЛЯ НОВЫХ БЛОКОВ
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    
    // FAQ - Аккордеон
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Закрыть все другие открытые элементы
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Переключить текущий элемент
                item.classList.toggle('active');
            });
        }
    });
    
    // Форма заказа - валидация
    const orderForm = document.querySelector('.order-form');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = orderForm.querySelector('input[type="text"]');
            const emailInput = orderForm.querySelector('input[type="email"]');
            const phoneInput = orderForm.querySelector('input[type="tel"]');
            const consent = document.getElementById('consent');
            
            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            
            // Простая валидация
            if (!name || !email || !phone) {
                alert('Пожалуйста, заполните все обязательные поля');
                return;
            }
            
            if (consent && !consent.checked) {
                alert('Необходимо согласие на обработку персональных данных');
                return;
            }
            
            // Email валидация
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Пожалуйста, введите корректный email');
                return;
            }
            
            // Здесь должна быть отправка формы
            alert('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');
            // orderForm.submit(); // Раскомментировать для реальной отправки
        });
    }
    
    // Промокод активация
    const promoBtn = document.querySelector('.promo-apply');
    
    if (promoBtn) {
        promoBtn.addEventListener('click', function() {
            const promoInput = promoBtn.closest('.promo-group').querySelector('.cyber-input');
            const promoCode = promoInput ? promoInput.value.trim().toUpperCase() : '';
            
            if (!promoCode) {
                alert('Введите промокод');
                return;
            }
            
            // Здесь должна быть проверка промокода на сервере
            // Пример валидных промокодов
            const validPromoCodes = {
                'START2025': 10, // 10% скидка
                'FIRST': 15, // 15% скидка
                'WELCOME': 5  // 5% скидка
            };
            
            if (validPromoCodes[promoCode]) {
                const discount = validPromoCodes[promoCode];
                alert(`Промокод активирован! Скидка ${discount}%`);
                
                // Обновить цену (пример)
                const priceElement = document.querySelector('.order-price');
                if (priceElement) {
                    const currentPrice = 2026;
                    const newPrice = currentPrice * (1 - discount / 100);
                    priceElement.textContent = Math.round(newPrice) + ' ₽';
                }
                
                promoBtn.disabled = true;
                promoBtn.textContent = 'Активирован';
                promoBtn.style.background = 'var(--accent-green)';
            } else {
                alert('Промокод не действителен');
            }
        });
    }
    
    // Плавная прокрутка к форме заказа
    const buyButtons = document.querySelectorAll('a[href="#order-form"]');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const orderForm = document.getElementById('order-form');
            
            if (orderForm) {
                orderForm.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Анимация появления элементов при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Наблюдать за всеми элементами с классом fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // Hover эффект для карточек
    const hoverCards = document.querySelectorAll('.hover-scale');
    
    hoverCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    console.log('✅ Additional scripts loaded successfully!');
});
// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hide preloader after a short delay
    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('hidden');
        }
    }, 1000); // 1 second delay, adjust as needed
    
    // Also make sure it hides when all resources are loaded
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('hidden');
        }
    });
    
    // Initialize mobile menu toggle functionality
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const closeMenu = document.querySelector('.close-menu');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.add('active');
        });
        
        if (closeMenu) {
            closeMenu.addEventListener('click', function() {
                mainNav.classList.remove('active');
            });
        }
    }
    
    // Initialize back-to-top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Initialize header sticky behavior
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }
});
// Add this JavaScript to your script
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle'); // Your existing menu toggle button
    const menu = document.querySelector('.mobile-menu'); // Your menu container
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    
    // This assumes you have existing code that opens the menu
    // Add close functionality
    closeMenuBtn.addEventListener('click', function() {
        menu.classList.remove('active'); // Or however you're toggling menu visibility
    });
});

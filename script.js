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
// Assuming you already have code that opens the menu
// First, let's create a function to add the close button

function addCloseButtonToMobileMenu() {
  // Get your mobile menu container (adjust selector as needed)
  const mobileMenuContainer = document.querySelector('.mobile-menu-container');
  
  // Check if close button already exists to avoid duplicates
  if (!document.getElementById('mobile-menu-close-btn')) {
    // Create close button element
    const closeButton = document.createElement('button');
    closeButton.id = 'mobile-menu-close-btn';
    closeButton.className = 'mobile-menu-close-btn';
    closeButton.innerHTML = '&times;'; // × symbol
    
    // Add the button to the menu container
    mobileMenuContainer.appendChild(closeButton);
    
    // Add event listener to close the menu when button is clicked
    closeButton.addEventListener('click', function() {
      // This should match however you're currently closing the menu
      // For example:
      document.querySelector('.mobile-menu-container').style.display = 'none';
      // OR
      document.querySelector('.mobile-menu-container').classList.remove('active');
    });
  }
}

// Call this function when your menu opens
// For example, if you have a menu toggle button:
document.querySelector('.menu-toggle').addEventListener('click', function() {
  // Your existing code to open the menu
  
  // Then add the close button
  addCloseButtonToMobileMenu();
});

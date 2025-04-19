// Gallery.js - JavaScript for gallery functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Preloader
    window.addEventListener('load', function() {
        document.querySelector('.preloader').style.display = 'none';
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const closeMenuBtn = document.getElementById('closeMenuBtn');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', function() {
            mainNav.classList.remove('active');
            document.body.classList.remove('no-scroll');
            mobileMenuToggle.classList.remove('active');
        });
    }

    // Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(filterBtn => {
                filterBtn.classList.remove('active');
            });
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Lightbox functionality
    const lightbox = document.querySelector('.gallery-lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const galleryZoomBtns = document.querySelectorAll('.gallery-zoom');
    
    let currentIndex = 0;
    const galleryImages = [];
    
    // Collect all gallery images and their captions
    galleryZoomBtns.forEach((btn, index) => {
        const imgSrc = btn.getAttribute('href');
        const captionText = btn.parentElement.querySelector('h3').textContent;
        const captionDesc = btn.parentElement.querySelector('p').textContent;
        
        galleryImages.push({
            src: imgSrc,
            caption: captionText,
            description: captionDesc
        });
        
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(index);
        });
    });
    
    function openLightbox(index) {
        currentIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.classList.add('no-scroll');
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
    
    function updateLightboxContent() {
        const currentImage = galleryImages[currentIndex];
        lightboxImage.src = currentImage.src;
        lightboxCaption.innerHTML = `<h3>${currentImage.caption}</h3><p>${currentImage.description}</p>`;
    }
    
    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        updateLightboxContent();
    }
    
    function prevImage() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxContent();
    }
    
    // Lightbox event listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', nextImage);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', prevImage);
    }
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
        
        // Navigate with arrow keys
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowRight') {
                nextImage();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            }
        }
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Lazy loading images
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy-image');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    // Update URL but without jumping
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
    
    // Initialize Masonry layout if available
    if (typeof Masonry !== 'undefined' && document.querySelector('.masonry-grid')) {
        new Masonry('.masonry-grid', {
            itemSelector: '.gallery-item',
            columnWidth: '.gallery-sizer',
            percentPosition: true
        });
    }
});
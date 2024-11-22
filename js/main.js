document.addEventListener('DOMContentLoaded', () => {
    // Debug logging
    console.log('DOM Content Loaded');

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    console.log('Lightbox element:', lightbox);
    console.log('Lightbox image element:', lightboxImg);

    const galleryImages = document.querySelectorAll('.gallery-item img');
    console.log('Gallery images found:', galleryImages.length);

    // Open lightbox
    galleryImages.forEach(img => {
        img.addEventListener('click', (e) => {
            console.log('Image clicked:', img.src);
            lightboxImg.src = img.src;
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }

    document.querySelector('.close-lightbox').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    // Add fade-in animation for gallery images as they come into view
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
});
